import React, { useReducer, useEffect } from "react";
import UserContext from "./UserContext";

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': {
            const {email,picture,token,name} = action
            localStorage.setItem('vocaUser', JSON.stringify({email,picture,token,name}))
            return {email,picture,token,name}
        }
        case 'LOADING':{
            return 'LOADING'
        }
        case 'LOGOUT': {
            localStorage.removeItem('vocaUser')
            return null
        }
        
    }
}
function UserState({ children }) {
    const [user, dispatch] = useReducer(reducer, null)

    useEffect(() => {
        const checkUser = async () => {
            try {
                const currentUser = localStorage.getItem('vocaUser') 
                dispatch({type:'LOADING'})
                if (currentUser) {
                    const {token,name,email,picture} = JSON.parse(currentUser)
                    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/verifyToken`,{
                        method:'GET',
                        headers:{'Content-Type':'application/json',Authorization:token}
                    })
                    const json = await response.json()
                    console.log(json);
                    if(response.ok){
                        dispatch({type:'LOGIN',token,name,email,picture})
                    }  
                    else{
                        dispatch({type:'LOGOUT'})
                    }
                } 
                else{ 
                    dispatch({type:'LOGOUT'})
                }
            }
            catch (e) {
                dispatch('LOGOUT')
            } 
        }
        checkUser()
    }, [])
    return <UserContext.Provider value={{ user, dispatch }}>{children}</UserContext.Provider>
}

export default UserState