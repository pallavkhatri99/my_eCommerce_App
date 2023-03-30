import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, IconButton, InputBase, Paper } from '@mui/material';
import '../../css/cartProduct.css'
import { calFinPrice } from '../../common';
import { removeFromCartProduct,incDecQuantityPro } from '../../Redux/counterSlice';
import { useDispatch } from 'react-redux';

function CartProduct(props) {
    const dispatch = useDispatch()
    let product = props.props
    const handleQuantity = (action,id) => {
        if(action == '+'){
            dispatch(incDecQuantityPro({id:id,action:'inc'}))
        }
        else if(action == '-'){
            dispatch(incDecQuantityPro({id:id,action:'dec'}))
        }
    }
  return (
    <>
     <div className="cp-box">
        <div className="cp-cap">
        </div>
        <div className="cp-image">
            <img src={product.image} alt="" />
        </div>
        <div className="cp-details">
            <div className="cp-det">
                <div className="cp-pro-name">{product.name}</div>
                {product.category == 'Electronic' ? <div className="cp-pro-disc">{product.ROM} GB RAM | {product.RAM} GB ROM | Expandable Upto 256 GB</div> : ''}
            </div>
            <div className='cp-pps'>
            <div className="cp-inc-dec-btm">
                <p>Quantity: -</p>
                <IconButton aria-label="delete">
                    <AddIcon onClick={()=>handleQuantity('+',product._id)}/>
                </IconButton>
                <Paper sx={{maxWidth: '50px'}}>
                <InputBase
                    sx={{ ml: 1, flex: 1,maxWidth: '30px' }}
                    value={product.quantity == undefined ? 1 : product.quantity}
                    inputProps={{ 'aria-label': '1' }}
                    disabled
                />
                </Paper>
                <IconButton aria-label="delete">
                    <RemoveIcon onClick={()=>handleQuantity('-',product._id)}/>
                </IconButton>
            </div>
                <div className="cp-price">
                    <div className="cp-p-orignal">Rs.<strike>{product.price}</strike></div>
                    <div className="cp-p-discount">OFF {product.discount}%</div>
                    <div className="cp-p-dis-price">Rs.{calFinPrice(product.price,product.discount)}</div>
                </div>
            </div>
        </div>
        <div className="cp-btn" onClick={()=>dispatch(removeFromCartProduct(product))}>
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