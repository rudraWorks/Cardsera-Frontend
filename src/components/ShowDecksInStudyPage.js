import React from 'react';
import styled, { keyframes } from 'styled-components';


// Styled components for the card
const CardContainer = styled.div`
  position: relative;
  cursor:pointer;
  width: 100%;
  height: 60px;
  margin: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  transition: transform 0.2s;
  @media (min-width: 768px) {
    /* For screens larger than 768px, set a fixed width */
    width: 300px;
  }

  &:hover {
    transform: scale(1.05);
  }
`;



const CardName = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const ShineCard = ({ name, fetchCards }) => {
  const handleClick = () => {
    fetchCards(name);
  };

  return (
    <CardContainer onClick={handleClick}>
      <CardName>{name}</CardName>
    </CardContainer>
  );
};

export default ShineCard;
