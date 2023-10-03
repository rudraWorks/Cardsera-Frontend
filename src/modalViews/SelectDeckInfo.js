import React from 'react'
import styled from 'styled-components'
 
const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;  
`
   
function SelectDeckInfo() { 

    return (
        <Container>
            <h3>How to create deck?</h3> 
            <br/>
            <img style={{width:'100%'}} src='videos/gifdeck.gif' />

        </Container>   
    )
}

export default SelectDeckInfo