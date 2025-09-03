import { useState } from 'react'
import './App.css'
import { ForumProvider } from './context/ForumContext'

import ThreadListPage from './pages/ThreadListPage'
import ThreadDetailPage from './pages/ThreadDetailPage';
import Layout from './components/Layout.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



function App() {
  const [count, setCount] = useState(0)

  return (
    <ForumProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<ThreadListPage />}/>
            <Route path='/threads/:id' element={<ThreadDetailPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
     
    </ForumProvider>
  )
}

export default App
