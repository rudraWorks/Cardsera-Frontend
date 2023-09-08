import React,{useEffect} from 'react'
import styled from 'styled-components'
import jwt_decode from 'jwt-decode'
import useUser from '../Hooks/useUser'
import useModal from '../Hooks/useModal'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`

function Login() {

    const {dispatch} = useUser() 
    const navigate = useNavigate()
    const {dispatchModal} = useModal()

    async function handleCallbackResponse(response) {
        const userObject = jwt_decode(response.credential)
        const { name, picture, email } = userObject
        dispatch({type:'LOGIN',user:{name,picture,email}})
        dispatchModal({type:'CLOSE'})
        navigate('/')
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
            <h2>Login to Vocucards</h2>
            <br/>
            <br/>
            <br/>
            <div id='signinDiv'></div> 
        </Container>
    )
}

export default Login