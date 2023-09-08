import ModalContext from "./ModalContext";
import React, { useReducer } from 'react'

const reducer = (state,action) => {
    switch(action.type){
        case 'CLOSE': return null 
        case 'SET_CONTENT': return action.content 
    }
}

function ModalState({ children }) {
    const [modal, dispatchModal] = useReducer(reducer, null)
    return (
        <ModalContext.Provider value={{modal,dispatchModal}}>{children}</ModalContext.Provider>
    )
}  

export default ModalState