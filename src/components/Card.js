import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Button as Btn } from '../pages/Practice'
import useModal from '../Hooks/useModal'
import CardDetails from '../modalViews/CardDetails'
import Confirm from '../modalViews/Confirm'
import {toast} from 'react-toastify'
import useUser from '../Hooks/useUser'

const Box = styled.div`
  min-height:220px;
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  padding:10px;
  border-radius:10px;
  background:aliceblue;
  border:1px solid skyblue;
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
  // margin:2px;
  margin-top:5px;
  border:none;
  border-radius:6px;
  cursor:pointer;
  color:white;
  &:nth-child(1){
    background:tomato;
    margin-right:3px;
  }
  &:nth-child(1):hover{
    background:#df563e;
  }
  &:nth-child(2){
    background:#1b911b;
  }
  &:nth-child(2):hover{
    background:green;
  }
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
  text-align:center;
  font-size:30px;
  border-radius:6px;
  background:lightgreen;
  border:1px solid #77c577;
    display:flex;
  align-items:center;
  justify-content:center;
  word-break:break-all;
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

const Status = styled.div`
  width:90%;
  &>span{
    text-align:center;
    font-weight:bolder;
    margin:10px;
  }
  &>span:nth-child(2){
    color:green;
  }
  &>span:nth-child(1){
    color:red;
  }
`
function Card({ wordProp, handleKnow, handleDontKnow, progress }) {
  const [showMeaning, setShowMeaning] = useState(false)
  const { dispatchModal } = useModal()
  const {user} = useUser()

  const know = () => { 
    setShowMeaning(false)
    handleKnow()
  }
  const dontKnow = () => {
    setShowMeaning(false)
    handleDontKnow()
  }
  

  const deleteCard = async () => {
    try{
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/card`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'authorization':user.token
        },
        body:JSON.stringify({cardId:wordProp.cardId,deck:wordProp.deck})
      }) 
      const json = await response.json()
      if(!response.ok){
        toast.error(json.message) 
      }
      else{
        // toast.success(json.message)
        handleKnow()
      }
    }
    catch(e){
      toast.error(e.message)
    }
  }

  return (
    <center>

      <Box>
        <Word style={showMeaning ? { height: '40px' } : { height: '150px', fontSize: '40px', transitionDuration: '.1s' }}>{wordProp.front} </Word>
        {
          showMeaning &&
          <Meaning
            as={motion.div}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}

          >{wordProp.back}</Meaning>
        }
        {!showMeaning && <Show onClick={() => setShowMeaning(true)} >Show meaning</Show>}
        {showMeaning && <Bottom>
          <Button onClick={dontKnow}>Don't Know</Button>
          <Button onClick={know}>Know</Button>
        </Bottom>
        }
      </Box>
      <br />
      <Status>  <span> Don't know: {progress.dontKnow}</span> <span>Know: {progress.know} </span></Status>
      <br />
      <Btn onClick={() => dispatchModal({ type: 'SET_CONTENT', content: <Confirm deleteCard={deleteCard} /> }) } >
        Delete
      </Btn>


      <Btn onClick={() => dispatchModal({ type: 'SET_CONTENT', content: <CardDetails card={wordProp} /> })
      }>
        Details
      </Btn>
    </center>
  )
}

export default Card 