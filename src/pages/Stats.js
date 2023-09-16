import React, { useState, useEffect } from 'react'
import useUser from '../Hooks/useUser'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const Container = styled.div`
  display:flex;
  flex-wrap:wrap;
  align-items:start;
  justify-content:center;
  height:fit-content;
`
const Card = styled.div`
  min-width:280px; 
  min-height:250px;
  background:aliceblue;
  border:1px solid skyblue;
  margin:15px;
  border-radius:10px;
  padding:15px;
`

const Hr = styled.hr`
  background-color:skyblue;
  height:1px;
  border:none;
  margin-bottom:10px;
`
const Box = styled.div`
  background:lightgray;
  margin-top:5px;
  display:flex;
  flex-direction:column;
  padding:4px;
  border-radius:5px;
  font-weight:bolder;
`
function Stats() {
  const { user } = useUser()
  const [data, setData] = useState(null)
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    if (!user)
      return
    setLoading(true)
    const loadData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/stats/data`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': user.token
          }
        })
        const json = await response.json()
        console.log(json);
        if (!response.ok) {
          return toast.error(json.message)
        } 
        setData(json)
      }
      catch (e) { 
        toast.error(e.message)
      }
      setLoading(false)
    }
    loadData()
  }, [user])

  if (!user)
    return <h3>User auth failed</h3>
  if(loading)
    return <Loader/>
  return (
    <Container
      as={motion.div}
      initial={{ y: '100vh' }}
      animate={{ y: 0 }}
      transition={{ type: 'sneek' }}
    >
      <Card>
        <h1>Today</h1> 
        <Hr/>
        <h3>Total reviewed: {data?.today.totalReviewed || 0}</h3>
        <h3>Correct: {data?.today.correct || 0}</h3>
        <h3>Incorrect: {data?.today.incorrect || 0}</h3>
        <h3>Accuracy: {(data?.today.correct*100/data?.today.totalReviewed).toFixed(0)}%</h3>

      </Card>  
      <Card>
        <h1>General</h1> 
        <Hr/> 
        <h3>Total cards: {data?.general.totalCards || 0}</h3>
        <h3>Last added on: {data?.general.lastAddedDate?new Date(data?.general.lastAddedDate).toLocaleDateString('en-GB'):'NA'}</h3>
        <h3>Last reviewed on: {data?.general.lastReviewed?new Date(data?.general.lastReviewed).toLocaleDateString('en-GB'):'NA'}</h3>

      </Card>
      <Card>
        <h1>Decks</h1>
        <Hr/>
        <h3>Total decks: {data?.decks.totalDecks || 0}</h3>
        {
          data?.decks?.allDecks.map(deck=>{
            return <Box key={deck.name}>
                <span>Deck name: {deck.name} </span>
                <span>Total cards: {deck.totalCards}</span>
                <span>Created on: {new Date(deck.dateCreated).toLocaleDateString('en-gb')}</span>
              </Box>
          })
        }

      </Card>

    </Container>
  )
}

export default Stats