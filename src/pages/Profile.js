import React from 'react'
import Logout from '../components/Logout'
import useTitle from '../Hooks/useTitle'

function Profile() {
  useTitle('Profile')
  return (
    <Logout/>
  )
}

export default Profile 