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
`
const Bottom = styled.div`
    margin-top:auto;
    text-align:center;
    padding:5px;
    background:#e0e8ef;
    border-top:1px solid skyblue;
`
const OutletContainer = styled.div`
    padding:40px;
    overflow-y:scroll;
    height:100%;
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