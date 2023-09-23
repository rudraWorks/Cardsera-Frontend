import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    font-size:15px;
    &>h3>span{
        font-weight:300;
        color:blue;
    }
    &>h3{
        margin-bottom:5px;
    }
`

function CardDetails({ card }) {
    return (
        <Container>
            {/* <h3>Card id: <span>{card.cardId}</span></h3> */}
            <h3>Created on: <span>{new Date(card.dateAdded).toLocaleString('en-GB')}</span></h3>
            <h3>Last reviewed on: <span>{ new Date(card.lastReviewed).toString()===new Date(0).toString()?'Not reviewed yet': new Date(card.lastReviewed).toLocaleString('en-GB')}</span></h3>
            <h3>Deck:<span> {card.deck}</span></h3>
            <h3>Total reviewed: <span>{card.totalReviewed}</span></h3>
            <h3>Correct: <span>{card.correct}</span></h3>
            <h3>Incorrect: <span>{card.incorrect}</span></h3>
            <h3>Accuracy: <span>{((card.correct*100)/(card.correct+card.incorrect)).toFixed(0)}%</span></h3>
        </Container>
    )
}

export default CardDetails