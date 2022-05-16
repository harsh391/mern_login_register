import React, { useContext, useEffect, useState} from 'react'
import './Register.css'
import {Link} from 'react-router-dom'
import { GlobalState } from '../GlobalState'
import axios from 'axios'


const Details = () => {
  const state = useContext(GlobalState)
  const [token] = state.token
  const [isLogged]= state.UsersAPI.isLogged
  const [user,setUser] = useState({})
  // const [user] = state.UsersAPI.user
  useEffect(() => {
        if(token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/info',
                    {
                        headers: {Authorization: token}
                    })
                    setUser(res.data)
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    },[token])
  return (
    isLogged ? (
    <section>
      <div className="registerContainer">
        <h1>My Details</h1>
        <div className="registerFormRow">
          <label htmlFor="" className='registerLabel'>First Name</label>
          <input type="text" name='firstname' value={user.firstname} className='registerInput' disabled/>
        </div>
        <div className="registerFormRow">
          <label htmlFor="" className='registerLabel'>Last Name</label>
          <input type="text" name='lastname' value={user.lastname}  className='registerInput' disabled/>
        </div>
        <div className="registerFormRow">
          <label htmlFor="" className='registerLabel'>Email Id</label>
          <input type="text" name='email' value={user.email} className='registerInput'disabled/>
        </div>
        <div className="registerBtnContainer">
          <Link to='/'><button className='registerBtn'>Home</button></Link>
          {/* <Link to='/login' className='registerBtn'><button>Login</button></Link> */}
        </div>
      </div>
    </section>
    ) : (
      <h1>Please Register or Log in</h1>
    )
  )
}

export default Details