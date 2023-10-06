import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import useUser from '../Hooks/useUser'
import useModal from '../Hooks/useModal'
import { Button } from '../components/Collapse'

const Container = styled.div`

`

function ChooseDeck({fetchCards}) {
  const [decks, setDecks] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()
  const {dispatchModal} = useModal()

  useEffect(() => {
 
    const loadDecks = async () => {
      if (!user)
        return
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/decks`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': user.token
          }
        })
        const json = await response.json()
        if (!response.ok) {
          return toast.error(json.message)
        }
        setLoading(false)
        setDecks(json.decks)
      }
      catch (e) {
        return toast.error(e.message)
      }
    }
    loadDecks()
  }, [user])

  const handleClick = (deckName) => {
    fetchCards({type:'chooseDeck',value:deckName})
    dispatchModal({type:'CLOSE'})
  }
  if (loading) 
    return <h3>Loading...</h3>
  return (
    <Container>

      { 
        decks && decks.length ? <> 
        <h3 style={{marginBottom:'5px'}}>Choose a deck</h3>
        {decks.map(item => { 
          return (
            <Button key={item.value} onClick={()=>handleClick(item.value)}>{item.value}</Button>
)
        })} </>: <h3>No deck found!</h3>
      } 

    </Container>
  )
}

export default ChooseDeck