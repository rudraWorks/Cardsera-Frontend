import React, { useState } from 'react';
import styled from 'styled-components';

const FeaturesContainer = styled.div`
  background: linear-gradient(135deg, #3498db, #8e44ad);
  padding: 20px;
  color: white;
  max-height: ${props => (props.isVisible ? '500px' : '0')};
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')}; /* Added visibility property */
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: max-height 0.3s ease-in-out, visibility 0.3s ease; /* Smooth transition for both max-height and visibility */
`;

const ToggleButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

function VocoFeatures() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleFeatures = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <ToggleButton onClick={toggleFeatures}>
        {isVisible ? 'Hide Features' : 'Show Features'}
      </ToggleButton>
      <FeaturesContainer isVisible={isVisible}>
        <List>
          <ListItem><strong>Flashcard Creation:</strong> Easily create flashcards by pairing words with their meanings.</ListItem>
          <ListItem><strong>Customizable Decks:</strong> Organize your flashcards into personalized decks for tailored learning.</ListItem>
          <ListItem><strong>Spaced Repetition:</strong> Benefit from the power of spaced repetition to reinforce your memory efficiently.</ListItem>
          <ListItem><strong>Practice Anytime:</strong> Access your flashcards for practice sessions whenever and wherever you prefer.</ListItem>
          <ListItem><strong>Score Tracking:</strong> Voco intelligently tracks your performance, assigning scores to monitor your progress.</ListItem>
          <ListItem><strong>Detailed Statistics:</strong> Gain insights into your learning journey through comprehensive statistics.</ListItem>
          <ListItem><strong>Language Mastery:</strong> Enhance your vocabulary and language skills with each practice session.</ListItem>
          <ListItem><strong>User-Friendly Interface:</strong> Enjoy a seamless and user-friendly experience on our platform.</ListItem>
          <ListItem><strong>Personalized Learning:</strong> Adapt your learning experience to focus on challenging words and areas.</ListItem>
          <ListItem><strong>Linguistic Excellence:</strong> Elevate your language proficiency and communication skills with Voco.</ListItem>
        </List>
      </FeaturesContainer>
    </div>
  );
}

export default VocoFeatures;
