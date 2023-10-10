import React from 'react'
import styled from 'styled-components'
import SelectDeckInfo from '../modalViews/SelectDeckInfo';
import useModal from '../Hooks/useModal';


const Div = styled.div`
  height:25px;
  width:25px;
  border-radius:50%;
  background:orange;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor:pointer;
  &:hover{
    background:#e77313;
} 
`

function Info() {
  const { dispatchModal } = useModal()

  return (
    <Div onClick={() => dispatchModal({ type: 'SET_CONTENT', content: <SelectDeckInfo  /> })}>
      ?
    </Div>
  )
}

export default Info