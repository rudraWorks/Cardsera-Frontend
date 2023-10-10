import React from 'react'
import styled from 'styled-components'
import useModal from '../Hooks/useModal';
import Info from '../modalViews/DeckidInfo';

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

function DeckidInfo() {
  const { dispatchModal } = useModal()

  return (
    <Div onClick={() => dispatchModal({ type: 'SET_CONTENT', content: <Info text={"6516e4bacc99a3c2ba76a00d"} /> })}>
      ?
    </Div>
  )
}

export default DeckidInfo