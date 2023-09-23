import React from 'react'
import useModal from '../Hooks/useModal'
import useUser from '../Hooks/useUser'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`
const Button = styled.button`
  width:100px;
  height:30px;
  background:coral;
  border:1px solid red;
  border-radius:5px;
  cursor:pointer;
  font-weight:bolder;
  &:hover{
    background:tomato;
  }
  color:white;
`
function Logout() {
  const { user, dispatch } = useUser()
  const { dispatchModal } = useModal()
  const navigate = useNavigate()


  const logoutHandler = () => {
    dispatchModal({ type: 'CLOSE' })
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }
  return (
    <Container>
      <h2>{user.name}</h2>
      <h3>{user.email}</h3>
      <br />
      <img src={user.picture} referrerPolicy='no-referrer' />
      <br />
      <Button onClick={logoutHandler}>Logout</Button>
    </Container>
  )
}

export default Logout 