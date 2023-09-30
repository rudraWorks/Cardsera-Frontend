import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import PracticeCard from '../components/PracticeCard'
import useUser from '../Hooks/useUser'
import { toast } from 'react-toastify'
import shuffle from '../utils/shuffleArray'
import useModal from '../Hooks/useModal'
import ChooseDeck from '../modalViews/ChooseDeck'
import Loader from '../components/Loader'

const Container = styled.div`
  display:flex;
  flex-direction:column;
  height:90%;
  
`
const ControlButtons = styled.div`
  &>button{
    margin:10px;
    margin-top:0px;
  }
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  align-items:center;
`
export const Button = styled.button`
  padding:5px;
  min-width:100px;
  height:35px;
  margin:10px;
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
  const [word, setWord] = useState(null)
  const [complete, setComplete] = useState(true)
  const [loading, setLoading] = useState(false)
  let [arr, setArr] = useState([])
  const [progress, setProgress] = useState({ know: 0, dontKnow: 0 })


  const { user } = useUser()
  const { dispatchModal } = useModal()

  const handleKnow = async () => {
    if (!arr.length) {
      setComplete(true)
      return
    }
    arr.shift()
    setArr([...arr])
    setProgress(p => ({ know: p.know + 1, dontKnow: p.dontKnow - 1 }))
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/correct`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'authorization': user.token
        },
        body: JSON.stringify({ cardId: word.cardId })
      })
      const json = await response.json()
      if (!response.ok) {
        toast.error(json.message)
      }
    }
    catch (e) {
      toast.error(e.message)
    }
  }

  const handleDontKnow = async () => {
    setArr([...shuffle(arr)])

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/incorrect`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'authorization': user.token
        },
        body: JSON.stringify({ cardId: word.cardId })
      })
      const json = await response.json()
      console.log(json);
      if (!response.ok) {
        toast.error(json.message)
      }
    }
    catch (e) {
      toast.error(e.message)
    }

  }

  const updateEditedWord = (_id,word,meaning) => {
    setArr((p)=>{
        return p.map((item)=>{
          if(item._id!==_id)
            return item;
          return {...item,front:word,back:meaning}
        })
    })
  }

  useEffect(() => {
    if (arr.length) {
      setWord(arr[0])
      setProgress(p => ({ ...p, dontKnow: arr.length }))
    }
    else {
      setWord(null)
      setComplete(true)
    }
  }, [arr])

  const fetchCards = async (action) => {
    setLoading(true)
    try {
      let response

      switch (action.type) {
        case 'allCards': response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/allCards`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': user.token
          }
        });
          break;

        case 'unreviewedCards': response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/unreviewedCards`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': user.token
          }
        })
          break;

        case 'easyCards': response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/easyCards`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': user.token
          }
        })
          break;

        case 'hardCards': response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/hardCards`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': user.token
          }
        })
          break;

        case 'chooseDeck': response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/fromDeck/${action.value}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorization': user.token
            }
          })
          break;
      }

      const json = await response.json()
      console.log(json);
      if (!response.ok) {
        toast.error(json.message)
        setComplete(true)
      }
      else {
        setProgress({ know: 0, dontKnow: json.cards.length })
        json.cards = shuffle(json.cards)
        setArr(json.cards)
        setComplete(false) 
      }
    }
    catch (e) {
      toast.error(e.message)
      setComplete(true)
    }
    setLoading(false)
  }

  if (!user)
    return <h3>User auth failed</h3>

  if (loading)
    return <Loader/>

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
            transition={{ delay: .3 }}
          >  
         
            <PracticeCard updateEditedWord={updateEditedWord} wordProp={word} handleKnow={handleKnow} progress={progress} handleDontKnow={handleDontKnow} setWord={setWord} />
          </motion.div>
        }
      </AnimatePresence>

      <AnimatePresence>
        {
          complete &&
          <ControlButtons
            as={motion.div}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Button onClick={() => fetchCards({ type: 'allCards' })}>All cards</Button>
            <Button onClick={() => dispatchModal({ type: 'SET_CONTENT', content: <ChooseDeck fetchCards={fetchCards} /> })}>Practice a deck</Button>
            <Button onClick={() => fetchCards({ type: 'easyCards' })}>Easy cards</Button>
            <Button onClick={() => fetchCards({ type: 'hardCards' })}>Hard cards</Button>
            <Button onClick={() => fetchCards({ type: 'unreviewedCards' })}>Unreviewed cards</Button>

          </ControlButtons>
        }
      </AnimatePresence>



    </Container>
  )
}

export default About