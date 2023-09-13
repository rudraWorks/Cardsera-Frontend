import React from 'react'
import useUser from '../Hooks/useUser'

function Stats() {
  const { user } = useUser()

  if (!user)
    return <h3>User auth failed</h3>
  return (
    <div>Stats</div>
  )
}

export default Stats