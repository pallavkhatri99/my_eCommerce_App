import React, { useState } from 'react'
import ImgSlider from '../component/slider';


function importAll(r) {
    return r.keys() 
}

function Banner() {
    const img = importAll(require.context('../../img/banner/',false, /\.(jpg)$/));
  return (
    <>
    <ImgSlider imgs={img}/>
    </>
  )
}

export default Banner;