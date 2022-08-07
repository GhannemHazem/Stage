import {PRODUCT_LIST_SUCCES,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
     PRODUCT_DELETE_REQUEST,
     PRODUCT_DELETE_SUCCES,
     PRODUCT_DELETE_FAIL} from '../constance/productconstance'
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