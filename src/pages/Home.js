import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import VocoFeatures from '../components/Features'

const Container = styled.div`

`
const Heading = styled.div` 
font-size: 36px;  
font-weight: bolder;  
background: linear-gradient(45deg, #2c3e50, #34495e, #2c3e50); 
-webkit-background-clip: text;
background-clip: text;
color: transparent;

@media screen and (min-width: 768px) {
  font-size: 50px; /* Font size for large screens */
} 
`
const Para = styled.p`
  margin-top:20px;
  text-align:justify;
  font-size:25px;
`

function Home() {
  return (
    <Container
      as={motion.div}
      initial={{ y: '100vh' }}
      animate={{ y: 0 }} 
      transition={{ type: 'sneek' }}
    >
      <Heading>
      Voco: Building Eloquence, One Word at a Time
      </Heading>
      <Para>

        Welcome to Voco, where language mastery is at your fingertips. Create dynamic flashcards that link words and meanings, organize them into decks, and practice at your own pace. As you engage with your flashcards, Voco intelligently tracks your performance, assigning scores and meticulously maintaining your stats. These detailed statistics provide valuable insights into your progress, helping you refine your learning strategy. With Voco, your vocabulary expands, your language skills sharpen, and your journey to linguistic excellence is enriched every step of the way.
      </Para>
      <br/>

    <h1>Features</h1>
    <br/>
    <VocoFeatures/>


    </Container>
  )
}

export default Home