import React,{useEffect,useState} from 'react'

function useTitle(value) {
    const [title,setTitle] = useState(value || 'Cardsera')
    useEffect(()=>{
        document.title=title
    },[title])
} 

export default useTitle