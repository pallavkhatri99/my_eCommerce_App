import React,{ lazy,Suspense } from 'react';
import { Route,Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/maincomponent/navbar';
import Login from './components/maincomponent/login';
import PopUpConfirmation from './components/component/popUpConfirmation';
import Loader from './components/component/loader';

const Home = lazy(()=> import('./pages/home'));
const Products = lazy(()=> import('./pages/products'));
const Cart = lazy(() => import('./pages/cart'));
const MyFav = lazy(() => import('./pages/myfac'));
const MyOrder = lazy(() => import('./pages/myorder'));

function App() {
  return (
  <>
    <Navbar />
    <Suspense fallback={<div style={{position:'fixed',top:'50%',left:'50%'}}><Loader/></div>}>
      <Routes>
        <Route path='/Home' element={<Home/>} />
        <Route path='/Product' element={<Products />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/MyFav' element={<MyFav />} />
        <Route path='/MyOrder' element={<MyOrder />} />
        <Route path='*' element={<Home/>} />
      </Routes>
      </Suspense>
    <Login />
    <PopUpConfirmation />
  </>
  );
}

export default App;
