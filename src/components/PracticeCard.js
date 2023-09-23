import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import useModal from '../Hooks/useModal'
import CardDetails from '../modalViews/CardDetails'
import Confirm from '../modalViews/Confirm'
import { toast } from 'react-toastify'
import useUser from '../Hooks/useUser'


const Box = styled.div`
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  padding:5px;
  border-radius:10px;
  background:aliceblue;
  border:1px solid skyblue;
`
const Bottom = styled.div`
  width:100%;
  height:40px; 
  display:flex;
  justify-content:center;
  position:absolute;
  bottom:2px;
`
const Button = styled.button`
  width:100px;
  margin:2px;
  background:gray;
  margin-top:7px;
  border:none;
  border-radius:6px;
  cursor:pointer;
  color:white;
  &:nth-child(1){
    background:tomato;
  }
  &:nth-child(1):hover{
    background:#df563e;
  }
  &:nth-child(3){
    background:tomato; 
  }
  &:nth-child(3):hover{
    background:#df563e;
  }
  &:nth-child(2){
    background:#1b911b;
  }
  &:nth-child(2):hover{
    background:green;
  }
  &:nth-child(4){
    background:orange;
  }
  &:nth-child(4):hover{
    background:darkorange;
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
  padding:10px;
  border-radius:6px;
  text-align:center;
`
const Meaning = styled.div`
  width:100%;
  min-height:105px;
  max-height:300px;
  margin-top:7px;
  font-size:20px;
  border-radius:6px;
  background:lightgray;
  border:1px solid lightgray;
  padding:10px;
  overflow-y:scroll;
`
const Show = styled.button`
  width:290px;
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

const Pre = styled.pre`
  white-space: pre-wrap;       /* css-3 */
  white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
  white-space: -pre-wrap;      /* Opera 4-6 */
  white-space: -o-pre-wrap;    /* Opera 7 */
  word-wrap: break-word;       /* Internet Explorer 5.5+ */
`
function Card({ wordProp, handleKnow, handleDontKnow, progress }) {
  const [showMeaning, setShowMeaning] = useState(false)
  const { dispatchModal } = useModal()
  const { user } = useUser()

  const know = () => {
    setShowMeaning(false)
    handleKnow()
  }
  const dontKnow = () => {
    setShowMeaning(false)
    handleDontKnow()
  }


  const deleteCard = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/card`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': user.token
        },
        body: JSON.stringify({ cardId: wordProp.cardId, deck: wordProp.deck })
      })
      const json = await response.json()
      if (!response.ok) {
        toast.error(json.message)
      }
      else {
        // toast.success(json.message)
        handleKnow()
        setShowMeaning(false)

      }
    }
    catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <>
      <Status>  <span> Don't know: {progress.dontKnow}</span> <span>Know: {progress.know} </span></Status>
      <br />
      <Box>

        <Word style={showMeaning ? { height: 'fit-content' } : { fontSize: '40px',minHeight:'100px', transitionDuration: '.1s' }}>
          {wordProp.front} 
        </Word> 
        {
          showMeaning &&
          <Meaning
            as={motion.div}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}

          ><Pre>{wordProp.back}</Pre></Meaning>
        }

      </Box >
      <Bottom>
        {!showMeaning && <Show onClick={() => setShowMeaning(true)} >Show meaning</Show>}
        {showMeaning && <>
          <Button onClick={dontKnow}>Don't Know</Button>
          <Button onClick={know}>Know</Button>
          <Button onClick={() => dispatchModal({ type: 'SET_CONTENT', content: <Confirm message={"Are you sure you want to delete this card?"} deleteItem={deleteCard} /> })} >
            Delete
          </Button>

          <Button onClick={() => dispatchModal({ type: 'SET_CONTENT', content: <CardDetails card={wordProp} /> })
          }>
            Details
          </Button>
        </>
        }
      </Bottom> 


    </>
  )
}

export default Card 