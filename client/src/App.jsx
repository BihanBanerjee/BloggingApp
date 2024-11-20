import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Header from './components/Header'
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route  path="/signin" element={<SignIn />} />
        <Route  path="/signup" element={<SignUp />} />
        <Route  path="/about"  element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route  path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route  path="/create-post" element={<CreatePost />} />
          <Route  path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route  path="/projects"  element={<Projects />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App