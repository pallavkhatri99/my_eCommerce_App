import React from 'react'
import { Button, Rating } from '@mui/material'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CloseIcon from '@mui/icons-material/Close';
import '../css/myfav.css'
import { useDispatch, useSelector } from 'react-redux';
import { calFinPrice, calRating } from '../common';
import { useNavigate } from 'react-router-dom';
import { addToCartProduct, removeFromMyFavProduct } from '../Redux/counterSlice';
import { postAxios } from '../api/useAxios/useAxios';
import Footer from '../components/maincomponent/footer';


function MyFav() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let myFavProducts = useSelector((state)=>state.product.myFavProduct);
    const buyNowFromFav = (product) => {
        navigate('/Cart')
        dispatch(addToCartProduct(product))
    }
    const removeFromMyFav = (ele) =>{
        console.log(ele)
        dispatch(removeFromMyFavProduct(ele))
        if(localStorage.getItem("userId"))
            postAxios(`/AddFav/${localStorage.getItem("userId")}/Remove`,ele)
            .then(result => alert(result.data))
            .catch(err => alert(err))
    }
  return (
    <>
    { myFavProducts.length != 0 ?
    <div className="container">
        <h1>List of My Favourite Products</h1>
        <div className='wrap-box-fav'>
            {myFavProducts.map(ele=>
            <div className="wrap-pro-fav">
                <div className='remove-fav'>
                    <CloseIcon onClick={()=>removeFromMyFav(ele)}/>
                </div>
                <div className="pro-item">
                    <div className="pro-img">
                    <img src={ele.image} alt="" />
                    </div>
                    <div className="pro-des">
                    <p>{ele.name}</p>
                    </div>
                    <div className="pro-rating">
                    <Rating name="read-only" value={calRating(ele.rating)} readOnly />
                    </div>
                    <div className="h-pro-price">
                    <span className='orignal'>Rs.<strike>{ele.price}</strike></span>
                    Rs.<span className='discounted'>{calFinPrice(ele.price,ele.discount)}</span>
                    </div>
                    <div>
                        <Button variant="contained" endIcon={<ShoppingBagIcon />} color={'inherit'} sx={{width:'100%'}}
                            onClick={()=>buyNowFromFav(ele)}>
                            Buy Now
                        </Button>
                    </div>
                </div>
            </div>)}
        </div>
    </div>
    : 
    <div className="container">
    <h1>List of My Favourite Products</h1>
    <h2 style={{textAlign: 'center',marginTop:'100px',fontSize: '70px'}}>No Product in My Favourite</h2>
    </div>}
    <div className='footer-top' style={{position:(myFavProducts.length < 6 ? "absolute":"relative"),bottom:"-10px"}}>
        <Footer />
    </div>
    </>
  )
}

export default MyFav