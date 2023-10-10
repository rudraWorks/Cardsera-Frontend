import React from 'react'
import { Input,Box } from '../pages/AddCard'
import Info from '../components/DeckidInfo';


function ImportDeck({setDeckId,deckId}) {
    return (
        <Box style={{border:'none',padding:'0',width:'100%'}}>
            <h3 style={{display:'flex',alignItems:'center',marginBottom:'5px'}}>Deck ID  &nbsp;<Info/></h3>
            <Input placeholder='9998cc3ce4dc4251b49a8def' value={deckId} onInput={(e)=>setDeckId(e.target.value)} />
        </Box> 
    ) 
} 

export default ImportDeck