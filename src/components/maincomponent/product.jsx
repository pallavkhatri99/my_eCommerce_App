import { Button } from '@mui/material'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import React, { useState } from 'react'
import '../../css/childpro.css'

function Product() {
    const childImg=["https://m.media-amazon.com/images/I/411wOTpPu5L._AC_SY879_.jpg",
    "https://m.media-amazon.com/images/I/41-WHjYGauL._AC_SY879_.jpg",
    "https://m.media-amazon.com/images/I/51qFduvrxnL._AC_SY879_.jpg",
    "https://m.media-amazon.com/images/I/41jgSBZvddL._AC_SY879_.jpg",
    "https://m.media-amazon.com/images/I/41FDhbJ8jfL._AC_SY879_.jpg",
    "https://m.media-amazon.com/images/I/51Y6E3An11L._AC_SY879_.jpg"
    ]
    const [currImg,setImg]= useState(childImg[0])

    

  return (
    <>
        <div className="pro-cover">
            <div className="pro-ip">
                <div className="pro-img-dx">
                    <img src={currImg} alt="" />
                </div>
                <div className="pro-details">
                    <div className="pro-name">SumgSung As Pro 45 </div>
                    <div className="pro-disc">
                    <div class="disc-list">
                        <ul>
                            <li class="disc-item">4 GB RAM | 64 GB ROM | Expandable Upto 256 GB</li>
                            <li class="disc-item">17.32 cm (6.82 inch) HD+ Display</li>
                            <li class="disc-item">13Mp + AI Lens | 8MP Front Camera</li>
                            <li class="disc-item">6000 mAh Li-ion Polymer Battery</li>
                            <li class="disc-item">MediaTek G37 Processor</li>
                            <li class="disc-item">1 Year on Handset and 6 Months on Accessories</li>
                        </ul>
                    </div>
                    </div>
                    <div className="pro-price">RS.12,999</div>
                    <div className='pro-child-img'>
                        {childImg.map(ele=><div className='child-img' onMouseEnter={()=>setImg(ele)}><img src={ele} alt="" /></div>)}
                    </div>
                </div>
                
            </div>
            <div className='pro-buttom'>
                <div className="add-cart">
                    <Button variant="contained" endIcon={<ShoppingCartCheckoutIcon />} color={'inherit'}>
                        Add to cart
                    </Button>
                </div>
                <div className="add-cart">
                    <Button variant="contained" endIcon={<ShoppingBagIcon />} color={'inherit'}>
                        Buy Now
                    </Button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Product