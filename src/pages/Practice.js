import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import Card from '../components/Card'
import arr from '../utils/fakeMeanings'

const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  margin-top:30px;
  // background:lightgray;
  // border:1px solid gray;
  // border-radius:10px;

`
const ControlButtons = styled.div`
  &>button{
    margin:10px;
    margin-top:0px;
  }
  // flex-direction:column;
  // background:gray;
  padding:2px;
  // border-radius:10px;
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  align-items:center;
`
const Button = styled.button`
  padding:5px;
  width:100px;
  height:35px;
  margin:5px;
  font-weight: bold;
    display: inline-block;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.2),0 2px 0 rgba(255,255,255,0.15) inset;
    -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.2), 0 2px 0 rgba(255,255,255,0.15) inset;
    box-shadow: 0 1px 2px rgba(0,0,0,0.2), 0 2px 0 rgba(255,255,255,0.15) inset;
    color: #fff !important;
    border: 1px solid #c47b07;
    background: -webkit-gradient(linear, left top, left bottom, from(#fba00c), to(#f67c16));
    background: -moz-linear-gradient(top, #fba00c, #f67c16);
    background: -o-linear-gradient(top, #fba00c, #f67c16);
    background: linear-gradient(to bottom, #fba00c, #f67c16);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fba00c', endColorstr='#f67c16');
    font-size: 1em;
    border-radius: 6px;
    text-shadow: 0 0 2px rgba(0,0,0,0.5);

    &:hover{
      background:#e77313;
    }
`


function About() {
  const [btn, setBtn] = useState(null)
  const [word, setWord] = useState(arr[0])
  const [complete, setComplete] = useState(true)

  const handleChange = () => {
    if (!arr.length) {
      setComplete(true)
      return
    }
    setWord(arr[0])
    arr.shift()
  }

  const handleBtn = (e) => {
    console.log(e.target.id)
    setComplete(false)
  }
  return (
    <Container as={motion.div}
      initial={{ y: '100vh' }}
      animate={{ y: 0 }}
      transition={{ type: 'sneek' }}
      style={{ textAlign: 'justify' }}
    >
      <AnimatePresence>
        {!complete && word &&
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{delay:.3}}
            style={{ width: '300px' }}
          >
            <Card wordProp={word} handleChange={handleChange} />
          </motion.div>
        }
      </AnimatePresence>

      <AnimatePresence>
        {
          complete &&
          <>
            <ControlButtons
              as={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}

            >
              <Button id='all' onClick={handleBtn}>All</Button>
              <Button id='fromdeck' onClick={handleBtn}>From deck</Button>
              <Button onClick={handleBtn}>Easy</Button>
            </ControlButtons>
            <ControlButtons
              as={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}

            >
              <Button onClick={handleBtn}>Hard</Button>
              <Button onClick={handleBtn}>Random</Button>
              <Button onClick={handleBtn}>Unreviewed</Button>
            </ControlButtons>
          </>
        }
      </AnimatePresence> 



    </Container>
  )
}

export default About