import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 300px;
  margin: 20px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out, background-position 0.3s ease-in-out;

  background: linear-gradient(135deg, transparent 0%, transparent 60%, rgba(255, 255, 255, 0.3) 100%);
  background-size: 200% 200%;
  background-position: right;

  &:hover {
    transform: translateY(-5px);
    background-position: left;
  }

  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -20%;
    left: -20%;
    width: 140%;
    height: 140%;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.4), transparent);
    opacity: 0;
    transform: rotate(45deg);
    transition: opacity 0.3s ease-in-out;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const CardHeader = styled.div`
  background-color: #007bff;
  color: #fff;
  padding: 12px;
  border-radius: 10px 10px 0 0;
  text-align: center;
  position: relative;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const Title = styled.h2`
  font-size: 20px;
  margin: 0;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 14px;
  margin: 0;
`;

const AdditionalText = styled.p`
  font-size: 14px;
  margin-top: 10px;
  position: relative;
`;

const CopyButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

const CopyFeedback = styled.div`
  background-color: #4caf50;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  opacity: ${({ show }) => (show ? '1' : '0')};
  transition: opacity 0.3s ease-in-out;
`;

const StarRatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const StarRatingText = styled.span`
  font-size: 16px;
  margin-right: 5px;
`;

const Star = styled.span`
  font-size: 24px;
  margin-right: 5px;
  background: ${({ colored, decimalValue, starColor }) =>
    `linear-gradient(to right, ${starColor} ${decimalValue * 100}%, transparent ${decimalValue * 100}%)`};
  -webkit-background-clip: text;
  color: transparent;
  display: inline-block;
`;

const EducationalCard = ({
  title,
  description,
  additionalText,
  stars,
  starColor,
  numRatings,
}) => {
  const additionalTextRef = useRef(null);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  const handleCopyClick = () => {
    if (additionalTextRef.current) {
      additionalTextRef.current.select();
      document.execCommand('copy');
      setShowCopyFeedback(true);

      // Hide the feedback message after 2 seconds
      setTimeout(() => {
        setShowCopyFeedback(false);
      }, 2000);
    }
  };

  return (
    <CardContainer>
      <CardHeader>
        <Title>{title}</Title>
      </CardHeader>
      <CardContent>
        <Description>{description}</Description>
        <AdditionalText>
            <span>Deck ID</span> &nbsp;&nbsp;
          {additionalText}
          <CopyFeedback show={showCopyFeedback}>Copied!</CopyFeedback>
          <CopyButton onClick={handleCopyClick}>Copy</CopyButton>
          <textarea
            ref={additionalTextRef}
            value={additionalText}
            readOnly
            style={{ position: 'absolute', left: '-9999px' }}
          />
        </AdditionalText>
        <StarRatingContainer>
          <StarRatingText>{stars} Stars</StarRatingText>
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              colored={index + 1 <= stars}
              decimalValue={stars - index}
              starColor={starColor}
            >
              &#9733;
            </Star>
          ))}
        </StarRatingContainer>
        <p>{numRatings}K+ Imports</p>
      </CardContent>
    </CardContainer>
  );
};

export default EducationalCard;
