import axios from "axios"
import { CART_ADD_ITEM , CART_REMOVE_ITEM } from '../constance/productconstance'

export const addToCart = (id , qty)=>async (dispatch,getstate)=>{
    const { data }  =await axios.get(`/api/product/${id}`)
    console.log(data)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            price: data.price,
            stock: data.stock,
            image: data.image,
            qty
        }
        
    })

    
localStorage.setItem('cartItems', JSON.stringify(getstate().cart.cartItems))
}
export const removeFromCart =(id) => (dispatch,getstate)=> {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
})

      
    localStorage.setItem('cartItems',JSON.stringify(getstate().cart.cartItems ))



}