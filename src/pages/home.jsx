import React from 'react';
import Category from '../components/maincomponent/category';
import Banner from '../components/maincomponent/banner';
import ProductSlider from '../components/maincomponent/productSlider';
import data from '../dataFile/homedata.json'
import OnTop from '../components/component/onTop';
import Footer from '../components/maincomponent/footer';

function Home() {
  
  return (
    <>
        <Category />
        <Banner />
        <ProductSlider heading={data.trending.heading} array={data.trending.array} link={'/Product?category=Grocery'} />
        <ProductSlider heading={data.shoes.heading} array={data.shoes.array}  link={'/Product?category=Fashion'} />
        <ProductSlider heading={data.menCloths.heading} array={data.menCloths.array}  link={'/Product?category=Fashion'} />
        <OnTop/>
        <div>
          <Footer/>
        </div>
    </>
  )
}

export default Home