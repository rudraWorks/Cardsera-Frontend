import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Container = styled.div`
   text-align:justify;
`

function Home() {
  return (
    <Container
      as={motion.div}
      initial={{ y: '100vh' }}
      animate={{ y: 0 }}
      transition={{ type: 'sneek' }}
    >
      <h1>What is Voco?</h1>
      <br />
      <p>World's simplest browser-based utility for generating fake text. Load your text in the input form on the left, adjust the fakeness level in the options, and you'll instantly get new text with some letters replaced with visually indistinguishable fake letters in the output area. Powerful, free, and fast. Created by developers from</p>
      <br/>
      
      <h1>What is Voco?</h1>
      <br />
      <p>World's simplest browser-based utility for generating fake text. Load your text in the input form on the left, adjust the fakeness level in the options, and you'll instantly get new text with some letters replaced with visually indistinguishable fake letters in the output area. Powerful, free, and fast. Created by developers from</p>
      <br/>

      <h1>What is Voco?</h1>
      <br />
      <p>World's simplest browser-based utility for generating fake text. Load your text in the input form on the left, adjust the fakeness level in the options, and you'll instantly get new text with some letters replaced with visually indistinguishable fake letters in the output area. Powerful, free, and fast. Created by developers from</p>
      <br/>

      <h1>What is Voco?</h1>
      <br />
      <p>World's simplest browser-based utility for generating fake text. Load your text in the input form on the left, adjust the fakeness level in the options, and you'll instantly get new text with some letters replaced with visually indistinguishable fake letters in the output area. Powerful, free, and fast. Created by developers from</p>
      <br/>

      <h1>What is Voco?</h1>
      <br />
      <p>World's simplest browser-based utility for generating fake text. Load your text in the input form on the left, adjust the fakeness level in the options, and you'll instantly get new text with some letters replaced with visually indistinguishable fake letters in the output area. Powerful, free, and fast. Created by developers from</p>
      <br/>

    </Container>
  )
}

export default Home