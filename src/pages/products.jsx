import {  Box, Button, Checkbox, FormControlLabel, Paper, Radio, RadioGroup, Slider } from '@mui/material';
import React ,{ useState }from 'react';
import { red } from '@mui/material/colors';
import Navbar from '../components/maincomponent/navbar'
import '../css/product.css';
import Product from '../components/maincomponent/product';

function valueLabelFormat(value){
  return `Rs.${value*10}`
}

function Products() {
  const redColor={ color: red[700],'&.Mui-checked': { color: red[700] } }
  const [value, setValue] = useState([200, 1000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const marks = [
    {
      value: 0,
      label: 'Min',
    },
    {
      value: 100,
      label: 'Max',
    },
  ]
  
  return (
    <>
    <Navbar/>
     <div className="product">
        <div className="filter">
          <Paper elevation={4}>
          <div className="f-filter">
            <div className='f-top-head'><h2>Filter</h2><span><Button variant="text" sx={redColor}>Clear all</Button></span></div>

            <div className="f-order">
              <div className="f-heading">Order By: </div>
              <div className="f-item">
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={1}
                  //onChange={handleChange}
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
                    getAriaLabel={() => 'Minimum distance'}
                    value={value}
                    min={500}
                    step={1}
                    max={3000}
                    onChange={handleChange}
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
              <div className="f-heading">Brands:</div>
              <div className="f-item">
                <FormControlLabel
                  value="end"
                  control={<Checkbox sx={redColor} />}
                  label="Moto"
                  labelPlacement="Moto"

                />
                <FormControlLabel
                  value="end"
                  control={<Checkbox sx={redColor} />}
                  label="Moto"
                  labelPlacement="Moto"
                />
                <FormControlLabel
                  value="end"
                  control={<Checkbox sx={redColor} />}
                  label="Moto"
                  labelPlacement="Moto"
                />
              </div>
            </div>
            <div className="f-discount">
              <div className="f-heading">Discount:</div>
              <div className="f-item">
                <FormControlLabel
                  value="end"
                  control={<Checkbox sx={redColor} />}
                  label="10%"
                  labelPlacement="Moto"
                />
                <FormControlLabel
                  value="end"
                  control={<Checkbox sx={redColor} />}
                  label="10%"
                  labelPlacement="Moto"
                />
                <FormControlLabel
                  value="end"
                  control={<Checkbox sx={redColor} />}
                  label="10%"
                  labelPlacement="Moto"
                />
              </div>
            </div>
            </div>
          </Paper>
        </div>
        <div className="items">
          <div className="item-cover">
            <Paper>
              <div className="product-container">
                <Product />
                <Product />
                <Product />
                <Product />
              </div>
            </Paper>
          </div>
        </div>
     </div>
    </>
  )
}

export default Products