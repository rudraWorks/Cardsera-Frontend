import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Select from 'react-select/creatable'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUser from '../Hooks/useUser';


const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-top:30px;
    padding:10px;
`
export const Box = styled.div`
    width:320px;
    max-width:100%;
    padding:15px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    border-radius:10px;

    padding:10px;
    border-radius:10px;
    background:aliceblue;
    border:1px solid skyblue;

`
const Input = styled.input`
    padding:5px;
    font-size:20px;
    width:90%;
    margin:5px;
    border-radius:5px;
    border:none;
    border:1px solid skyblue;
    &:focus{
        outline:1px solid blue;
    }

`
const Button = styled.button`
    width:90%;
    height:40px;
    margin-bottom:10px;
    border-radius:5px;
    font-weight:bolder;
    border:1px solid #5b9d5b;
    font-size:15px;
    background:lightgreen;
    cursor:pointer;
    &:hover{
        background:#7fcf7f;
    }
    font-weight: bold;
    display: inline-block;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    padding: 0.3em 0.7em;
    -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.2),0 2px 0 rgba(255,255,255,0.15) inset;
    -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.2), 0 2px 0 rgba(255,255,255,0.15) inset;
    box-shadow: 0 1px 2px rgba(0,0,0,0.2), 0 2px 0 rgba(255,255,255,0.15) inset;
    color: #fff !important;
    border: 1px solid #c47b07;
    background: -webkit-gradient(linear, left top, left bottom, from(#fba00c), to(#f67c16));
    background: -moz-linear-gradient(top, #fba00c, #f67c16);
    background: -o-linear-gradient(top, #fba00c, #f67c16);
    background: linear-gradient(to bottom, #fba00c, #f67c16);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fba00c', endColorstr='#f67c16');
    font-size: 1em;
    line-height: 1.5;
    border-radius: 6px;
    text-shadow: 0 0 2px rgba(0,0,0,0.5);
    
    &:hover{
        background:#e77313;
    }
`
const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white', width: '100%' })
}
function AddCard() {

    const [options, setOptions] = useState([])
    const { user } = useUser()
    const [loading,setLoading] = useState(true)
    const [front,setFront] = useState('')
    const [back,setBack] = useState('')
    const [deck,setDeck] = useState('')

    const [added,setAdded] = useState(0)
    

    useEffect(() => {

        const loadDecks = async () => {
            if(!user)
                return 
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/decks`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'authorization':user.token 
                    }
                })
                const json = await response.json()
                console.log(json);
                if(!response.ok){
                    return toast.error(json.message)
                }
                setOptions(json.decks)
                setLoading(false)
            }
            catch (e) {
                return toast.error(e.message)
            }
        }
        loadDecks()
    }, [user,added])


    const handleSelectChange = (val) => {
       setDeck(val.value)
    }

    const addCard = async () => {
        if(!front || !back || !deck)
            return toast.error('Invalid input')
        try{
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/card`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':user.token
                },
                body:JSON.stringify({front,back,deck})
            })
            const json = await response.json() 
            if(!response.ok){
                return toast.error(json.message)
            }
            setAdded((p)=>p+1)
            setFront('')
            setBack('')
            return toast.success(json.message) 
        }
        catch(e){
            return toast.error(e.message)
        }
    }


    if (!user)
        return <h3>User auth failed</h3>
    if(loading)
        return <h3>Loading...</h3>
    return (
        <Container>
            <Box as={motion.div}
                initial={{ y: '100vh', scale: 0 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ type: 'sneek' }}
            >
                <h3>Word</h3>
                <Input value={front} onChange={(e)=>setFront(e.target.value)} />
                <h3>Meaning</h3>
                <Input value={back} onChange={(e)=>setBack(e.target.value)} />
                <h3>Deck</h3>
                <div
                    style={{ zIndex: '1000', width: '90%', margin: '5px' }}
                >
                    <Select styles={colourStyles} options={options} onChange={handleSelectChange} />
                </div>
                <br />
                <Button onClick={addCard}>
                    Add
                </Button>
            </Box>
        </Container>
    )
}

export default AddCard