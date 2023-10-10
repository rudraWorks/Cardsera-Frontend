import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 16px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Text = styled.p`
  font-size: 18px;
  margin: 0;
  background:lightgreen;
  padding:5px;
  border-radius:15px;
`;

const CopyButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const CopyTextComponent = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    const textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    document.body.removeChild(textField);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Wrapper>
        <h3>New to Cardsera? Import this awesome Javascript deck!</h3>
      <Text>{text}</Text>
      <CopyButton onClick={handleCopyClick}>
        {isCopied ? 'Copied!' : 'Copy'}
      </CopyButton>
    </Wrapper>
  );
};

export default CopyTextComponent;
