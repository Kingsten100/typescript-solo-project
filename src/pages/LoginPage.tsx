import React, { useState, type FormEvent } from 'react'
import type { User } from '../types/types';

const LoginPage = () => {
  const [inputUsername, setUsername] = useState('')
  const [inputPassword, setPassword] = useState('')

  const storedUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const user = storedUsers.find(
    (u) => u.username === inputUsername && u.password === inputPassword
  );

  if(user){
    console.log('Inloggningen lyckades', user)
  } else {
    console.log('Fel Username eller password')
  }


  }


  return (
    <div>
     <form onSubmit={handleSubmit}>
      <div>
      <input type="text" placeholder='Username...' id='inputUsername' value={inputUsername} onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div>
        <input type="password" id='inputPassword'value={inputPassword} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <button type='submit'>Logga in</button>
     </form>
    </div>
  )
}

export default LoginPage
