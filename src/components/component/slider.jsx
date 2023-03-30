import React,{ useState , useEffect } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import '../../css/slider.css';


const ImgSlider = (props) => {
    let images = props.imgs;
    const [currentIndex,setIndexSlide]= useState(0);
    const styleSlide={
        minHeight : '300px',
        width : '100%',
        height : '100%',
        background : `url(${require(`../../img/banner/${images[currentIndex].replace('./','')}`)}) left center / cover`,
        /*backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat : 'no-repeat'*/
    }

    const moveSlider = (move) =>{
        
        if(move == 'next'){
            currentIndex < 2 ? setIndexSlide(currentIndex + 1) : setIndexSlide(0);
        }
        else if(move == 'previous'){
            currentIndex > 0 && currentIndex < 3  ? setIndexSlide(currentIndex + 1) : setIndexSlide(0);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setIndexSlide(currentIndex => currentIndex < 2 ? currentIndex + 1 : 0 );
        }, 5000);
        return () => clearInterval(interval);
      }, []);



  return (
    <>
    <div className="silder">
        <div className='slider-image'
        style={styleSlide}>
        </div>
        <div className='slider-previous' onClick={()=>moveSlider('previous')}>
            <ArrowBackIosIcon fontSize='large'/>
        </div>
        <div className='slider-next' onClick={()=>moveSlider('next')}>
            <ArrowForwardIosIcon fontSize='large'/>
        </div>
  
    </div>
    </>
  )
}

export default ImgSlider