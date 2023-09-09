import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import {motion} from 'framer-motion'
import { ToastContainer } from 'react-toastify'

const Container = styled.div`
    background-color: white   ;
    height:100vh; 
    width:100vw;
    border-radius: 0px;
`
const OutletContainer = styled.div`
    padding-top:30px;
    padding-right:20%;
    padding-left:20%;
    @media only screen and (max-width: 600px) {
        padding-right:10%;
        padding-left:10%;
    }
`
   
function Root() {
    return (
        <Container as={motion.div}
            initial={{scale:0}}
            animate={{scale:1}} 
            transition={{delay:.5,type:'sneek'}}
        >
            <Navbar />
            <OutletContainer>
                <Outlet/>
            </OutletContainer>
            <ToastContainer/> 

        </Container>
    )
}

export default Root