import { useEffect, useState } from 'react'
import axios from 'axios';

const UsersAPI = (token) => {
    const [isLogged,setIsLogged] = useState(false)
    // const [user, setUser] = useState({})
    // Optional
    // const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if(token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/info',
                    {
                        headers: {Authorization: token}
                    })
                    setIsLogged(true)
                    // setUser(res.data)
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }

    },[token])
    console.log(isLogged);
  return (
    {
        isLogged: [isLogged, setIsLogged],
        // user: [user,setUser]
    }
  )
}

export default UsersAPI