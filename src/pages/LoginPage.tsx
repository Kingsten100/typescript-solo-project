import React, { useState, type FormEvent } from 'react'
import type { User } from '../types/types';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [inputUsername, setUsername] = useState('')
  const [inputPassword, setPassword] = useState('')

  const { login } = useAuth()

  const storedUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  const navigate = useNavigate()


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const user = storedUsers.find(
    (u) => u.username === inputUsername && u.password === inputPassword
  );

  if(user){
    console.log('Inloggningen lyckades', user)
    login(inputUsername, inputPassword)
    
  } else {
    console.log('Fel Username eller password')
  }

    navigate('/')
  }


  return (
    <div >
     <form onSubmit={handleSubmit} className='login-form-container'>
      <div className='login-input'>
      <input type="text" placeholder='Username...' id='inputUsername' value={inputUsername} onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div>
        <input placeholder='password' type="password" id='inputPassword'value={inputPassword} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <button className='login-button' type='submit'>Logga in</button>
     </form>
     <p>Inget konto?  <a onClick={() => navigate('/register')}>Registrera dig här</a></p>
    </div>

  )
}

export default LoginPage
