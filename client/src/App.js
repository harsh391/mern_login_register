import './App.css';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Details from './Pages/Details';
import {DataProvider} from './GlobalState'

function App() {
  return (
    <DataProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/details' element={<Details />} />
      </Routes>
    </Router>
    </DataProvider>
  )
}

export default App;

