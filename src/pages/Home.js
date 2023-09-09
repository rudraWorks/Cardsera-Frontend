import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Container = styled.div`
  text-align:center;
`

function Home() {
  return (
    <Container 
      as={motion.div}
      initial={{ y: '100vh' }} 
      animate={{ y: 0 }}
      transition={{ type: 'sneek' }}
    >
      <img style={{width:'250px'}} src='/vocco.png' />
    </Container>
  )
}

export default Home