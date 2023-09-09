import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Container = styled.div`
  // background:gray;
  // border:1px solid gray;
  min-height:220px;
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  padding:10px;
  border-radius:10px;
  background: #70e1f5;  /* fallback for old browsers */


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
  margin:2px;
  border:none;
  border-radius:6px;
  background:teal;
  color:white;
`
const Word = styled.div`
  width:100%;
  min-height:40px;
  background: #6190E8;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #A7BFE8, #6190E8);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #A7BFE8, #6190E8); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
  color:white;  
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:20px;
  word-break:break-all;
  padding:2px;
  border-radius:6px;
  // border:1px solid gray;

`
const Meaning = styled.div`
  width:100%;
  min-height:105px;
  margin-top:7px;
  // background:skyblue;
  text-align:center;
  font-size:40px;
  border-radius:6px;
  background: #FFEEEE;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #DDEFBB, #FFEEEE);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #DDEFBB, #FFEEEE); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  // border:1px solid gray;

  
`
const Show = styled.button`
  width:100%;
  height:40px;
  margin-top:5px;
  background:lightgreen;
  border:none;
  border-radius:6px;
  cursor:pointer;
  // border:1px solid gray;
  background: #1e3c72;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #2a5298, #1e3c72);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #2a5298, #1e3c72); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
  color:white;
  &:hover{
    background: #1e3c72;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #2a5298, #1e3c72);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #2a5298, #1e3c72); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    

  }
`
function Card({ wordProp, handleChange }) {
  const [showMeaning, setShowMeaning] = useState(false)
  const nextWord = () => {
    setShowMeaning(false)
    handleChange()
  }
  return (
    <Container>
      <Word style={showMeaning ? { height: '40px' } : { height: '150px', fontSize: '40px', transitionDuration: '.1s' }}>{wordProp.word} </Word>
      {
        showMeaning &&
        <Meaning
          as={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >{wordProp.meaning}</Meaning>
      }
      {!showMeaning && <Show onClick={() => setShowMeaning(true)} >Show meaning</Show>}
      {showMeaning && <Bottom>
        <Button onClick={nextWord}>Don't Know</Button>
        <Button onClick={nextWord}>Know</Button>
      </Bottom>
      }
    </Container>
  )
}

export default Card