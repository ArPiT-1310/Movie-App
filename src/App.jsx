import './css/App.css'
import Favorites from './Pages/Favorites';
import Home from "./Pages/Home";
import { Route, Routes } from 'react-router-dom';
import { MovieProvider } from './contexts/MovieContext';
import NavBar from './components/NavBar';

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Favorites' element={<Favorites />}></Route>
        </Routes>
      </main>
    </MovieProvider>
  )
}

export default App
