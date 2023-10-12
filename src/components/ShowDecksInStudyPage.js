import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define the shine animation
const shineAnimation = keyframes`
  0% {
    transform: translate(-150%, -150%);
    opacity: 0;
  }
  50% {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  100% {
    transform: translate(0, 0);
    opacity: 0;
  }
`;

// Styled components for the card
const CardContainer = styled.div`
  position: relative;
  cursor:pointer;
  width: 100%;
  height: 80px;
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

const ShineEffect = styled.div`
  position: absolute;
  top: -100%;
  left: -100%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to top right,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0) 50%,
    rgba(255, 255, 255, 0.8) 100%
  );
  animation: ${shineAnimation} 1.5s infinite;
  opacity: 0;
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
      <ShineEffect />
      <CardName>{name}</CardName>
    </CardContainer>
  );
};

export default ShineCard;
