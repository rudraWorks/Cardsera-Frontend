import React,{useState} from 'react'
import {toast} from 'react-toastify'
import styled from 'styled-components'

const Container = styled.div`
    background:white;
    margin:10px;
    padding:10px;
    border-radius:10px;
    user-select:text;
    border:1px solid lightgray;
    
`

function DeckCard({name,totalCards,createdOn,id,share,userToken}) {
    const [checked,setChecked] = useState(share==1?true:false)
    const [disabled,setDisabled] = useState(false)

    const handleShare = async () => { 
        setDisabled(true)
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/toggleShare`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "authorization":userToken
            },
            body:JSON.stringify({id})
        })

        const json = await response.json()

        setDisabled(false)

        if(!response.ok){
            toast.error(json.message)
        }
        else{
            toast.success(json.message) 
            setChecked((p)=>!p)
        }
    }

  return ( 
    <Container> 
        <h2 style={{color:'gray'}}>{name}</h2> 
        {totalCards} {totalCards===1?"Card":"Cards"}
        <br/>
       <small>{new Date(createdOn).toLocaleDateString()}</small>
       <br/>
       <small> {id} </small>
       <br/> 
       <span style={{display:'flex',alignItems:'center'}}>
       Share? &nbsp;&nbsp; <input disabled={disabled}  onChange={handleShare} checked={checked} type='checkbox'/>
       </span>
    </Container>
  )
}

export default DeckCard