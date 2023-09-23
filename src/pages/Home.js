import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Container = styled.div`

`



// Define styled components
const Header = styled.header`
  background-color: #2d4059;
  color: #fff;
  text-align: center;
  padding: 2rem 0;
`;

const Title = styled.h1`
  font-size: 2.5rem;
`;

const Main = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  padding-left: 1.5rem;
  margin-top: 0.5rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const Footer = styled.footer`
  background-color: #2d4059;
  color: #fff;
  text-align: center;
  padding: 2rem 0;
`;



function Home() {
  return (
    <Container
      as={motion.div}
      initial={{ y: '100vh' }}
      animate={{ y: 0 }}
      transition={{ type: 'sneek' }}
    >

      <Header>
        <Title>Welcome to Cardsera: Your Interactive Learning Platform</Title>
      </Header>
      <Main>
        <Section>
          <SectionTitle>What is Cardsera?</SectionTitle>
          <p>Cardsera is your personal gateway to effective and engaging learning. It's the ultimate platform for interactive learning, allowing you to transform information into knowledge effortlessly.</p>
        </Section>
        <Section>
          <SectionTitle>How Does Cardsera Work?</SectionTitle>
          <List>
            <ListItem>Easily create interactive flashcards by entering questions and answers. The question goes on the front, and the answer on the back.</ListItem>
            <ListItem>Organize your flashcards into decks, each representing a chapter or lesson. Stay in control of your learning journey.</ListItem>
            <ListItem>Practice your decks at your own pace, anytime, anywhere. Cardsera adapts to your schedule, making learning fit into your life seamlessly.</ListItem>
            <ListItem>Test your knowledge with active recall. Cardsera presents you with the question, and you must recall the answer before revealing it. It's proven to enhance memory retention.</ListItem>
            <ListItem>Share your knowledge effortlessly. Every deck comes with a unique Deck ID, making it simple for you to collaborate with friends, classmates, or colleagues.</ListItem>
          </List>
        </Section>
        <Section>
          <SectionTitle>Why Choose Cardsera?</SectionTitle>
          <List>
            <ListItem>Maximize your study time with the science-backed method of active recall. Say goodbye to passive learning.</ListItem>
            <ListItem>Tailor your learning experience with decks that suit your needs, whether it's for school, work, or personal growth.</ListItem>
            <ListItem>Collaborate and learn together with your peers by sharing decks seamlessly.</ListItem>
            <ListItem>Access your decks from your computer, tablet, or phone. Learning is at your fingertips.</ListItem>
          </List>
        </Section>
        <Section>
          <SectionTitle>Revise Your Decks Anytime</SectionTitle>
          <p>Whether you're preparing for interviews or simply want to stay sharp, Cardsera allows you to revise your decks every day. Stay ahead and be at your best!</p>
        </Section>
      </Main>
      <Footer>
        <p>Join thousands of learners who have unlocked the power of interactive learning with Cardsera. Start your journey to knowledge mastery today!</p>
      </Footer>

    </Container>
  )
}

export default Home

