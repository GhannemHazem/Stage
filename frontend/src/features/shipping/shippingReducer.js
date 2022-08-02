import { CART_SAVE_PAYMENT, CART_SAVE_SHIPPING_ADDRESS } from '../constance/productconstance'


export const shippingReducer = (state = { }, action)=>{
    switch (action.type){
            case CART_SAVE_SHIPPING_ADDRESS:
                return{
                    ...state,
                    shippingAdress: action.payload
                }
                case CART_SAVE_PAYMENT:
                return{
                    ...state,
                    paymentMehod: action.payload
                }
             default: 
                return state
                }

            }