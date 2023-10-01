import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import ShelfCard from '../components/ShelfCard'

const Container = styled.div`
    display:flex; 
    justify-content:center; 
    align-items:center;
    flex-direction:column;
    width:100%;
    // background:gray;
    &>div{
        display:flex;
        flex-wrap:wrap;
        justify-content:center;
    }
`

const Deck = styled.div`

    width:300px;
    height:200px;
    border:1px solid skyblue;
    background:aliceblue;
    border-radius:10px;
    margin:10px;
    padding:5px;
`

function Shelf() {
    return (
        <Container
            as={motion.div}
            initial={{ y: '100vh', scale: 0 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ type: 'sneek' }}
        >
            <div>
                <ShelfCard
                    title="Object Oriented Programming"
                    description="This card has an educational theme with a notebook-style header."
                    additionalText="Yfd7368da02847ladh"
                    stars={4.5}
                    starColor="orange"
                    circleNumber={34}
                    circleColor="orange"
                    numRatings={1.5}
                />
                <ShelfCard
                    title="Operating Systems"
                    description="This card has an educational theme with a notebook-style header."
                    additionalText="Yfd7368da02847ladh"
                    stars={4.8}
                    starColor="orange"
                    circleNumber={4}
                    numRatings={1}
                    circleColor="orange"

                />

                <ShelfCard
                    title="Javascript"
                    description="This card has an educational theme with a notebook-style header."
                    additionalText="Yfd7368da02847ladh"
                    stars={4}
                    starColor="orange"
                    circleNumber={4}
                    numRatings={1}
                    circleColor="orange"

                />

            </div>
        </Container>
    )
}

export default Shelf