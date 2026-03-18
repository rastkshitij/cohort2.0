import React, { useState } from 'react'
import '../style/form.scss'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth.jsx'
const login = () => {
  const [username, setusername] = useState('')
 const [password, setpassword] = useState('')
 const {  handlelogin  ,loading} = useAuth()
const navigate =  useNavigate()
if(loading){
  return (<h1>Loading.....</h1>)
}

 function handleFormsubmit(e){
 e.preventDefault() ;
 handlelogin(username , password)
 .then(res =>{
  console.log(res)
  navigate("/")
 })
 }


  return (
  <main >
    <div className="form-container">
        <h1> Login </h1>
        <form onSubmit={handleFormsubmit}>
            <input onInput={(e)=>{
              setusername(e.target.value)
            }}
            type="text"
             name ="username" 
             placeholder='Enter Username ' required/>
             <input onInput={(e)=>{
              setpassword(e.target.value)
             }}
             type="password" 
             name ="password" 
             placeholder='Enter Username ' required />
<button type='submit' > LogIn </button>
<p> Don't have an account <Link to='/register' className='toogleform'> Register </Link></p>
        </form>
    </div>
  </main>
  )
}

export default login