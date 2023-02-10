import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, IconButton, InputBase, Paper } from '@mui/material';
import '../../css/cartProduct.css'

function CartProduct() {
  return (
    <>
     <div className="cp-box">
        <div className="cp-cap">
        </div>
        <div className="cp-image">
            <img src="https://m.media-amazon.com/images/I/411wOTpPu5L._AC_SY879_.jpg" alt="" />
        </div>
        <div className="cp-details">
            <div className="cp-det">
                <div className="cp-pro-name">SumgSung As Pro 45 </div>
                <div className="cp-pro-disc">4 GB RAM | 64 GB ROM | Expandable Upto 256 GB</div>
            </div>
            <div className='cp-pps'>
            <div className="cp-inc-dec-btm">
                <p>Quantity: -</p>
                <IconButton aria-label="delete">
                    <AddIcon />
                </IconButton>
                <Paper sx={{maxWidth: '50px'}}>
                <InputBase
                    sx={{ ml: 1, flex: 1,maxWidth: '30px' }}
                    value="10"
                    inputProps={{ 'aria-label': '1' }}
                    disabled
                />
                </Paper>
                <IconButton aria-label="delete">
                    <RemoveIcon />
                </IconButton>
            </div>
                <div className="cp-price">
                    <div className="cp-p-orignal">Rs.<strike>21,000</strike></div>
                    <div className="cp-p-discount">OFF 20%</div>
                    <div className="cp-p-dis-price">Rs.19,999</div>
                </div>
            </div>
        </div>
        <div className="cp-btn">
            <div className="cp-remove">
                <div className='remoe-btn'>
                    Remove
                </div>
            </div>
        </div>
     </div>
    </>
  )
}

export default CartProduct