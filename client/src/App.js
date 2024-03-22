import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home.tsx'
import Login from './pages/Login/Login.tsx'
import Register from './pages/Register/Register.tsx'
import PostEditor from './pages/PostEditor/PostEditor.tsx'
import PostDetail from './pages/PostDetail/PostDetail.tsx'
import NavBar from './components/NavBar/NavBar.tsx'
import Footer from './components/Footer/Footer.tsx'
import Contact from './pages/Contact/Contact.tsx'
import About from './pages/About/About.tsx'


const AppLayout = ({ children }) => {
  return (
    <>
      <NavBar />
        {children}
      <Footer />
    </>
  )
}

const App = () => {
  return (
    <div className='app'>
      <div className='app-container'>
      <Router>
        <Routes>
          <Route path='/' element={<AppLayout><Home /></AppLayout>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/editor' element={<AppLayout><PostEditor /></AppLayout>} />
          <Route path='/post/:id' element={<AppLayout><PostDetail /></AppLayout>} />
          <Route path='/contact' element={<AppLayout><Contact /></AppLayout>} />
          <Route path='/about' element={<AppLayout><About /></AppLayout>} />
        </Routes>
      </Router>
      </div>
    </div>
  )
}

export default App
