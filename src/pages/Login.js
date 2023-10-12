import React from 'react'
import Login  from '../components/Login'
import useTitle from '../Hooks/useTitle'

function LoginPage() {
  useTitle('Login/Register')
  return (
    <div>
        <Login/>
    </div>
  )
}

export default LoginPage