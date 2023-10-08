import React, { useState } from 'react';
import styled from 'styled-components';
import parser from 'html-react-parser'
import CardDetails from '../modalViews/CardDetails'
import useModal from '../Hooks/useModal'
import EditCard from '../modalViews/EditCard';

// Styled components
const Wrapper = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  //box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
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

function Collapse({ card,updateCardsArray }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { dispatchModal } = useModal()

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Wrapper>
      {/* <Button onClick={toggleCollapse}>
        {isCollapsed ? 'Show' : 'Hide'}
      </Button> */}
      <QuestionContainer>
        <QuestionText>{card.front}</QuestionText>
        <div>
          <Button onClick={toggleCollapse}>
            {isCollapsed ? 'show' : 'hide'}
          </Button>
          <Button onClick={() => dispatchModal({ type: 'SET_CONTENT', content: <CardDetails card={card} /> })}>
            info
          </Button>
          <Button onClick={()=>dispatchModal({type:'SET_CONTENT',content:<EditCard id={card._id} word={card.front} meaning={card.back} updateCardsArray={updateCardsArray}/>})}>
            edit
          </Button>
        </div>
      </QuestionContainer>
      <Content isCollapsed={isCollapsed}>
        {/* Content to be collapsed */}
        <hr style={{ marginTop: '5px', marginBottom: '5px' }} /> 
        <p>{parser(card.back)}</p>
      </Content>
    </Wrapper>
  );
}

export default Collapse;
