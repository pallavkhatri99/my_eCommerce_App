import { createSlice } from '@reduxjs/toolkit'
import { calFinPrice } from '../common'
const initialState = {
  server:'local',
  value: 0,
  isUserLogin : false,
  products:[],
  cartProduct:[],
  myFavProduct:[],
  dummyProduct:[],
  typeProduct:[],
  discountOnProduct:[],
  priceMin: 0,
  priceMax: 0,
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
    setLogInOut:(state,action) => {
      state.isUserLogin = action.payload
    }
  },
})
const products_counterSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state,actions) => {
      state.products = actions.payload
      state.dummyProduct = actions.payload
    },
    addToCartProduct: (state,actions) => {
      let index  = state.cartProduct.findIndex((ele)=> ele._id == actions.payload._id )
      if(index==-1)
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
      else{
        if(state.cartProduct[index].quantity != 1 && state.cartProduct[index].quantity != undefined)
          state.cartProduct[index].quantity = state.cartProduct[index].quantity == 1 ? 1 : state.cartProduct[index].quantity - 1
      }

    },
    addToMyFAvProduct: (state,actions) => {
      let index = state.myFavProduct.findIndex(ele=>ele._id == actions.payload._id)
      if(index == -1 )
        state.myFavProduct.push(actions.payload)
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
    sortByFilter: (state,actions) => { 
      let outProduct = state.dummyProduct
      if(actions.payload.sortBy == 'PriceMinMax') {
        state.priceMin = actions.payload.newValue[0]
        state.priceMax = actions.payload.newValue[1]
      }
      else if(actions.payload.sortBy == 'Type'){
        if(actions.payload.checked){
          state.typeProduct.push(actions.payload.name)
        }
        else{
          let index = state.typeProduct.indexOf(actions.payload.name)
          if(index != -1 ){
            state.typeProduct.splice(index,1)
          }
        }
      }
      else if(actions.payload.sortBy == 'Discount'){
        if(actions.payload.checked){
          state.discountOnProduct.push(actions.payload.name)

        }
        else{
          let index = state.discountOnProduct.indexOf(actions.payload.name)
          if(index != -1 )
            state.discountOnProduct.splice(index,1)
        }
      }
      outProduct = state.priceMin!=0 && state.priceMin!=0 ? outProduct.filter(ele =>  +calFinPrice(ele.price,ele.discount) >= +state.priceMin && +calFinPrice(ele.price,ele.discount) <= +state.priceMax ) : outProduct
      outProduct = state.typeProduct.length!=0 ? outProduct.filter(ele => state.typeProduct.includes(ele.type)) : outProduct
      outProduct = state.discountOnProduct.length!=0 ? outProduct.filter(ele => state.discountOnProduct.includes(ele.discount)) : outProduct
      state.products = outProduct;
    },
    clearFilterAll:(state,actions) => {
      state.typeProduct = []
      state.discountOnProduct = []
      state.priceMin = 0
      state.priceMax = 0
      state.products = state.dummyProduct
    },
  },
})


export const { login, logout, setLogInOut } = activeUser_counterSlice.actions
export const { setProduct, addToCartProduct, addToMyFAvProduct, sortByPrice, 
  sortByFilter, removeFromMyFavProduct, removeFromCartProduct,
  incDecQuantityPro,clearFilterAll } = products_counterSlice.actions



export const activeUserReducer = activeUser_counterSlice.reducer 
export const productsReducer = products_counterSlice.reducer


