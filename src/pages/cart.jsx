import { Button, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartProduct from '../components/maincomponent/cartProduct'
import Footer from '../components/maincomponent/footer'
import Navbar from '../components/maincomponent/navbar'
import '../css/cart.css'
import { calFinPrice, calDiscountPrice } from '../common'


function Cart() {
  const [priceDetalis,setPriceDetails] = useState({price:0,disPrice:0,totalPrice:0})
  const cartProduct = useSelector((state)=>state.product.cartProduct)
  const calAllPriceFor = (cartProduct) => {
    if(cartProduct.length!=0){
      let price = cartProduct.reduce((acc, currValue) =>{return  acc + +currValue.price * (currValue.quantity==undefined ? 1 : +currValue.quantity)},0)
      let totalPrice = cartProduct.reduce((acc, currValue) =>{return  acc + calFinPrice(currValue.price,currValue.discount) * (currValue.quantity==undefined ? 1 : +currValue.quantity) },0)
      let disPrice = cartProduct.reduce((acc, currValue) =>{return  acc + calDiscountPrice(currValue.price,currValue.discount) * (currValue.quantity==undefined ? 1 : +currValue.quantity)},0)
      setPriceDetails({price,disPrice:parseInt(disPrice),totalPrice:parseInt(totalPrice)})
      console.log({price,disPrice:parseInt(disPrice),totalPrice:parseInt(totalPrice)})
    }
    else
      setPriceDetails({price:0,disPrice:0,totalPrice:0})

  }
  useEffect(()=>{
    calAllPriceFor(cartProduct)
  },[cartProduct])
  return (
    <>
    <Navbar/>
    <div className="cart-box">
        <div className="cart-body">
            {cartProduct.length!=0 ?
            <div className="cart-item">
                {cartProduct.map(ele=>
                    <CartProduct props={ele}/>
                )}
            </div>
            : <div className="cart-item">
              <h1 style={{textAlign:"center"}}>No Product in Cart</h1>
              </div> 
            }
            <div className="cart-checkout">
              <Paper>
                <div className="checkout">
                  <div className="checkout-head">PRICE DETAILS</div>
                  <div className="cal">
                    <div className="cal-head">
                      <div className="cal-item">Price</div>
                      <div className="cal-item">Discount</div>
                      <div className="cal-item">Delivery Charges</div>
                    </div>
                    <div className="cal-head cal-amt">
                      <div className="cal-item">{priceDetalis.price}</div>
                      <div className="cal-item">-{priceDetalis.disPrice}</div>
                      <div className="cal-item">FREE</div>
                    </div>
                  </div>
                  <div className="cal-divider"></div>
                  <div className="cal-grand-total">
                      <div className="cal-total">Grand Total</div>
                      <div className="cal-total-amt">{priceDetalis.totalPrice}</div>
                    </div>
                  <div className="cal-divider"></div>
                    <div className="cal-checkout-btn">
                    <Button variant="contained" disabled={priceDetalis.price!=0 && priceDetalis.disPrice!=0 && priceDetalis.totalPrice!=0 ? false : true} color="secondary" fullWidth>
                      PLACE ORDER
                    </Button>
                    </div>
                </div>
              </Paper>
            </div>
        </div>
    </div>
    <div className='footer-tag-bottom' style={{display:'none' ,position:(cartProduct.length < 2 ? "absolute":"relative")}}>
      <Footer/>
    </div>
    </>
  )
}

export default Cart