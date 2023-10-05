import React, { useState } from 'react';
import styled from 'styled-components';
import parser from 'html-react-parser'

// Styled components
const Wrapper = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 4px 7px;
  cursor: pointer;
  border-radius: 5px;
`;

const QuestionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
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

function Collapse({ question, answer }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Wrapper>
      {/* <Button onClick={toggleCollapse}>
        {isCollapsed ? 'Show' : 'Hide'}
      </Button> */}
      <QuestionContainer>
        <QuestionText>{question}</QuestionText>
        {isCollapsed ? (
          <Span onClick={toggleCollapse}>&#9662;</Span> // Downward-pointing arrow when collapsed
        ) : (
          <Span onClick={toggleCollapse}>&#9652;</Span> // Upward-pointing arrow when expanded
        )}
      </QuestionContainer>
      <Content isCollapsed={isCollapsed}> 
        {/* Content to be collapsed */} 
        <hr style={{marginTop:'5px',marginBottom:'5px'}}/>
        <p>{parser(answer)}</p>
      </Content> 
    </Wrapper>
  );
}

export default Collapse;
