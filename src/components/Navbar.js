import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import useUser from '../Hooks/useUser'
import { useWindowSize } from "@uidotdev/usehooks";


const Container = styled.div` 
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:35px;
    padding-top:50px;
    color:white;
    &>a{
        text-decoration:none;
        color:white;
        margin-bottom:15px;
        font-size:22px;
        width:130px;
        padding-left:10px;
        padding-right:10px;
        text-align:center;
    }

    @media only screen and (max-width: 600px) {
       width:100%;
    }
    z-index:1000;
    background:  #ff6f61;
    min-width:200px;

`

const NORMAL = {
    fontWeight: 'bolder'
}
const HOVER = {
    fontWeight: 'bolder',
    borderRadius:'10px',
    color:'#333333'
}
export const Close = styled.button`
    position:absolute;
    right:0;
    top:0;
    border:none;
    background:transparent;
    cursor:pointer;
    color:white;
    padding:10px;
    font-weight:bolder;
    width:30px;
    height:30px;
    display:flex;
    justify-content:center;
    align-items:center;
    margin:5px;
    border-radius:50%;
    &:hover{
        background:#dc143c; 
    }
`

function Navbar({ showNav, setShowNav }) {
    const { user } = useUser()
    const size = useWindowSize();


    const handleClick = () => {
        if (size.width > 600)
            return
        setShowNav(false)
    }

    return (
        <>

            {
                showNav &&
                <Container as={motion.div}
                    initial={{ x: '-50%' }}
                    animate={{ x: '0' }}
                    transition={{ type: 'sneek' }}
                >
                    <img style={{ width: '80px', marginBottom: '30px' }} src='logo101.png' />
                    <NavLink onClick={handleClick} to={'/'} style={({ isActive }) => (isActive ? HOVER : NORMAL)}>
                        Home
                    </NavLink>
                    {/* <NavLink  onClick={handleClick} to={'/shelf'} style={({ isActive }) => (isActive ? HOVER : NORMAL)}>
                        Shelf
                    </NavLink> */}

                    <Close onClick={() => setShowNav(false)}>X</Close>
                    {user === 'LOADING' && <i>Loading...</i>}
                    {user && user !== 'LOADING' &&

                        <>
                            <NavLink onClick={handleClick} to={'/addcard'} style={({ isActive }) => (isActive ? HOVER : NORMAL)}>
                                Add
                            </NavLink>
                            <NavLink onClick={handleClick} to={'/practice'} style={({ isActive }) => (isActive ? HOVER : NORMAL)}>
                                Practice
                            </NavLink>

                            <NavLink onClick={handleClick} to={'/study'} style={({ isActive }) => (isActive ? HOVER : NORMAL)}>
                                Study   
                            </NavLink>



                            <NavLink onClick={handleClick} to={'/progress'} style={({ isActive }) => (isActive ? HOVER : NORMAL)}>
                                Progress
                            </NavLink>


                            <NavLink onClick={handleClick} to={'/profile'} style={({ isActive }) => (isActive ? HOVER : NORMAL)}>
                                Profile
                            </NavLink>
                        </>
                    }
                    {
                        !user && (
                            <NavLink onClick={handleClick} to={'/login'} style={({ isActive }) => (isActive ? HOVER : NORMAL)}>
                                Login
                            </NavLink>
                        )
                    }



                </Container>

            }
        </>
    )
}

export default Navbar