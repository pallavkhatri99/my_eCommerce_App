import { Route,Routes,Redirect } from 'react-router-dom';
import Home from './pages/home';
import Products from './pages/products';
import Cart from './pages/cart';
import './App.css';
import MyFav from './pages/myfac';
import Login from './components/maincomponent/login';


function App() {
  return (
  <>
    <Routes>
      <Route path='/Home' element={<Home/>} />
      <Route path='/Product' element={<Products />} />
      <Route path='/Cart' element={<Cart />} />
      <Route path='/MyFav' element={<MyFav />} />
      <Route path='*' element={<Home/>} />
    </Routes>
    <Login />
  </>
  );
}

export default App;
