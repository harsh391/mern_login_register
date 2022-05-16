import React, { useState } from 'react'
import './Register.css'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [user,setUser] = useState({
    firstname:'',lastname:'',email:'',password:''
  })
  const handleChange = (e) => {
    const {name,value} = e.target;
    setUser({...user,[name]:value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/user/register',{...user})

      localStorage.setItem('firstLogin',true)

      window.location.href = '/'

    } catch (err) {
      alert(err.response.data.msg)
    }
  }
  return (
    <section>
      <div className="registerContainer">
        <h1>Register</h1>
        <div className="registerFormRow">
          <label htmlFor="" className='registerLabel'>First Name</label>
          <input type="text" name='firstname' value={user.firstname} onChange={handleChange} className='registerInput'/>
        </div>
        <div className="registerFormRow">
          <label htmlFor="" className='registerLabel'>Last Name</label>
          <input type="text" name='lastname' value={user.lastname} onChange={handleChange} className='registerInput'/>
        </div>
        <div className="registerFormRow">
          <label htmlFor="" className='registerLabel'>Email Id</label>
          <input type="text" name='email' value={user.email} onChange={handleChange} className='registerInput'/>
        </div>
        <div className="registerFormRow">
          <label htmlFor="" className='registerLabel'>Password</label>
          <input type="text" name='password' value={user.password} onChange={handleChange} className='registerInput'/>
        </div>
        <div className="registerBtnContainer">
          <button className='registerBtn' onClick={handleSubmit}>Register</button>
          {/* <Link to='/login' className='registerBtn'><button>Login</button></Link> */}
        </div>
        <p className='registerLinkText'>Already have an account? Click to <Link to='/login'>Login</Link></p>
      </div>
    </section>
  )
}

export default Register