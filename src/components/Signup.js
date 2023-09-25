import React from 'react';
import styled from 'styled-components';
import useModal from '../Hooks/useModal';
import Login from '../modalViews/Login';

const SignupButtonStyled = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 15px 30px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const SignupButton = ({ text, onClick }) => {
    return (
        <SignupButtonStyled onClick={onClick}>
            {text} 
        </SignupButtonStyled>
    );
};

function App() {
    const {dispatchModal } = useModal()

    const handleSignup = () => {
            dispatchModal({ type: 'SET_CONTENT', content: <Login /> })
    };

    return (
        <>
            <SignupButton text="Start Learning with Cardsera" onClick={handleSignup} />
        </>
    );
}

export default App;
