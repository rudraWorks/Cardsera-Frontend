import React from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`
const Img = styled.img`
    border:1px solid lightgray;
    height:fit-content;
    max-width:90%;
    margin:10px;
`


function InstallApp() {
  return ( 
    <Container
    as={motion.div}
    initial={{ y: '100vh' }}
    animate={{ y: 0 }}
    transition={{ type: 'sneek' }} 
  >         
        <h1 style={{padding:'10px',textAlign:'center',width:'90%',borderRadius:'10px',fontWeight:'normal'}}>Install Cardsera</h1>
        <br/>
        <div style={{display:'flex',flexWrap:'wrap'}}>
        <Img src='\images\Screenshots\download\1.png' />
        <Img src='\images\Screenshots\download\2.png' />
        </div>

    </Container>
  )
} 

export default InstallApp 