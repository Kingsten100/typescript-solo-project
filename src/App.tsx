import { useState } from 'react'

import { ForumProvider } from './context/ForumContext'

import ThreadListPage from './pages/ThreadListPage'
import ThreadDetailPage from './pages/ThreadDetailPage';
import Layout from './components/Layout.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateThread from './pages/CreateThread.tsx';
import MyThreads from './pages/MyThreads.tsx';



function App() {
  const [count, setCount] = useState(0)

  return (
    <ForumProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<ThreadListPage />}/>
            <Route path='/threads/:id' element={<ThreadDetailPage />}/>
            <Route path='/create' element={<CreateThread />}/>
            <Route path='/myThreads' element={<MyThreads />}/>
          </Route>
        </Routes>
      </BrowserRouter>
     
    </ForumProvider>
  )
}

export default App
