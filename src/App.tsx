import { ForumProvider } from './context/ForumContext'
import ThreadListPage from './pages/ThreadListPage'
import ThreadDetailPage from './pages/ThreadDetailPage';
import Layout from './components/Layout.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateThread from './pages/CreateThread.tsx';
import MyThreads from './pages/MyThreads.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import EditThreadPage from './pages/EditThreadPage.tsx';

function App() {

  return (
    <ForumProvider>
      <AuthProvider>
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

              <Route path='/register' element={<RegisterPage />}/>

              <Route path='/login' element={<LoginPage />}/>

              <Route path='/threads/:id/edit' element={<EditThreadPage />}/>
            </Route>
          </Routes>
        </BrowserRouter>

      </AuthProvider>
    </ForumProvider>
  )
}

export default App
