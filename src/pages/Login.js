import React from 'react'
import Login  from '../components/Login'

function LoginPage() {
  return (
    <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',width:'100%',background:'grjay'}}>
      <img style={{width:'40%',minWidth:'250px',margin:'30px'}} src='/images/login.jpg' />
      <div>
        <Login/>
      </div> 
    </div>
  )
}

export default LoginPage