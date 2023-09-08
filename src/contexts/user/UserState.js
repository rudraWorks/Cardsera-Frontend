import React, {useReducer } from "react";
import UserContext from "./UserContext";

const reducer = (state,action) => {
    switch(action.type){
        case 'LOGIN': return action.user
        case 'LOGOUT': return null
    }
}
function UserState({ children }) {
    const [user, dispatch] = useReducer(reducer, null)
    return <UserContext.Provider value={{user,dispatch}}>{children}</UserContext.Provider>
}

export default UserState