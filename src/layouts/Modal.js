import React from 'react'
import ReactDom from 'react-dom'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import useModal from '../Hooks/useModal'

const MODAL_STYLES = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: '400px',
    minHeight: '200px',
    maxWidth: '90%',
    maxHeight: '90%',
    zIndex: '3000',
    background: 'white',
    borderRadius: '10px',
    padding: '30px',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
}
const BACKGROUND_STYLES = {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'rgba(0,0,0,0.5)',
    zIndex: '1000'
}

const Button = styled.button`
    position:absolute;
    top:0%;
    right:0%;
    width:25px;
    height:25px;
    border-radius:50%;
    border:none;
    font-weight:bolder;
    background:transparent;
    font-size:20px;
    &:hover{
        color:red;
    }
`
function Modal() {

    const {modal,dispatchModal } = useModal()

    return ReactDom.createPortal(
        <motion.div style={{ width: '100%', height: '100%' }}>
            <motion.div style={BACKGROUND_STYLES}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                exit={{opacity:0}} 
            ></motion.div> 
                <motion.div style={MODAL_STYLES}
                    initial={{ y: '-100vh', x: '-50%' }}
                    animate={{  y: '-60%', x: '-50%' }}
                    transition={{ type: 'sneek'}}
                >
                    {modal}
                    <Button onClick={() => dispatchModal({ type: 'CLOSE' })}>x</Button>

                </motion.div>
        </motion.div>,
        document.getElementById('modal')
    )
}

export default Modal 