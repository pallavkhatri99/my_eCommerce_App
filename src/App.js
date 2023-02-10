import { Route,Routes,Redirect } from 'react-router-dom';
import Home from './pages/home';
import Products from './pages/products';
import Cart from './pages/cart';
import './App.css';


function App() {
  return (
    <Routes>
      <Route path='/Home' element={<Home/>} />
      <Route path='/Product' element={<Products />} />
      <Route path='/Cart' element={<Cart />} />
      <Route path='*' element={<Home/>} />
    </Routes>
  );
}

export default App;
