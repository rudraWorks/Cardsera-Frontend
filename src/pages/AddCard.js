import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Select from 'react-select/creatable'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUser from '../Hooks/useUser';
import Loader from '../components/Loader';
import ImportDeck from '../components/ImportDeck';
import RichTextEditor from '../components/Editor';  
import Info from '../components/Info';

export const Container = styled.div` 
    display:flex; 
    justify-content:center; 
    align-items:center;
    flex-direction:column;
`
export const Box = styled.div`
    width:100%;
    // max-width:600px;
    margin-top:15px;
    padding:15px;
    display:flex;
    flex-direction:column;
    align-items:center;
    border-radius:10px;
    padding:10px;
    border-radius:10px; 
    background:aliceblue;
    border:1px solid skyblue; 
`
export const Input = styled.input`
    padding:5px;
    font-size:20px;
    width:90%;
    border-radius:5px;
    border:none;
    border:1px solid skyblue;
    &:focus{
        outline:1px solid blue;
    }
    font-family:serif;


`
export const Button = styled.button`
    width:90%;
    height:40px;
    margin-bottom:10px;
    border-radius:5px;
    border:1px solid #5b9d5b;
    font-size:15px;
    background:lightgreen;
    cursor:pointer;

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

export const Textarea = styled.textarea`
    width:90%;
    min-height:150px;
    resize:vertical;
    font-size:20px;
    padding:10px;
    border:1px solid skyblue;
    border-radius:5px;
    &:focus{
        outline:1px solid blue;
    }
    font-family:serif;

`
const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white', width: '100%' })
}
function AddCard() {

    const [options, setOptions] = useState([])
    const { user } = useUser()
    const [loading, setLoading] = useState(true)
    const [front, setFront] = useState('')
    const [back, setBack] = useState('<br/><br/><br/><br/>')
    const [deck, setDeck] = useState('')
    const [adding, setAdding] = useState(false)
    const [added, setAdded] = useState(0)
    const [importFlag, setImportFlag] = useState(false)
    const [deckId, setDeckId] = useState('')


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
                setOptions(json.decks)
                setLoading(false)
            }
            catch (e) {
                return toast.error(e.message)
            }
        }
        if (user && user !== 'LOADING')
            loadDecks()
    }, [user, added])


    const handleSelectChange = (val) => {
        setDeck(val.value)
    }

    const addCard = async () => {
        if (!front || !back || !deck)
            return toast.error('Invalid input')
        setAdding(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/card`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': user.token
                },
                body: JSON.stringify({ front, back, deck })
            })
            const json = await response.json()
            setAdding(false)
            if (!response.ok) {
                toast.error(json.message)
            }
            else {
                setAdded((p) => p + 1)
                setFront('')
                setBack('')
                toast.success(json.message)
            }
        }
        catch (e) {
             toast.error(e.message)
        }
        setAdding(false)

    }

    const importDeck = async () => {
        if (!deckId || !deck)
            return toast.error('Invalid input')
        setAdding(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/importDeck`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': user.token
                },
                body: JSON.stringify({ deckId, deckName: deck })
            })

            const json = await response.json()
            setAdding(false)
            if (!response.ok)
                toast.error(json.message)
            else {
                toast.success(json.message)
                setAdded((p) => p + 1)
                setDeckId('')
            }
        }
        catch (e) {
            toast.error(e.message)
        }
        setAdding(false)

    }
    if (!user)
        return <h3>User auth failed</h3>
    if (loading)
        return <Loader />
    return (
        <Container>

            <Box as={motion.div}
                initial={{ y: '100vh', scale: 0 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ type: 'sneek' }}
            >
                <p style={{ color: 'black', width: '100%' }}>
                    <span onClick={() => setImportFlag((p) => !p)} style={{ cursor: 'pointer', fontSize: '15px', padding: '3px', borderRadius: '5px' }}>
                        <u>{importFlag ? 'Add card' : 'Import deck'}</u>
                    </span>
                </p>
                {
                    importFlag ?
                        <ImportDeck setDeckId={setDeckId} deckId={deckId} /> :
                        <>
                            <h3>Card front</h3>
                            <Input placeholder='Any problem/question/vocabulary...' value={front} onChange={(e) => setFront(e.target.value)} />
                            <br />
                            <h3>Card back</h3>
                            {/* <Textarea placeholder='Solution/answer/meaning...' value={back} onChange={(e) => setBack(e.target.value)} /> */}
                            <RichTextEditor back={back} setBack={setBack} />
                        </> 
                }  
                <br /> 
                <h3 style={{display:'flex',alignItems:'center'}}>Create/select a deck  &nbsp; <Info  /> </h3>
                <div
                    style={{ zIndex: '1000', width: '90%', margin: '5px' }} 
                >
                    <Select styles={colourStyles} options={options} onChange={handleSelectChange} />
                </div>
                <br />
                {
                    importFlag ?
                        <Button onClick={importDeck} disabled={adding}> {adding ? 'Importing...' : 'Import deck'} </Button>
                        :
                        <Button onClick={addCard} disabled={adding}> {adding ? 'Adding...' : 'Add card'} </Button>
                }
            </Box>
        </Container>
    )
}

export default AddCard

