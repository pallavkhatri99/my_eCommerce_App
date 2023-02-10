import React from 'react'
import { Button, Paper, Rating } from '@mui/material'
import '../../css/productslider.css';
import TrendingFlatTwoToneIcon from '@mui/icons-material/TrendingFlatTwoTone';


function ProductSlider(props) {
  console.log(props)
  const heading = props.heading;
  const array = props.array

  return (
    <div className='wrapper-box'>
    <Paper elevation={3}>
    <div className="wapper-bx">
      <div className="head">
        <h3>{heading}</h3>
        <h6>
          <Button 
            key={'md'} 
            size={'md'}
            color={'error'}
            endIcon={<TrendingFlatTwoToneIcon />}>
            View all
          </Button>
        </h6>
      </div>
      <div className="container-wrap">
        {array.map(ele =><div className="wrap-pro">
          <div className="pro-item">
            <div className="pro-img">
              <img src={ele.img} alt="" />
            </div>
            <div className="pro-des">
              <p>{ele.product}</p>
            </div>
            <div className="pro-rating">
              <Rating name="read-only" value={ele.rating} readOnly />
            </div>
            <div className="h-pro-price">
              <span className='orignal'>Rs.<strike>{ele.orignalPrice}</strike></span>
              Rs.<span className='discounted'>{ele.disprice}</span>
            </div>
          </div>
        </div>)}
      </div>
    </div>
    </Paper>
    </div>
  )
}

export default ProductSlider