import React, { useState } from 'react';
import styled from 'styled-components';
import parser from 'html-react-parser'
import CardDetails from '../modalViews/CardDetails'
import useModal from '../Hooks/useModal'
import EditCard from '../modalViews/EditCard';
import Confirm from '../modalViews/Confirm';
import {toast} from 'react-toastify'
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

const Content = styled.div`
  display: ${props => (props.isCollapsed ? 'none' : 'block')};
`;

const Span = styled.div`
    cursor:pointer;
`

function Collapse({ card,updateCardsArrayAfterEdit,updateCardsArrayAfterDelete }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { dispatchModal } = useModal()
  const {user} = useUser()

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
      else{ 
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
        <div>
          <Button style={{background:'green'}} onClick={toggleCollapse}>
            {isCollapsed ? 'show' : 'hide'}
          </Button>
          <Button onClick={() => dispatchModal({ type: 'SET_CONTENT', content: <CardDetails card={card} /> })}>
            info
          </Button>
          <Button style={{background:'orange'}} onClick={()=>dispatchModal({type:'SET_CONTENT',content:<EditCard id={card._id} word={card.front} meaning={card.back} updateCardsArrayAfterEdit={updateCardsArrayAfterEdit}/>})}>
            edit 
          </Button>
          <Button style={{background:'tomato'}} onClick={() => dispatchModal({ type: 'SET_CONTENT', content: <Confirm message={"Are you sure you want to delete this card?"} deleteItem={deleteCard} /> })}>
            delete
          </Button>  
        </div> 
      </QuestionContainer>
      <Content isCollapsed={isCollapsed}>
        {/* Content to be collapsed */}
        <hr style={{ marginTop: '5px', marginBottom: '5px' }} /> 
        <p  className="view ql-editor">{parser(card.back)}</p>
      </Content>
    </Wrapper>
  );
}

export default Collapse;
