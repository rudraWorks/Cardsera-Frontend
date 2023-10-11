import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Signup from '../components/SignupButton'
import useUser from '../Hooks/useUser'
import HomepageCarousal from '../components/HomepageCarousal'

const Container = styled.div`
margin-top:15px;
font-size:20px;
// background:gray;
`



// Define styled components
const Header = styled.header`
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
  &>p{
    text-align:justify;
  }
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
  text-align:justify;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 2rem 0;
`;



function Home() {
  const { user } = useUser()

  return (
    <Container
      as={motion.div}
      initial={{ y: '100vh' }}
      animate={{ y: 0 }}
      transition={{ type: 'sneek' }}
    >

      <Header>
        <Title>Welcome to  <span style={{color:'red'}}>Cardsera</span> : Your Interactive Learning Platform</Title>
      </Header>

      <Main>
        <Section>
          <p>
            <img style={{ width: '100px' }} src='logo101.png' />
            Unlock the full potential of your learning journey with Cardsera. Our innovative platform utilizes the science of <b> spaced repetition</b> to revolutionize the way you remember and comprehend information. No more struggling to retain knowledge or last-minute cramming sessions. Cardsera adapts to your learning pace, ensuring you review each concept at precisely the right moment for optimal retention. Cardsera guarantees that what you learn stays with you for the long run. Welcome to a world where learning isn't just about acquiring information; it's about mastering it.</p>
          {/* <video controls style={{ width: '100%' }} >
            <source src='/videos/trim.mp4'></source>
          </video>
          <i><small>Ali Abdaal, a famous YouTuber and productivity coach. <a href='https://www.youtube.com/@aliabdaal' target='_blank' >Link</a></small></i> */}
        </Section>
        <Section>
          <SectionTitle>How to use Cardsera?</SectionTitle>
          <List>
            <ListItem>
              <b>Comprehensive Learning:</b> Begin by thoroughly understanding the topics from your notes.</ListItem>

            <ListItem>
              <b>Flashcard Creation:</b> Convert crucial points into flashcards and organize them into relevant decks within Cardsera.
            </ListItem>

            <ListItem>
              <b>Regular Review:</b> Establish a routine for reviewing your decks at appropriate intervals, such as twice a day or thrice a week, depending on your convenience.

            </ListItem>
            <ListItem>
              <b> Adaptive Frequency:</b> Adjust your review frequency based on your progress graph. Increase or decrease the frequency as needed to optimize your learning.

            </ListItem>

          </List>
        </Section>
        {/* <Section>
        <SectionTitle>Sample Deck</SectionTitle>
          <List>
            <ListItem>Copy the deck ID and import in your account after login.</ListItem>
          </List>
          <ShelfCard
            title="Javascript"
            description="Discover the vital JavaScript interview questions essential for your preparation within these 37 flashcards."
            additionalText="6516e4bacc99a3c2ba76a00d"
            stars={4.5}
            starColor="orange"
            circleNumber={34}
            circleColor="orange"
            numRatings={1.8}
          />
        </Section> */}
        {!user && <Signup />} 
        
        <Section>
          <SectionTitle>Snapshots</SectionTitle>
          <HomepageCarousal/>
        </Section>
      </Main>
      <Footer>
        <p>Join thousands of learners who have unlocked the power of interactive learning with Cardsera. Start your journey to knowledge mastery today!</p>
      </Footer>

    </Container>
  )
}

export default Home

