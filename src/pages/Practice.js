import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
`
const ControlButtons = styled.div`
  &>button{
    margin-right:10px;
  }
  // background:gray;
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  justify-content:center;
`
const Button = styled.button`
  padding:5px;
  width:100px;
  height:40px;
  margin:5px;
  background:orange;
  border:none;
  border-radius:20px;
  cursor:pointer;
  color:white;
  background: #5f2c82;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #49a09d, #5f2c82);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #49a09d, #5f2c82); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
 &:hover{
  background: #5f2c82;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #49a09d, #5f2c82);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #49a09d, #5f2c82); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
 }
`

function About() {
  return (
    <Container as={motion.div}
      initial={{ y: '100vh' }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
      style={{ textAlign: 'justify' }}
    >
      <ControlButtons>
        <Button>All</Button>
        <Button>From deck</Button>
        <Button>Easy</Button>
        <Button>Hard</Button>
        <Button>Random</Button>
        <Button>Unreviewed</Button>
      </ControlButtons>

    </Container>
  )
}

export default About