import React, { useState, useEffect } from 'react'
import useUser from '../Hooks/useUser'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import formatChange from '../utils/dateFormatChanger'
import Chart from '../components/Chart'
import { Button } from './Practice'
import DeckCard from '../components/DeckCard'
import { useNavigate } from 'react-router-dom'
import Heatmap from '../components/Heatmap'


const Container = styled.div`
  display:flex;
  flex-direction:column; 
  border-radius:10px;
`
const Card = styled.div`
  background:aliceblue;
  border:1px solid skyblue;
  margin:10px;
  border-radius:10px;
  padding:15px;
  &>h1{
    font-weight:300;
  }
  &>h3{
    font-weight:200; 
  }
`


function Progress() {
  const { user } = useUser()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dayWiseReviews, setDayWiseReviews] = useState([])
  const [dayWiseAccuracies, setDayWiseAccuracies] = useState([])
  const [toggleAccuracy, setToggleAccuracy] = useState(true)
  const [chartData, setChartData] = useState([])
  const navigate = useNavigate()
  useEffect(() => {

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
        setLoading(false)
        if (!response.ok) {
          return toast.error(json.message)
        }
        setData(json)
        const dwr = json.day.map((item) => {
          return { time: formatChange(item.date), value: item.totalReviewed }
        })
        const dwa = json.day.map((item) => {
          return { time: formatChange(item.date), value: (item.correct * 100) / item.totalReviewed }
        })
        setDayWiseReviews(dwr)
        setDayWiseAccuracies(dwa)
        setChartData(dwa)
      }
      catch (e) {
        toast.error(e.message)
      }
      setLoading(false)
    }
    if (user && user !== 'LOADING')
      loadData()

  }, [user])

  useEffect(() => {
    if (toggleAccuracy) {
      setChartData(dayWiseAccuracies)
    }
    else setChartData(dayWiseReviews)
  }, [toggleAccuracy])

  const handleChangeData = () => {
    setToggleAccuracy((p) => !p)
  }

  const updateDeck = (deckId) => {
    navigate(0)
  }

  if (!user)
    return <h3>User auth failed</h3>
  if (loading)
    return <Loader />
  return (
    <Container
      as={motion.div}
      initial={{ y: '100vh' }}
      animate={{ y: 0 }}
      transition={{ type: 'sneek' }}
    >



      <Card>
        <h1 style={{ color: 'black' }}>Today</h1>
        <h3>Total reviewed: {data?.today.totalReviewed || 0}</h3>
        <h3>Correct: {data?.today.correct || 0}</h3>
        <h3>Incorrect: {data?.today.incorrect || 0}</h3>
        <h3>Accuracy: {(data?.today.correct * 100 / data?.today.totalReviewed).toFixed(0)}%</h3>

      </Card>
      <Card>
        <h1 style={{ color: 'black' }}>General</h1>
        <h3>Total cards: {data?.general.totalCards || 0}</h3>
        <h3>Last added on: {data?.general.lastAddedDate ? new Date(data?.general.lastAddedDate).toLocaleDateString('en-GB',{timeZone:'UTC'}) : 'NA'}</h3>
        <h3>Last reviewed on: {data?.general.lastReviewed ? new Date(data?.general.lastReviewed).toLocaleDateString('en-GB',{timeZone:'UTC'}) : 'NA'}</h3>

      </Card>
      <Card style={{ maxHeight: '500px', overflowY: 'scroll' }}>
        <h1 style={{ color: 'black' }}>Decks</h1>
        <h3>Total decks: {data?.decks.totalDecks || 0}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {
            data?.decks?.allDecks.map(deck => {
              return <DeckCard key={deck.name} imports={deck.imports} userToken={user.token} name={deck.name} share={deck.share} totalCards={deck.totalCards} updateDeck={updateDeck} createdOn={deck.dateCreated} id={deck._id} />
            })
          }
        </div>
      </Card>
      <Card style={{ padding: '15px' }}>
        <Heatmap dayWiseReviews={dayWiseReviews} />
      </Card>

      <Card style={{ display: 'none' }}>

        <Chart chartData={chartData} />

        <h3 style={{ marginLeft: '10px', marginTop: '10px' }}>x-axis: date <br /> y-axis: {toggleAccuracy ? 'Accuracy' : 'Cards reviewed'}</h3>
        <Button style={{ marginBottom: 0 }} onClick={handleChangeData}>{!toggleAccuracy ? 'Accuracy' : 'Reviews'}</Button> 

      </Card>

      <span style={{ margin: '10px', color: 'gray' }}>Current time: {new Date().toUTCString()}</span>

    </Container>
  )
}

export default Progress 