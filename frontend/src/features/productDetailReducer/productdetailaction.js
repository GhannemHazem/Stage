import { PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCES } from "../constance/productconstance"
import axios from "axios"
export const listproductDetails = (id) => async(dispatch)=> {
    try {
        dispatch ({type:PRODUCT_DETAIL_REQUEST})
        const { data }  =await axios.get(`/api/products/${id}`)
        dispatch ({
            type: PRODUCT_DETAIL_SUCCES,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAIL_FAIL,
            payload: error.response && error.response.data.message 
            ?error.response.data.message  
            :error.message,
        })
        
    }

}