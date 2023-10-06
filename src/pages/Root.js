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
    padding-top:30px;
    display:flex;
    flex-direction:column;
`
const Button = styled.span`
    border:none;
    display:absolute;
    position:fixed;
    z-index:100000;
    justify-content:center;
    align-items:center;
    cursor:pointer;
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


                <div style={showNav ? (size.width <= 600 ? { width: '0%', display: 'none' } : { width: '100%' }) : { width: '100%' }}>
                    {!showNav &&
                        <Button style={{margin:'5px',cursor:'pointer'}} onClick={() => setShowNav(true)}>
                            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAqElEQVRYR+2W3Q2DMAyEP3agha2qskN3gm5RsVR/lqiMiJRETd+c8HB+TCTf+Wyf3NE4usb4iIAUiBW4AjNwdh7MD3ADHoYTE3hVAA+1vYEhJ/AMj84KWHordswJXPYWbB+OYeDWgjUn4IhZTq01PJQC8gEzh1OlVSj6wL2CG8oHki4fag0rzV8KEyswAQvQOzMp3gP24Q3+9x6QDzi3/nd6raEUaK7AF4DTHiGLgCMZAAAAAElFTkSuQmCC'></img>
                        </Button>
                    }
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