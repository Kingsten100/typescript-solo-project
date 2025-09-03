import { useState } from 'react'
import './App.css'
import { ForumProvider } from './context/ForumContext'
import ThreadList from './components/ThreadList'



function App() {
  const [count, setCount] = useState(0)

  return (
    <ForumProvider>
      <ThreadList />
    </ForumProvider>
  )
}

export default App
