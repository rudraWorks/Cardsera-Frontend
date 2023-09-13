import React from 'react'
import useUser from '../Hooks/useUser'
import { motion } from 'framer-motion'

function Stats() {
  const { user } = useUser()

  if (!user)
    return <h3>User auth failed</h3>
  return (
    <motion.div 
      initial={{ y: '100vh' }}
      animate={{ y: 0 }}
      transition={{ type: 'sneek' }}
    > 
      <h3>feature coming soon...</h3>
      
    </motion.div> 
  ) 
}

export default Stats