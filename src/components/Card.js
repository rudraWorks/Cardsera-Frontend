import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Container = styled.div`
  background:gray;
  min-height:200px;
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  padding:5px;
`
const Bottom = styled.div`
  margin-top:auto;
  width:100%;
  height:40px; 
  // background:gray;
  display:flex;
`
const Button = styled.button`
  width:50%;
  margin:3px;
`
const Word = styled.div`
  width:100%;
  min-height:40px;
  background:orange;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:20px;
  word-break:break-all;
  padding:2px;
`
const Meaning = styled.div`
  width:100%;
  min-height:90px;
  margin-top:10px;
  background:skyblue;
  text-align:center;
  font-size:40px;
`
const Show = styled.button`
  width:100%;
  height:40px;
  margin-top:5px;
`
function Card({ wordProp, handleChange }) {
  const [showMeaning, setShowMeaning] = useState(false)
  const nextWord = () => {
    setShowMeaning(false)
    handleChange()
  }
  return (
    <Container>
      <Word style={showMeaning ? { height: '40px' } : { height: '150px', fontSize: '40px' }}>{wordProp.word} </Word>
        {
          showMeaning &&
          <Meaning
           as={motion.div}
           initial={{scale:0}}
           animate={{scale:1}}
          >{wordProp.meaning}</Meaning>
        }
      {!showMeaning && <Show onClick={() => setShowMeaning(true)}>Show meaning</Show>}
      {showMeaning && <Bottom>
        <Button onClick={nextWord}>Don't Know</Button>
        <Button onClick={nextWord}>Know</Button>
      </Bottom>
      }
    </Container>
  )
}

export default Card