import React from 'react';
import Paper from '@mui/material/Paper';
import {InputBase, IconButton, Button} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {Favorite,Person} from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom';
import '../../css/navbar.css'
import { useSelector,useDispatch } from 'react-redux';
import { login, logout } from '../../Redux/counterSlice';


function Navbar() {
  const dispatch = useDispatch();

  return (
    <>
    <div id="nav">
      <div className='nav-logo'>
        <Link to="/Home"><h1>best<span>Deal</span><a>.com</a></h1></Link>
      </div>
      <div className='nav-search'>
       <Paper elevation={3} sx={{display:'flex', width: '700px'}}>
        <InputBase
          placeholder="Search Brand or Product"
          sx={{ width:'650px' , ml: 2 }}
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
      <div className='nav-item'>
        <div className='nav-login'>
        {0==0 ?
        <Button 
          key={'md'} 
          size={'md'}
          color={'error'}
          startIcon={<Person/>}
          onClick={()=>dispatch(login())}>
            Login
        </Button>
        :
        <Button 
          key={'md'} 
          size={'md'}
          color={'error'}
          startIcon={<Person/>}
          onClick={() => dispatch(logout())}>
            Logout
        </Button>}
        </div>
        <div className='nav-fav'>
        <Link to='/MyFav'>
        <Button 
          key={'md'} 
          size={'md'}
          color={'error'}
          startIcon={<Favorite/>}>
          My Fav
        </Button>
        </Link>
        </div>
        <div className='nav-cart'>
        <Link to="/Cart">
        <Button 
          key={'md'} 
          size={'md'}
          color={'error'}
          startIcon={<ShoppingCartIcon />}>
          Cart
        </Button>
        </Link>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default Navbar