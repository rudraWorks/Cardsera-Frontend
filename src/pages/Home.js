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
      <h1>Welcome</h1>


    </Container>
  )
}

export default Home