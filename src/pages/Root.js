import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'
import { ToastContainer } from 'react-toastify'
import Modal from '../layouts/Modal'
import useModal from '../Hooks/useModal'
import { useWindowSize } from "@uidotdev/usehooks";


const Container = styled.div`
    background-color: white   ;
    height:100vh; 
    width:100vw;
    border-radius: 0px; 
    display:flex;
`
const Bottom = styled.div`
    display:none;
    margin-top:auto;
    text-align:center;
    padding:5px;
    // background:gray;/
    // border-top:1px solid skyblue;
`
const OutletContainer = styled.div`
    overflow-x:hidden;
    height:100%;
    padding:30px;
    padding-top:40px;
    display:flex;
    flex-direction:column;
`

const Button = styled.button`
    border:none;
    display:absolute;
    position:fixed;
    z-index:100000;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    padding:10px;
    background:#469aa7;
    color:white;
    &:hover{
        background:#3a7e89; 
    }
`


function Root() {
    const { modal } = useModal()
    const [showNav, setShowNav] = useState(false)
    const size = useWindowSize();

    return (
        <>
            <Container as={motion.div}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: .5, type: 'sneek' }}
            >

                <Navbar showNav={showNav} setShowNav={setShowNav} />

 
                <div style={showNav?(size.width<=600 ?{width:'0%',display:'none'}:{width:'100%'}):{ width: '100%' }}>
                    {!showNav && <Button onClick={() => setShowNav(true)}>Nav</Button>}
                    <OutletContainer>
                        <Outlet />
                    </OutletContainer>
                    <Bottom>
                        a rudra pratap singh production
                    </Bottom>
                    <ToastContainer />
                </div>

            </Container>
            {modal && <Modal />}

        </>
    )
}

export default Root