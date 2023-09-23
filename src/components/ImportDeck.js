import React from 'react'
import { Input,Box } from '../pages/AddCard'

function ImportDeck({setDeckId,deckId}) {
    return (
        <Box style={{border:'none',padding:'0'}}>
            <h3 style={{fontWeight:'300'}}>Deck ID</h3>
            <Input value={deckId} onInput={(e)=>setDeckId(e.target.value)} />
        </Box>
    )
} 

export default ImportDeck