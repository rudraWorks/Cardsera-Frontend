import React from 'react'
import { Grid } from 'react-loader-spinner'
import styled from 'styled-components'

const Container = styled.div`
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
`

function Loader() {
    return (
        <Container>
            <Grid />
        </Container>
    )
}

export default Loader