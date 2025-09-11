import { useState, type FormEvent } from 'react'
import type { User } from '../types/types'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const { createUser } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const user: User = {
      id: crypto.randomUUID(),
      username: username,
      email: email,
      password: password,
      isModerator: true
    }

    createUser(user)
    console.log(user)

    setUsername('')
    setEmail('')
    setPassword('')

    navigate('/')
  }

  return (
    <div >
      <form className='login-form-container' onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder='Username...' id='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
          <input type="email" placeholder='Email...' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
          <input type="password" placeholder='Password...' id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button className='login-button' type='submit'>Registrera</button>
      </form>
      <p>Har du redan ett konto? <a onClick={() => navigate('/login')}>Logga in här</a></p>
      
    </div>
  )
}

export default RegisterForm
