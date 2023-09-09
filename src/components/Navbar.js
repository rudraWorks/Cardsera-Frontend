import React, { useState } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from '../layouts/Modal'
import useUser from '../Hooks/useUser'
import Login from '../modalViews/Login'
import Logout from '../modalViews/Logout'
import useModal from '../Hooks/useModal'

const Container = styled.div` 
    display:flex;
    align-items:center;
    justify-content:center;
    padding:10px;
    height:40px;
    // background:aliceblue;
    padding-top:50px;
    // border-bottom:1px solid #d5dee5;
    &>a{
        text-decoration:none;
        color:white;
        margin-right:45px;
        font-size:20px;
    }
    @media only screen and (max-width: 600px) {
        &>a{
            font-size:18px;
            margin-right:15px;
        }
    }
`
const LogoutDiv = styled.div`
    font-size:20px;
    margin-right:25px;
    @media only screen and (max-width: 600px) {
            font-size:18px;
            margin-right:15px;
    }
`
const hoverVariants = {
    scale: 1.5
}
const transitionVariants = {
    type: 'spring',
    stiffness: 200
}

const NORMAL = {
    color: 'black',
}
const HOVER = {
    color: 'black',
    fontWeight: 'bolder'
}
function Navbar() {
    const { user } = useUser()
    const { modal, dispatchModal } = useModal()

    return (
        <Container as={motion.div}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
        >
            {modal && <Modal />}
            <NavLink to={'/'} style={({ isActive }) => (isActive ? HOVER : NORMAL)}>
                <motion.div transition={transitionVariants} whileHover={hoverVariants}>
                    Home
                </motion.div>
            </NavLink>

            {1 &&

                <>
                    <NavLink to={'/practice'} style={({ isActive }) => (isActive ? HOVER : NORMAL)}>
                        <motion.div transition={transitionVariants} whileHover={hoverVariants}>
                            Practice
                        </motion.div>
                    </NavLink>

                    <NavLink to={'/addcard'} style={({ isActive }) => (isActive ? HOVER : NORMAL)}>
                        <motion.div transition={transitionVariants} whileHover={hoverVariants}>
                            Add
                        </motion.div>
                    </NavLink>

                    <NavLink to={'/stats'} style={({ isActive }) => (isActive ? HOVER : NORMAL)}>
                        <motion.div transition={transitionVariants} whileHover={hoverVariants}>
                            Stats
                        </motion.div>
                    </NavLink>
                </>
            }


            <LogoutDiv onClick={
                () => {
                    if (!user)
                        dispatchModal({ type: 'SET_CONTENT', content: <Login /> })
                    else
                        dispatchModal({ type: 'SET_CONTENT', content: <Logout /> })
                }
            }
                style={{ ...NORMAL, cursor: 'pointer' }}
            >
                <motion.div transition={transitionVariants} whileHover={hoverVariants}>
                    {!user && <span>Login</span>}
                    {user && <span>Profile</span>}
                </motion.div>

            </LogoutDiv>

        </Container>
    )
}

export default Navbar