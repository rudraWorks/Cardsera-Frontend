import React from 'react';
import styled from 'styled-components';


const CardContainer = styled.div`
  width: 170px;
  height: 60px; /* Shorter height */
  background: #6190E8;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #A7BFE8, #6190E8);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #A7BFE8, #6190E8); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin: 10px; /* Add margin */
  
  &:hover {
    transform:scale(1.05);
  }
`;

const CardContent = styled.div`
  color: #fff;
  font-size: 18px; /* Smaller font size */
  text-align: center;
`;

function Card({ content,fetchCards }) {
  return ( 
    <CardContainer onClick={()=>fetchCards(content)}>
      <CardContent>{content}</CardContent>
    </CardContainer>
  );
}

export default Card;
