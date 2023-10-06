import React, { useState } from 'react'
import { Input, Button, Textarea } from '../pages/AddCard'
import styled from 'styled-components'
import useUser from '../Hooks/useUser';
import useModal from '../Hooks/useModal';
import RichTextEditor from '../components/Editor';

const Container = styled.div`
    width:1000px;
    height:400px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    overflow:hidden;
    padding:5px;
`

function EditCard({ word, meaning, id, setWord, updateEditedWord, updateCardsArray }) {
    const [submitting, setSubmitting] = useState(false)
    const [wordState, setWordState] = useState(word)
    const [meaningState, setMeaningState] = useState(meaning)
    const { user } = useUser()
    const [message, setMessage] = useState('')
    const { dispatchModal } = useModal()

    const handleSubmit = async () => {
        setSubmitting(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/editCard`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': user.token
                },
                body: JSON.stringify({ wordState, meaningState, id })
            })
            const json = await response.json()
            setMessage(json.message)
            if (response.ok) {
                dispatchModal({ type: 'CLOSE' })
                if (updateEditedWord && setWord) {
                    setWord((p) => {
                        return { ...p, front: wordState, back: meaningState }
                    })
                    updateEditedWord(id, wordState, meaningState)
                }
                if(updateCardsArray){
                    updateCardsArray(id,wordState,meaningState)
                }
            }
        }
        catch (e) {
            setMessage(e.message)
        }
        setSubmitting(false)
    }
    return (
        <Container>

            <Input onChange={(e) => setWordState(e.target.value)} value={wordState} style={{ width: '99%' }} />
            <br />
            {/* <Textarea onChange={(e) => setMeaningState(e.target.value)} value={meaningState} style={{ resize: 'none', height: '400px', width: '99%' }} /> */}
            <RichTextEditor isModal={true} back={meaningState} setBack={setMeaningState} />
            <br />
            <i>{message}</i>
            <br />
            <Button disabled={submitting} onClick={handleSubmit} style={{ width: '99%' }}>
                {submitting ? 'Submitting...' : 'Submit'}
            </Button>
        </Container>
    )
}

export default EditCard 