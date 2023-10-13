import React, { useState } from 'react';
import styled from 'styled-components';
import parser from 'html-react-parser'
import CardDetails from '../modalViews/CardDetails'
import useModal from '../Hooks/useModal'
import EditCard from '../modalViews/EditCard';
import Confirm from '../modalViews/Confirm';
import { toast } from 'react-toastify'
import useUser from '../Hooks/useUser';

// Styled components
const Wrapper = styled.div` 
  margin: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  //box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  user-select:text;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 4px 7px;
  cursor: pointer;
  border-radius: 5px;
  margin:2px;
`;

const QuestionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  @media only screen and (max-width: 600px) {
    flex-direction:column;
  }
`;

const QuestionText = styled.h3`
  font-size: 20px;
  margin: 0;
  flex-grow: 1;
`;

const Btn = styled.span`
cursor:pointer;
margin:5px;
`

const Content = styled.div`
  display: ${props => (props.isCollapsed ? 'none' : 'block')};
`;

const Span = styled.div`
    cursor:pointer;
`

function Collapse({ card, updateCardsArrayAfterEdit, updateCardsArrayAfterDelete }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { dispatchModal } = useModal()
  const { user } = useUser()

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const deleteCard = async () => {
    console.log(card)
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/card`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': user.token
        },
        body: JSON.stringify({ cardId: card.cardId, deck: card.deck })
      })
      const json = await response.json()
      if (!response.ok) {
        toast.error(json.message)
      }
      else {
        toast.success(json.message)
        updateCardsArrayAfterDelete(card._id)
      }
    }
    catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <Wrapper>
      {/* <Button onClick={toggleCollapse}>
        {isCollapsed ? 'Show' : 'Hide'}
      </Button> */}
      <QuestionContainer>
        <QuestionText>{card.front}</QuestionText>
        <div style={{display:'flex'}}> 
          {/* <Button style={{ background: 'green' }} onClick={toggleCollapse}>
            {isCollapsed ? 'show' : 'hide'}
          </Button> */}
          <Btn onClick={() => dispatchModal({ type: 'SET_CONTENT', content: <CardDetails card={card} /> })}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 128 128">
              <path d="M 64 6 C 32 6 6 32 6 64 C 6 96 32 122 64 122 C 96 122 122 96 122 64 C 122 32 96 6 64 6 z M 64 12 C 92.7 12 116 35.3 116 64 C 116 92.7 92.7 116 64 116 C 35.3 116 12 92.7 12 64 C 12 35.3 35.3 12 64 12 z M 64 30 A 9 9 0 0 0 64 48 A 9 9 0 0 0 64 30 z M 64 59 C 59 59 55 63 55 68 L 55 92 C 55 97 59 101 64 101 C 69 101 73 97 73 92 L 73 68 C 73 63 69 59 64 59 z"></path>
            </svg>
          </Btn>
          <Btn onClick={() => dispatchModal({ type: 'SET_CONTENT', content: <EditCard id={card._id} word={card.front} meaning={card.back} updateCardsArrayAfterEdit={updateCardsArrayAfterEdit} /> })}>

            <svg class="feather feather-edit-3" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>

          </Btn>
          <Btn onClick={() => dispatchModal({ type: 'SET_CONTENT', content: <Confirm message={"Are you sure you want to delete this card?"} deleteItem={deleteCard} /> })}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 30 30">
              <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
            </svg>
          </Btn>
        </div> 
      </QuestionContainer>
      <Content isCollapsed={isCollapsed}>
        {/* Content to be collapsed */}
        <hr style={{ marginTop: '5px',background:'skyblue',border:'none',height:'1px', marginBottom: '5px' }} />
        <p className="view ql-editor">{parser(card.back)}</p>
      </Content>
    </Wrapper>
  );
}

export default Collapse;
