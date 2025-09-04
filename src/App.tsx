import { ForumProvider } from './context/ForumContext'
import ThreadListPage from './pages/ThreadListPage'
import ThreadDetailPage from './pages/ThreadDetailPage';
import Layout from './components/Layout.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateThread from './pages/CreateThread.tsx';
import MyThreads from './pages/MyThreads.tsx';

function App() {

  return (
    <ForumProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            {/* Lista alla trådar */}
            <Route index element={<ThreadListPage />} />

            {/* Visa tråd i detalj */}
            <Route path='/threads/:id' element={<ThreadDetailPage />} />

            {/* Skapa ny tråd */}
            <Route path='/create' element={<CreateThread />} />

            {/* Visa mina trådar (extra funktion) */}
            <Route path='/myThreads' element={<MyThreads />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ForumProvider>
  )
}

export default App
