import axios from "axios";
import { createContext, useEffect, useState } from "react";
import UsersAPI from "./API/UsersAPI";

export const GlobalState = createContext()

export const DataProvider = ({children}) => {
    const [token,setToken] = useState('')

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')

        if(firstLogin)
        {
            const refreshtoken = async () => {
                const res = await axios.get('/user/refresh_token')
                setToken(res.data.accesstoken)
                setTimeout(()=>{refreshtoken()},10 * 60 * 1000)
            }
            refreshtoken()
            
        }
    },[])

    const state = {
        token: [token],
        UsersAPI: UsersAPI(token)
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}