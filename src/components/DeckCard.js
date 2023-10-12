import React, { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import Confirm from '../modalViews/Confirm'
import useModal from '../Hooks/useModal'
import { removeLast } from './Heatmap'
import RenameDeck from '../modalViews/RenameDeck'

const Container = styled.div`
    background:white;
    color:black;
    margin:10px;
    padding:10px;
    border-radius:10px;
    user-select:text;
    border:1px solid rgba(0,0,255,.2);
    color:gray;
`
const Button = styled.button`
    height:20px;
    display:flex;
    align-items:center;
    cursor:pointer;
    background:tomato;
    color:white;
    border:none;
    &:hover{
        background:red;
    }
    border-radius:5px;
`

function DeckCard({ name, totalCards, createdOn, id, share, userToken,updateDeck,imports}) {
    const [checked, setChecked] = useState(share === 1 ? true : false)
    const [disabled, setDisabled] = useState(false)
    const [deckName,setDeckName] = useState(name)
    const { dispatchModal } = useModal() 
    
    const handleShare = async () => {
        setDisabled(true)
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/toggleShare`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": userToken
            },
            body: JSON.stringify({ id })
        })

        const json = await response.json()

        setDisabled(false)

        if (!response.ok) {
            toast.error(json.message)
        }
        else {
            toast.success(json.message)
            setChecked((p) => !p)
        }
    }

    const handleDelete = async () => {
        try{
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/deck`,{
                method:'DELETE',
                headers:{
                    "Content-Type":"application/json",
                    "authorization":userToken
                },
                body:JSON.stringify({deckId:id,deckName:name})
            })
            const json = await response.json()
            if(!response.ok){
                toast.error(json.message)
            }
            else{
                toast.success(json.message)  
                updateDeck(id)
            }
        }
        catch(e){
            toast.error(e.message)
        }
    }
    return (
        <Container>
            <h2 style={{ color: 'purple'}}>{deckName}</h2>
            {totalCards} {totalCards === 1 ? "Card" : "Cards"} 
            <br />
            {removeLast((new Date(createdOn).toUTCString()).toString())}
            <br />
           {id} 
            <br />
            Imports: {imports} 
            <br/>
            <span style={{ display: 'flex', alignItems: 'center' ,width:'100%'}}>
                Public &nbsp; <input disabled={disabled} onChange={handleShare} checked={checked} type='checkbox' />
                <Button onClick={()=>dispatchModal({type:'SET_CONTENT',content:<RenameDeck oldName={deckName} token={userToken} setDeckName={setDeckName} />})} style={{background:'orange',marginLeft:'auto',marginRight:'5px'}}>rename</Button>
                <Button onClick={() => dispatchModal({ type: 'SET_CONTENT', content: <Confirm message={"Are you sure you want to delete this deck?"} deleteItem={handleDelete} /> })}>delete</Button>
            </span>
        </Container>
    )
}
 
export default DeckCard 