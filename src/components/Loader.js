import React from 'react'
import { Grid } from 'react-loader-spinner'
import styled from 'styled-components'

import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

const Container = styled.div`
    position:relative;
    top:10%;
    left:50%;
    transform:translateX(-50%);
    width:80%;
`

function Loader() {
    return (
        <Container>
            {/* <Grid /> */} 
            <Skeleton height={80} />
            <br/>
            <Skeleton height={80} />
            <br/>
            <Skeleton height={80} />
        </Container>
    )
} 

export default Loader