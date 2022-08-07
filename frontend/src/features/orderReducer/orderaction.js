import {ORDER_CREATE_SUCCES,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCES,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCES,
    ORDER_PAY_FAIL,
    MY_ORDER_LIST_REQUEST,
    MY_ORDER_LIST_SUCCES,
    MY_ORDER_LIST_FAIL

} from '../constance/productconstance'
import axios from 'axios'

export const createOrder = (order) => async(dispatch,getState)=> {
    try {
        dispatch ({type:ORDER_CREATE_REQUEST,
        })
        const { auth: {user}} =getState()

        const config ={
            headers:{ 
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.token}`

            }
        }
        const { data }  =await axios.post(`/api/order`,order,config)
        dispatch ({
            type: ORDER_CREATE_SUCCES,
            payload: data,
        })
      
    } catch (error) {
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message 
            ?error.response.data.message  
            :error.message,
        })
        
    }

}
export const detailorder = (id) => async(dispatch,getState)=> {
    try {
        dispatch ({type:ORDER_DETAILS_REQUEST,
        })
        const { auth: {user}} =getState()

        const config ={
            headers:{ 
                
                Authorization:`Bearer ${user.token}`

            }
        }
        const { data }  =await axios.get(`/api/order/${id}`,config)
        dispatch ({
            type: ORDER_DETAILS_SUCCES,
            payload: data,
        })
      
    } catch (error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
            ?error.response.data.message  
            :error.message,
        })
        
    }

}


export const payorder = (orderId, paymentResult) => async(dispatch,getState)=> {
    try {
        dispatch ({type:ORDER_PAY_REQUEST,
        })
        const { auth: {user}} =getState()

        const config ={
            headers:{ 
                'Content-Type': 'application/json',
                Authorization:`Bearer ${user.token}`,

            }
        }
        const { data }  =await axios.put(`/api/order/${orderId}/pay`,paymentResult,config)
        dispatch ({
            type: ORDER_PAY_SUCCES,
            payload: data,
        })
      
    } catch (error) {
        dispatch({
            type:ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message 
            ?error.response.data.message  
            :error.message,
        })
        
    }

}

export const ListMyorders = () => async(dispatch,getState)=> {
    try {
        dispatch ({type:MY_ORDER_LIST_REQUEST,
        })
        const { auth: {user}} =getState()

        const config ={
            headers:{ 
                'Content-Type': 'application/json',
                Authorization:`Bearer ${user.token}`,

            }
        }
        const { data }  =await axios.get(`/api/order/myorders`,config)
        dispatch ({
            type: MY_ORDER_LIST_SUCCES,
            payload: data,
        })
      
    } catch (error) {
        dispatch({
            type:MY_ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message 
            ?error.response.data.message  
            :error.message,
        })
        
    }

}



