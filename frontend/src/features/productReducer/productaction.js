import {PRODUCT_LIST_SUCCES,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
     PRODUCT_DELETE_REQUEST,
     PRODUCT_DELETE_SUCCES,
     PRODUCT_DELETE_FAIL,
     PRODUCT_CREATE_REQUEST,
     PRODUCT_CREATE_SUCCES,
     PRODUCT_CREATE_FAIL,
     PRODUCT_UPDATE_REQUEST,
     PRODUCT_UPDATE_SUCCES,
     PRODUCT_UPDATE_FAIL,
     } from '../constance/productconstance'
import axios from 'axios'

export const listproducts = () => async(dispatch)=> {
    try {
        dispatch ({type:PRODUCT_LIST_REQUEST})
        const { data }  =await axios.get('/api/products')
        dispatch ({
            type: PRODUCT_LIST_SUCCES,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message 
            ?error.response.data.message  
            :error.message,
        })
        
    }

}

export const adminProductDelete = (id) => async(dispatch,getState)=> {
    try {
        dispatch ({type:PRODUCT_DELETE_REQUEST,
        })
        const { auth: {user}} =getState()

        const config ={
            headers:{ 
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.token}`

            }
        }
               await axios.delete(`/api/products/${id}`,config)
        dispatch ({
            type: PRODUCT_DELETE_SUCCES,
        })
       
    } catch (error) {
        dispatch({
            type:PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message 
            ?error.response.data.message  
            :error.message,
        })
        
    }

}
export const adminProductCreate = () => async(dispatch,getState)=> {
    try {
        dispatch ({type:PRODUCT_CREATE_REQUEST,
        })
        const { auth: {user}} =getState()

        const config ={
            headers:{ 
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.token}`

            }
        }
            const {data}=   await axios.post(`/api/products`,{},config)
        dispatch ({
            type: PRODUCT_CREATE_SUCCES,
            payload:data,
        })
       
    } catch (error) {
        dispatch({
            type:PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message 
            ?error.response.data.message  
            :error.message,
        })
        
    }

}
export const adminProductUpdate = (product) => async(dispatch,getState)=> {
    try {
        dispatch ({type:PRODUCT_UPDATE_REQUEST,
        })
        const { auth: {user}} =getState()

        const config ={
            headers:{ 
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.token}`

            }
        }
            const {data}=   await axios.put(`/api/products/${product._id}`,product,config)
        dispatch ({
            type: PRODUCT_UPDATE_SUCCES,
            payload:data,
        })
       
    } catch (error) {
        dispatch({
            type:PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message 
            ?error.response.data.message  
            :error.message,
        })
        
    }

}