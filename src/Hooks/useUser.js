import { useContext } from "react";
import UserContext from "../contexts/user/UserContext";


function useUser() {
    const {user,dispatch} = useContext(UserContext)
    return {user,dispatch} 
}

export default useUser 