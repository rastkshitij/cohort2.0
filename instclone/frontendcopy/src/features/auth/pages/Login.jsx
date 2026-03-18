import React, { useState } from 'react'
import "../style/form.scss"
import { Link, useNavigate } from 'react-router-dom'
import { userAuth } from '../hooks/userAuth'
const Login = () => {
    const {user , loading , handleLogin} = userAuth()
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const navigate =  useNavigate()
    const handlesubmit = async (e)=>{
        e.preventDefault()
await handleLogin(username , password)
        navigate('/')
    }
    if(loading){
        return (
            <main>
                <h1>Loading...................</h1>
            </main>
        )
    }
  return (
<main>
    <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handlesubmit}>
            <input onInput={(e)=>{
                setusername(e.target.value)
            }} 
            type="text"
             name='username'
              id='username'
              placeholder='Enter username'/>
            <input onInput={(e)=>{
                setpassword(e.target.value)
            }}
            type="password"
             name='password' 
             id='password' 
             placeholder='Enter Your Password' />
            <button className='button primary-button' >Login</button>
        </form>
        <p>Don't have an account? <Link to={"/register"}>Register.</Link></p>
    </div>
</main>
  )
}

export default Login