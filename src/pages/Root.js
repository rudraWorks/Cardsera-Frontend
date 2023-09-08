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
    background: #B3FFAB;  /* fallback for old browsers */
background: -webkit-linear-gradient(to bottom, #12FFF7, #B3FFAB);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to bottom, #12FFF7, #B3FFAB); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


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
            transition={{delay:.5,type:'spring',stiffness:120}}
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