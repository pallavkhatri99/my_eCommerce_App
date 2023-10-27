import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import {InputBase, IconButton, Button, Badge} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {Favorite,Person} from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import '../../css/navbar.css'
import { useSelector,useDispatch } from 'react-redux';
import { login, logout, removeFromCartProduct, removeFromMyFavProduct, setLogInOut } from '../../Redux/counterSlice';
import MessageBox from '../component/messageBox';
import logo from '../../img/iconbestDeal.jpg'
import SplitButton from '../component/Splitbutton';

function Navbar() {
  let [msgBox,setMsgBox] = useState("")
  const [showmenu,setMenu] = useState(false)
  const dispatch = useDispatch();
  const cartCount = useSelector((state)=>state.product.cartProduct)
  const myFavCount = useSelector((state)=>state.product.myFavProduct)
  const isUserLogin = useSelector((state) => state.activeUser.isUserLogin)
  const logOutUser = () =>{
    dispatch(setLogInOut(false))
    setMsgBox(<MessageBox msg={"Logout Successfull"} type={"S"}/>)
    localStorage.clear()
    if(myFavCount.length>0) myFavCount.map(ele=>dispatch(removeFromMyFavProduct(ele)))
    if(cartCount.length>0) cartCount.map(ele=>dispatch(removeFromCartProduct(ele)))
  }
  useEffect(()=>{
    let timer = setTimeout(() => {
      setMsgBox("")
    }, 2010);
    return () => clearTimeout(timer)
  },[isUserLogin])

  return (
    <>
    <div id="nav">
      <div className='menuIcon'>{showmenu ? 
        <CloseIcon sx={{fontSize:'38px',backgroundColor:'#7c75753b',marginRight:'-10px'}} onClick={()=>setMenu(false)} /> : 
        <MenuIcon sx={{fontSize:'38px',backgroundColor:'#7c75753b',marginRight:'-10px'}} onClick={()=>setMenu(true)} />}
      </div>
      <div className='nav-logo' style={{display:'flex'}}>
        <div><img src={logo} style={{width:'30px'}}/></div>
        <div><Link to="/Home"><h1>best<span>Deal</span><a>.com</a></h1></Link></div>
      </div>
      <div className='nav-search'>
       <Paper elevation={3} className='search-bar' >
        <InputBase
          placeholder="Search Brand or Product" className='search-bar-input'
          //sx={{ width:'650px' , ml: 2 }}
        />
        <IconButton type="button" sx={{ p: '10px'}} aria-label="search">
          <SearchIcon />
        </IconButton>
       </Paper>
       <Button 
          key={'md'} 
          size={'md'}
          variant={'contained'}
          color={'inherit'}
          sx={{ml:'2px'}}
          >
            Search
        </Button> 
      </div>
      <div className='nav-item' style={{display:(showmenu ? 'flex':'none')}}>
        <div className='nav-login'>
        {!isUserLogin ?
        <Button 
          key={'md'} 
          size={'md'}
          color={'error'}
          startIcon={<Person/>}
          onClick={()=>dispatch(login())}>
            Login
        </Button>
        :
        <SplitButton />
        /*<Button 
          key={'md'} 
          size={'md'}
          color={'error'}
          startIcon={<Person/>}
          onClick={logOutUser}>
            Logout
        </Button>*/}
        </div>
        <div className='nav-fav'>
        <Link to='/MyFav'>
        <Badge badgeContent={myFavCount.length} color="error">
          <Button 
            key={'md'} 
            size={'sm'}
            color={'error'}
            startIcon={<Favorite/>}>
            My Fav
          </Button>
        </Badge>
        </Link>
        </div>
        <div className='nav-cart'>
        <Link to="/Cart">
        <Badge badgeContent={cartCount.length} color="error">
          <Button 
            key={'md'} 
            size={'md'}
            color={'error'}
            startIcon={<ShoppingCartIcon />}>
            Cart
          </Button>
        </Badge>
        </Link>
        </div>
      </div>
    </div>
    {msgBox}
    </>
  )
}

export default Navbar