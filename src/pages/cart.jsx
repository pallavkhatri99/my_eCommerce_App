import { Button, Paper } from '@mui/material'
import React from 'react'
import CartProduct from '../components/maincomponent/cartProduct'
import Footer from '../components/maincomponent/footer'
import Navbar from '../components/maincomponent/navbar'
import '../css/cart.css'

function Cart() {
  return (
    <>
    <Navbar/>
    <div className="cart-box">
        <div className="cart-body">
            <div className="cart-item">
                
                    <CartProduct/>
                
            </div>
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
                      <div className="cal-item">19,999</div>
                      <div className="cal-item">-2,00</div>
                      <div className="cal-item">FREE</div>
                    </div>
                  </div>
                  <div className="cal-divider"></div>
                  <div className="cal-grand-total">
                      <div className="cal-total">Grand Total</div>
                      <div className="cal-total-amt">19,999</div>
                    </div>
                  <div className="cal-divider"></div>
                    <div className="cal-checkout-btn">
                    <Button variant="contained" color="secondary" fullWidth>
                      PLACE ORDER
                    </Button>
                    </div>
                </div>
              </Paper>
            </div>
        </div>
    </div>
    <div className='footer-tag-bottom'>
      <Footer/>
    </div>
    </>
  )
}

export default Cart