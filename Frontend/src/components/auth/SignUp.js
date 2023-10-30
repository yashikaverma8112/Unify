import React, { useState } from 'react'

const SignUp = () => 
{
  const[user,setUser] = useState({
    username:"",
    password:"",
    email:"",
    
  })
  return (
    <div>
        <input className='user_name'>UserName</input>
        <input className='email'>E-Mail</input>
        <input className='pass_word'>PassWord</input>
        {/* <input className='phone'>Contact Number</input> */}
        
        <p className="">
        Already have an Account <a href="/sign-in"> Login?</a>
      </p>
    </div>
  )
}

export default SignUp