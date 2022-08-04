import { USER_DETAIL_FAIL, 
    USER_DETAIL_LOGOUT, 
    USER_DETAIL_REQUEST,
     USER_DETAIL_SUCCES,
      USER_UPDATE_FAIL,
      USER_UPDATE_REQUEST, 
      USER_UPDATE_SUCCES} from "../constance/productconstance"
import axios from "axios"

export const UserDetails = (id) => async(dispatch,getState)=> {
    try {
        dispatch ({type:USER_DETAIL_REQUEST,
        })
        const { auth: {user}} =getState()

        const config ={
            headers:{ 
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.token}`

            }
        }
        const { data }  =await axios.get(`/api/users/${id}`,config)
        dispatch ({
            type: USER_DETAIL_SUCCES,
            payload: data,
        })
      
    } catch (error) {
        dispatch({
            type:USER_DETAIL_FAIL,
            payload: error.response && error.response.data.message 
            ?error.response.data.message  
            :error.message,
        })
        
    }

}

export const logoutinfo =() => async(dispatch) =>{
    dispatch ({
        type: USER_DETAIL_LOGOUT,
        payload: localStorage.removeItem('userInfo'),
    })
}

export const UpdateUserProfile = (users) => async(dispatch,getState)=> {
    try {
        dispatch ({type:USER_UPDATE_REQUEST,
        })
        const { auth: {user}} =getState()

        const config ={
            headers:{ 
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.token}`

            }
        }
        const { data }  =await axios.put(`/api/users/profile`,users,config)
        dispatch ({
            type: USER_UPDATE_SUCCES,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type:USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message 
            ?error.response.data.message  
            :error.message,
        })
        
    }

}