import React, { useState } from 'react'
import { Button, Rating } from '@mui/material'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {calFinPrice,calRating} from '../../common';
import '../../css/childpro.css'
import { addToCartProduct, addToMyFAvProduct } from '../../Redux/counterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postAxios } from '../../api/useAxios/useAxios';


function Product(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const favProduct = useSelector((state)=>state.product.myFavProduct)
    const product = props.props;
    const childImg=[product.image]
    const [currImg,setImg]= useState(childImg[0])
    const checkInFac = (id) =>{
        let index = favProduct.findIndex((ele)=>ele._id == id)
        return index != -1 ? false : true
    }
    const buyNow = (product) => {
        dispatch(addToCartProduct(product))
        if(localStorage.getItem("userId"))
            postAxios(`/AddCart/${localStorage.getItem("userId")}/Add`,product)
            .then(result => alert(result.data))
            .catch(err => alert(err))
        navigate('/Cart')
    }
    const addToFavProduct = (product) => {
        dispatch(addToMyFAvProduct(product))
        if(localStorage.getItem("userId"))
            postAxios(`/AddFav/${localStorage.getItem("userId")}/Add`,product)
            .then(result => alert(result.data))
            .catch(err => alert(err))
    }
    const addProductToCart = (product) =>{
        dispatch(addToCartProduct(product))
        if(localStorage.getItem("userId"))
            postAxios(`/AddCart/${localStorage.getItem("userId")}/Add`,product)
            .then(result => alert(result.data))
            .catch(err => alert(err))
    }

  return (
    <>
        <div className="pro-cover">
            <div className="pro-ip">
                <div className="pro-img-dx">
                    <img src={product.image} alt="" />
                </div>
                <div className="pro-details">
                    <div className="pro-name">{product.name}</div>
                    <div className="pro-disc">
                    <div class="disc-list">
                    {product.category == "Electronic"?
                        <ul>
                            <li class="disc-item">{product.RAM} RAM | {product.ROM} ROM | Expandable Upto 1 TB</li>
                            <li class="disc-item">17.32 cm (6.82 inch) HD+ Display</li>
                            <li class="disc-item">13Mp + AI Lens | 8MP Front Camera</li>
                            <li class="disc-item">{product.battery} Li-ion Polymer Battery</li>
                            <li class="disc-item">MediaTek G37 Processor</li>
                            <li class="disc-item">1 Year on Handset and 6 Months on Accessories</li>
                        </ul>
                    :product.category=="Application"?
                        product.type=="Air Conditioners" ?
                        <ul><li>Power Consumption: 744.39 kWh</li><li >Room Size: 111 to 150 sqft</li><li >1 Year Warranty on Product and 10 Years Warranty on Compressor</li></ul>

                    :"":""}
                    </div>
                    </div>
                    <div>
                        <div className="pro-rating"><Rating name="read-only" value={calRating(product.rating)} readOnly /></div>
                        <div className="pro-price"><span>RS.{product.price}</span>Rs.{calFinPrice(product.price,product.discount)}</div>
                        <div className='pro-child-img'>
                            {childImg.map(ele=><div className='child-img' onMouseEnter={()=>setImg(ele)}><img src={ele} alt="" /></div>)}
                        </div>
                    </div>
                </div>
                
            </div>
            <div className='pro-buttom'>
                <div className="add-cart">
                    <Button variant="contained" endIcon={<ShoppingCartCheckoutIcon />} color={'inherit'}
                        onClick={()=>addProductToCart(product)}>
                        Add to cart
                    </Button>
                </div>
                <div className="add-cart">
                    <Button variant="contained" disabled={!checkInFac(product._id)} endIcon={checkInFac(product._id) ? <FavoriteBorderIcon />: <FavoriteIcon />} color={'inherit'}
                        onClick={()=>addToFavProduct(product)}>
                        Add to Favorite
                    </Button>
                </div>
                <div className="add-cart">
                    <Button variant="contained" endIcon={<ShoppingBagIcon />} color={'inherit'}
                        onClick={()=>buyNow(product)}>
                        Buy Now
                    </Button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Product