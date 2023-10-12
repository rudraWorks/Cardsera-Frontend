import React, { useState } from 'react'
import { Button } from '../pages/Practice'
import { Input } from '../pages/AddCard'
import useModal from '../Hooks/useModal'

function RenameDeck({ oldName, token, setDeckName }) {
  const [newName, setNewName] = useState('')
  const { dispatchModal } = useModal()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')


  const rename = async () => {
    setSubmitting(true)

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/renameDeck`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        },
        body: JSON.stringify({ newName, oldName })
      })
      const json = await response.json()
      if (!response.ok)
        setError(json.message)
      else {
        dispatchModal({ type: 'CLOSE' })
        setDeckName(newName)
      }
    }
    catch (e) {
      setError(e.message)
    }
    setSubmitting(false)

  }

  return (
    <div>
      <h2>Rename deck</h2>
      <h3 style={{ color: 'blue' }}>{oldName}</h3>
      <br />
      <Input value={newName} onChange={(e) => { setNewName(e.target.value); setError('') }} style={{ padding: '5px', width: '100%' }} />
      <br /> 
      {error!=='' && <span style={{color:'red'}}><br/>{error}<br/></span>} 
      <br /> 
      <Button disabled={submitting} onClick={rename} style={{ marginLeft: 'auto', width: '100%' }}>{submitting ? 'Submitting...' : 'Submit'}</Button>
    </div>
  )
}

export default RenameDeck