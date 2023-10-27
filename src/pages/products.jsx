import React ,{ useState ,useEffect, lazy }from 'react';
import {  Box, Button, Checkbox, FormControlLabel, Paper, Radio, RadioGroup, Slider } from '@mui/material';
import { red } from '@mui/material/colors';
import Product from '../components/maincomponent/product';
import '../css/product.css';
import Footer from '../components/maincomponent/footer';
import { useLocation } from 'react-router-dom';
import { getAxios } from '../api/useAxios/useAxios'
import { useDispatch,useSelector } from 'react-redux';
import { setProduct, sortByPrice, sortByFilter, clearFilterAll } from '../Redux/counterSlice';
import queryString from 'query-string';
import PopUpBar from '../components/component/popUpBar';
import Loader from '../components/component/loader';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

function Products() {
  const dispatch = useDispatch()
  const location = useLocation()
  let products = useSelector((state)=>state.product.products)
  const callBy = useSelector((state)=>state.product.server == 'local' ? true:false)
  const getProductLocally = () =>{
    const data = import('../dataFile/dataProducts.json');
          data.then((e)=>{
            const parased = queryString.parse(location.search)
            dispatch(setProduct(e[parased.category]));
          })
          .catch((err)=> console.log(err))
  }
  const getProducts = async () => {
    dispatch(setProduct([]));
    let result =  await getAxios(`/product${location.search}`)
                        .then((response)=>{
                          return response.data
                        })
                        .catch((err)=>console.log(err))
   
      dispatch(setProduct(result));
  }
  useEffect(()=>{
    callBy ? getProductLocally() : getProducts();
  }, [location.search])
  products = useSelector((state)=>state.product.products)

  const redColor={ color: red[700],'&.Mui-checked': { color: red[700] } }
  const [rangeValue, setValue] = useState([1, 30000]);
  const [priceFilter,setPriceFilter] = useState(0);
  const [showFilter,setShowHideFilter] = useState(false);
  const typeArray = { Electronic:["Phone","Tablet","Laptop"],
                      Application:["Washing Machine","TV","Air Conditioners","Fan"],
                      Fashion:["Man","Women","Kids"],
                      Home:["Furniture","Kitchen","Bedroom"]
                    }
  const [typeArrSel,setTypeArrSel] = useState({});
  //handle PopUpBar here
  const [msg,setMsg] = useState('');
  const [action,setAction] = useState(false);
  const hablePopUpBar = (msg) =>{
    setMsg(msg);
    setAction(true);
  }
                    
  const handleChange = (event) => {
    let {id,name,value,checked} = event.target
    if(name == 'priceFilter'){
      setPriceFilter(value)
      dispatch(sortByPrice(value))
    }
    else if(name == 'priceSlider')
      setValue(value);
    else if(id == 'typeFilter'){
      dispatch(sortByFilter({sortBy:'Type',name,checked}))
    }
    else if(id == 'discount'){
      console.log(name,checked)
      dispatch(sortByFilter({sortBy:'Discount',name,checked}))
    }
  }
  const commitChangesSlider = (event,newValue) => {
    dispatch(sortByFilter({sortBy:'PriceMinMax',newValue}))
  }
  const marks = [
    {
      value: 1,
      label: 'Min',
    },
    {
      value: 30000,
      label: 'Max',
    },
  ]
  const valueLabelFormat = (value) =>{
    return `Rs.${value}`
  }
  const clearFilter = () => {
    setPriceFilter(0);setValue([1, 30000]);
    dispatch(clearFilterAll())
  }
  
  return (
    <>
     <div className="product">
        <div className="showfilter" onClick={()=>setShowHideFilter(!showFilter)}>
          {showFilter ? 
            <Button endIcon={<FilterAltOffIcon />}>Filter</Button>: <Button endIcon={<FilterAltIcon />}>Filter</Button>
          }
        </div>
        <div className="filter" style={{display:showFilter?'block':'none'}}>
          <Paper elevation={4}>
          <div className="f-filter">
            <div className='f-top-head'>
              <h2>Filter</h2>
              <span><Button variant="text" onClick={clearFilter} sx={redColor}>Clear all</Button></span>
            </div>
            <div className="f-order">
              <div className="f-heading">Order By: </div>
              <div className="f-item">
                <RadioGroup
                  aria-labelledby=""
                  name="priceFilter"
                  value={priceFilter}
                  onChange={handleChange}
                >
                <FormControlLabel value="1" control={<Radio  sx={redColor} />} label="Price: Low to High" />
                <FormControlLabel value="2" control={<Radio  sx={redColor} />} label="Price: High to Low" />
                </RadioGroup>
              </div>
            </div>
            <div className="f-price">
              <div className="f-heading">Price:</div>
              <div className="f-item">
                <Box sx={{ width: 200 }}>
                  <Slider
                    name='priceSlider'
                    getAriaLabel={() => 'Minimum distance'}
                    value={rangeValue}
                    min={1}
                    step={1}
                    max={30000}
                    onChange={handleChange}
                    onChangeCommitted={commitChangesSlider}
                    valueLabelDisplay="auto"
                    getAriaValueText={valueLabelFormat}
                    valueLabelFormat={valueLabelFormat}
                    marks={marks}
                    sx={redColor}
                  />
                </Box>
              </div>
            </div>
            <div className="f-brand">
              <div className="f-heading">{products.length != 0 ? products[0].category != 'Grocery' && products[0].category != 'Toys' ? 'Type:':'':''}</div>
              <div className="f-item">
                {products.length != 0 ? 
                  products[0].category != 'Grocery' && products[0].category != 'Toys' ?
                  typeArray[products[0].category].map((ele)=>
                    <FormControlLabel
                      name={ele}
                      value="end"
                      control={<Checkbox id='typeFilter' name={ele}  sx={redColor} />}
                      label={ele} 
                      labelPlacement="typeFilter"
                      onChange={handleChange}
                    />
                  ):""
                :""}
              </div>
            </div>
            <div className="f-discount">
              <div className="f-heading">Discount:</div>
              {products.length != 0 ? 
              <div className="f-item">
                <FormControlLabel
                  name='10'
                  value="end"
                  control={<Checkbox id='discount' sx={redColor} />}
                  label="10%"
                  labelPlacement=""
                  onClick={handleChange}
                />
                <FormControlLabel
                  name='20'
                  value="end"
                  control={<Checkbox id='discount' sx={redColor} />}
                  label="20%"
                  labelPlacement=""
                  onClick={handleChange}
                />
                <FormControlLabel
                  name='30'
                  value="end"
                  control={<Checkbox id='discount' sx={redColor} />}
                  label="30%"
                  labelPlacement=""
                  onClick={handleChange}
                />
              </div>:""}
            </div>
            </div>
          </Paper>
        </div>
        <div className="items">
          <div className="item-cover">
            <Paper>
              <div className="product-container">
                {products.length != 0 ? 
                products.map((ele)=><Product props={ele} hablePopUpBar={hablePopUpBar}/>) : 
                <div style={{margin:'200px'}}><Loader/></div>}
              </div>
            </Paper>
          </div>
        </div>
     </div>
     <PopUpBar msg={msg} action={action} />
     <div style={{paddingTop:"10px"}}>
      <Footer />
     </div>
    </>
  )
}

export default Products