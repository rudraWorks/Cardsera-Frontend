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
        width:100%;
        height:30px;
        background:#e5eff7;
        border:1px solid #c2cad1;
        border-radius:5px;
        margin:5px;
        text-align:center;
        cursor:pointer;
        color:black;
        text-decoration:none; 
        &:hover{
            background:#c9d2d9;
        }
        display:flex;
        align-items:center;
        justify-content:center;
        // font-size:25px;
        // font-weight:bolder;
        padding:15px;
    }

    @media only screen and (max-width: 600px) {
       width:100%;
       border:none;
    }
    z-index:1000;
    background:aliceblue;
    min-width:250px;
    border-right:1px solid skyblue;
`

const NORMAL = {
    // fontWeight: 'bolder'
	fontWeight:'bolder'
}
const HOVER = {
    background:'#7a9bb3',
    color:'white',
    border:'1px solid #c2cad1',
fontWeight:'bolder'
}
export const Close = styled.button`
    position:absolute;
    right:0; 
    top:0;
    border:none;
    background:transparent;
    cursor:pointer;
    color:black;
    padding:10px;
    font-weight:bolder;
    width:30px;
    height:30px;
    display:flex;
    justify-content:center;
    align-items:center;
    margin:5px;
    border-radius:50%;
    //  border:1px solid skyblue; 
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

                    <NavLink onClick={handleClick} to={'/app'} style={({ isActive }) => (isActive ? HOVER : NORMAL)}>
                        App 
                    </NavLink>
                    <span style={{ marginTop: 'auto', textAlign: 'center', userSelect: 'text',color:'black' }}>
                        <small>
                            &#169; Cardsera 2023
                            <br />
                            merudra.official@gmail.com
                        </small>
                    </span>

                </Container>

            }
        </>
    )
}

export default Navbar