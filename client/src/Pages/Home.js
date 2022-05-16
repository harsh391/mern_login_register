import React, { useContext } from 'react'
import './Home.css'
import {Link} from 'react-router-dom'
import { GlobalState } from '../GlobalState'
import axios from 'axios'

const Home = () => {
  const state = useContext(GlobalState)
  const [isLogged, setIsLogged] = state.UsersAPI.isLogged

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      await axios.get('/user/logout');

      setIsLogged(false)

      localStorage.removeItem('firstLogin')

      alert('Log Out Successful')
    } catch (err) {
        alert(err.response.data.msg)
    }
  }
  return (
    <div>
      <h1>Home</h1>
      <Link to='/login'><button className='btn'>Login</button></Link>
      <Link to='/register'><button className='btn'>Register</button></Link>
      <Link to='/details'><button className='btn'>Details</button></Link>
      {
        isLogged ? 
        <Link to='/details'><button className='btn' onClick={handleLogout}>Logout</button></Link> : <></>
      }
    </div>
    
  )
}

export default Home