import React from 'react'
import styled from 'styled-components'
import { Button } from '../pages/Practice'
import useModal from '../Hooks/useModal'

const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
`
function Confirm({deleteCard}) {
    const {dispatchModal} = useModal()
    const handleDelete = () => {
        deleteCard()
        dispatchModal({type:'CLOSE'})
    }
    return (
        <Container>
            <h3>Are you sure?</h3>
            <br/>
            <div>
                <Button onClick={handleDelete}>Yes</Button>
                <Button onClick={()=>dispatchModal({type:'CLOSE'})}>No</Button>
            </div>

        </Container>
    )
}

export default Confirm