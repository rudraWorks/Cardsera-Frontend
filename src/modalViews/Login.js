import React,{useEffect} from 'react'
import styled from 'styled-components'
import jwt_decode from 'jwt-decode'
import useUser from '../Hooks/useUser'
import useModal from '../Hooks/useModal'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify';


const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`

function Login() {

    const {dispatch} = useUser() 
    const navigate = useNavigate()
    const {dispatchModal} = useModal()

    async function handleCallbackResponse(userData) {
        const userObject = jwt_decode(userData.credential)
        const { name, picture, email } = userObject

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name,picture,email})
        })

        const json = await response.json() 

        if(response.ok){
            dispatch({type:'LOGIN',name,picture,email,token:json.token})
            dispatchModal({type:'CLOSE'})
            navigate('/') 
        }
        else{
            toast.error(json.message)
        }
    }
    useEffect(() => {
        setTimeout(() => {
            window.google.accounts.id.initialize({
                client_id:'488871700296-s99bcv7h5vgda1irc0pthfr43l5q9ano.apps.googleusercontent.com',
                callback: handleCallbackResponse
            })

            window.google.accounts.id.renderButton(
                document.getElementById('signinDiv'),
                {
                    theme: "dark",
                    size: "large",
                }
            )
        }, 1000)
    }, [])

    return (
        <Container>
            <h2>Login/Register</h2>
            <br/>
            <br/>
            <div id='signinDiv'></div> 
        </Container>
    )
}

export default Login