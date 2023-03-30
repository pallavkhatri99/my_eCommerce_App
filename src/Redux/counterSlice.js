import { createSlice } from '@reduxjs/toolkit'
import { calFinPrice } from '../common'
const initialState = {
  value: 0,
  products:[],
  cartProduct:[],
  myFavProduct:[],
  dummyProduct:[],
  filter:[],
  typeProduct:[],
  discountOnProduct:[],
}


const activeUser_counterSlice = createSlice({
  name: 'activeUser',
  initialState,
  reducers: {
    login: (state) => {
      state.value = 1
    },
    logout: (state) => {
      state.value = 0
    },
  },
})
const products_counterSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state,actions) => {
      state.products = actions.payload
    },
    addToCartProduct: (state,actions) => {
      state.cartProduct.push(actions.payload)
    },
    removeFromCartProduct: (state,actions) => {
      let index = state.cartProduct.findIndex(ele=>ele._id == actions.payload._id)
        if(index != -1 )
          state.cartProduct.splice(index,1)
    },
    incDecQuantityPro: (state,actions) =>{
      let index = state.cartProduct.findIndex(ele=>ele._id == actions.payload.id)
      if(actions.payload.action == 'inc')
        state.cartProduct[index].quantity = state.cartProduct[index].quantity == undefined ? 2 : state.cartProduct[index].quantity + 1
      else
        state.cartProduct[index].quantity = state.cartProduct[index].quantity == 1 ? 1 : state.cartProduct[index].quantity - 1

    },
    addToMyFAvProduct: (state,action) => {
      state.myFavProduct.push(action.payload)
    },
    removeFromMyFavProduct: (state,actions) => {
      let index = state.myFavProduct.findIndex(ele=>ele._id == actions.payload._id)
        if(index != -1 )
          state.myFavProduct.splice(index,1)
    },
    sortByPrice: (state,actions) => {
      if(actions.payload == 1) //Price: Low to High
       state.products.sort((a,b)=> calFinPrice(a.price,a.discount) - calFinPrice(b.price,b.discount))
      else if(actions.payload == 2) //Price: High to Low
      state.products.sort((a,b)=> calFinPrice(b.price,b.discount) - calFinPrice(a.price,a.discount))
    },
    sortByPriceMinMax: (state,actions) => {
      let min = actions.payload[0]
      let max = actions.payload[1]
      if(state.dummyProduct.length==0)
        state.dummyProduct = state.products
      state.products = state.dummyProduct.filter(ele =>  +calFinPrice(ele.price,ele.discount) >= +min && +calFinPrice(ele.price,ele.discount) <= +max )
    },
    sortByType: (state,actions) => {
      if(state.dummyProduct.length==0)
        state.dummyProduct = state.products
      if(actions.payload.checked){
        state.typeProduct.push(actions.payload.name)
        state.products = state.dummyProduct.filter(ele => state.typeProduct.includes(ele.type))
      }
      else{
        let index = state.typeProduct.indexOf(actions.payload.name)
        if(index != -1 )
          state.typeProduct.splice(index,1)
          state.products = state.dummyProduct.filter(ele => !state.typeProduct.includes(ele.type))
      }
    },
    sortByDiscount: (state,actions) => {
      if(state.dummyProduct.length==0)
        state.dummyProduct = state.products
      if(actions.payload.checked){
        state.typeProduct.push(actions.payload.name)
        state.products = state.dummyProduct.filter(ele => state.discountOnProduct.includes(ele.discount))
      }
      else{
        let index = state.typeProduct.indexOf(actions.payload.name)
        if(index != -1 )
          state.typeProduct.splice(index,1)
          state.products = state.dummyProduct.filter(ele => !state.discountOnProduct.includes(ele.discount))
      }
    },
  },
})


export const { login, logout } = activeUser_counterSlice.actions
export const { setProduct, addToCartProduct, addToMyFAvProduct, sortByPrice, 
  sortByPriceMinMax,sortByType,sortByDiscount, removeFromMyFavProduct, removeFromCartProduct,
  incDecQuantityPro } = products_counterSlice.actions



export const activeUserReducer = activeUser_counterSlice.reducer 
export const productsReducer = products_counterSlice.reducer


