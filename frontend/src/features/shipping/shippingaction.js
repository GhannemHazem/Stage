
import { CART_SAVE_PAYMENT, 
    CART_SAVE_SHIPPING_ADDRESS } 
    from '../constance/productconstance'

export const saveShippingAddress =(data) => (dispatch)=> {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
})

      
    localStorage.setItem('shippingAddress',JSON.stringify(data))



}
export const savePayment =(data) => (dispatch)=> {
    dispatch({
        type: CART_SAVE_PAYMENT,
        payload: data,
})

      
    localStorage.setItem('paymentMehod',JSON.stringify(data))



}