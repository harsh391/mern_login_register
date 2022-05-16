import React, { useState } from 'react'
import './Register.css'
import {Link} from 'react-router-dom'
import axios from 'axios'


const Login = () => {
  const [user,setUser] = useState({
    firstname:'',lastname:''
  })
  const handleChange = (e) => {
    const {name,value} = e.target;
    setUser({...user,[name]:value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/user/login',{...user})

      localStorage.setItem('firstLogin',true)

      window.location.href = '/details'

    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  return (
        <section>
      <div className="registerContainer">
        <h1>Login</h1>        
        <div className="registerFormRow">
          <label htmlFor="" className='registerLabel'>Email Id</label>
          <input type="text" name='email' value={user.email} onChange={handleChange} className='registerInput'/>
        </div>
        <div className="registerFormRow">
          <label htmlFor="" className='registerLabel'>Password</label>
          <input type="text" name='password' value={user.password} onChange={handleChange} className='registerInput'/>
        </div>
        <div className="registerBtnContainer">
          <button className='registerBtn' onClick={handleSubmit}>Login</button>
          {/* <Link to='/login' className='registerBtn'><button>Login</button></Link> */}
        </div>
        <p className='registerLinkText'>Do not have an account? Click to <Link to='/register'>Register</Link></p>
      </div>
    </section>
  )
}

export default Login