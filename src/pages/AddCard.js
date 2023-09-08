import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Select from 'react-select/creatable'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-top:30px;
    padding:10px;
`
const Box = styled.div`
    width:320px;
    max-width:85%;
    padding:15px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    border-radius:10px;
    background: #5f2c82;  /* fallback for old browsers */
background: -webkit-linear-gradient(to top, #49a09d, #5f2c82);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to top, #49a09d, #5f2c82); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    &>h3{
        color:white;
    }

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
`
const options = [
    { value: 'rudra', label: 'rudra' },
    { value: 'pratap', label: 'pratap' },
    { value: 'singh', label: 'singh' },
    { value: 'prasad', label: 'prasad' },
]
const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white', width: '100%'})
}
function AddCard() { 

    const handleSelectChange = (val) => { 
        console.log(val)
        const { label, value } = val
        if (val.__isNew__) {
            options.push({ label, value })
        }
    }
    return (
        <Container>
            <Box as={motion.div}
      initial={{y:'100vh'}}
      animate={{y:0}}
      transition={{type:'spring',stiffness:120}}
            >
                <h3>Word</h3>
                <Input as={motion.input}
                    initial={{ y: '-100vh', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: .9}}
                />
                <h3>Meaning</h3>
                <Input as={motion.input}
                    initial={{ y: '-100vh', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: .9 }}
                />
                <h3>Deck</h3>
                <motion.div
                    style={{ zIndex: '1000', width: '90%', margin: '5px' }}
                    initial={{ y: '-100vh', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: .9 }}
                >
                    <Select styles={colourStyles} options={options} onChange={handleSelectChange} />

                </motion.div>
                <br />
                <Button as={motion.button}
                    initial={{ y: '-100vh', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: .9 }}
                    onClick={()=>toast.info('Message!', {position: "top-right"})}
                >
                    Add
                </Button>
            </Box>
        </Container>
    )
}

export default AddCard