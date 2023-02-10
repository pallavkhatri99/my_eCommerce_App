import React from 'react';
import Paper from '@mui/material/Paper';
import {InputBase, IconButton, Button} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {Favorite,Person} from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import '../../css/navbar.css'

function Navbar() {
  return (
    <>
    <div id="nav">
      <div className='nav-logo'>
        <h1>best<span>Deal</span><a>.com</a></h1>
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
        <Button 
          key={'md'} 
          size={'md'}
          color={'error'}
          startIcon={<Person/>}>
            Login
        </Button>
        </div>
        <div className='nav-fav'>
        <Button 
          key={'md'} 
          size={'md'}
          color={'error'}
          startIcon={<Favorite/>}>
          My Fav
        </Button>
        </div>
        <div className='nav-cart'>
        <Button 
          key={'md'} 
          size={'md'}
          color={'error'}
          startIcon={<ShoppingCartIcon />}>
          Cart
        </Button>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default Navbar