import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import useUser from '../Hooks/useUser'
import { motion } from 'framer-motion'
import Loader from '../components/Loader'
import Collapse from '../components/Collapse'
import { Button } from './Practice'

const Container = styled.div` 
    display:flex; 
    justify-content:center; 
    align-items:center;
    flex-wrap:wrap;

`
const Close = styled.button`
    width:30px;
    height:30px;
    border-radius:50%;
    margin:10px;
    position:absolute;
    border:0px solid black;
    background:orange;
    display:flex;
    justify-content:center;
    align-items:center;
    right:0;
    cursor:pointer;
    &:hover{
        background:tomato;
        color:white;
    }
`


function Study() {
    const [decks, setDecks] = useState([])
    const [loading, setLoading] = useState(true)
    const [deckLoading, setDeckLoading] = useState(false)
    const [cardsArr, setCardsArr] = useState([])
    const [showCards, setShowCards] = useState(false)
    const [deckName, setDeckName] = useState('')
    const { user } = useUser()

    useEffect(() => {
        const loadDecks = async () => {
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
        if (user && user !== 'LOADING')
            loadDecks()
    }, [user])

    const fetchCards = async (deck) => {
        setDeckLoading(true)

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/fromDeck/${deck}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': user.token
                }
            })
            const json = await response.json()
            if (!response)
                toast.error(json.message)
            else {
                setShowCards(true)
                setCardsArr(json.cards)
                setDeckName(deck)
            }
        }
        catch (e) {
            toast.error(e.message)
        }
        setDeckLoading(false)

    }

    if (loading)
        return <Loader />
    return (
        <>
            {showCards && <h1 style={{marginLeft:'15px'}}>{deckName}</h1>}

            <Container as={motion.div}
                initial={{ y: '100vh', scale: 0 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ type: 'sneek' }}
            >
                {
                    !showCards && decks && decks.length ? <> 
                        {decks.map(item => {
                            return (
                                <Button key={item.value} onClick={() => fetchCards(item.value)} >
                                    {item.value}
                                </Button>
                            )
                        })} </> : (!showCards && <h3>No deck found!</h3>)
                }
            </Container>
            <br />
            {deckLoading && <h3 style={{ textAlign: 'center' }}>Loading...</h3>}
            {showCards && <Close onClick={() => setShowCards(false)}>&#10006;</Close>}
            {showCards && cardsArr.map(card => {
                return (
                    <Collapse key={card._id} question={card.front} answer={card.back} />
                )
            })}
        </>
    )
}

export default Study