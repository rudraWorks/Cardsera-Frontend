import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'
import { ToastContainer } from 'react-toastify'

const Container = styled.div`
    background-color: white   ;
    height:100vh; 
    width:100vw;
    border-radius: 0px;
    display:flex;
    flex-direction:column;
    background: #C9D6FF;  /* fallback for old browsers */
background: -webkit-linear-gradient(to top, #E2E2E2, #C9D6FF);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to top, #E2E2E2, #C9D6FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

`
const Bottom = styled.div`
    display:none;
    margin-top:auto;
    text-align:center;
    padding:5px;
    background:#e0e8ef;
    border-top:1px solid skyblue;
`
const OutletContainer = styled.div`
    padding:20px;
    overflow-x:hidden;
    height:100%;
    padding-bottom:0;
    padding-top:20px;
`

function Root() {
    return (
        <Container as={motion.div}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: .5, type: 'sneek' }}
        >
            <Navbar />
            <OutletContainer>
                <Outlet />
            </OutletContainer>
            <Bottom>
                   a rudra pratap singh production
            </Bottom>
            <ToastContainer />
        </Container>
    )
}

export default Root