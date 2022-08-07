import { USER_DELETE_FAIL,
     USER_DELETE_REQUEST,
      
      USER_DELETE_SUCCES,
       USER_DETAIL_FAIL, 
    USER_DETAIL_LOGOUT, 
    USER_DETAIL_REQUEST,
     USER_DETAIL_SUCCES,
      USER_GET_USER_FAIL,
      USER_GET_USER_REQUEST,
      USER_GET_USER_SUCCES,
      USER_LIST_FAIL,
      USER_LIST_REQUEST,
      USER_LIST_SUCCES,
      USER_UPDATE_ADMIN_FAIL,
      USER_UPDATE_ADMIN_REQUEST,
      USER_UPDATE_ADMIN_SUCCES,
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
        const { data }  =await axios.get(`/api/users/profile/${id}`,config)
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

export const adminUserList = () => async(dispatch,getState)=> {
    try {
        dispatch ({type:USER_LIST_REQUEST,
        })
        const { auth: {user}} =getState()

        const config ={
            headers:{ 
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.token}`

            }
        }
        const { data }  =await axios.get(`/api/users/userslist`,config)
        dispatch ({
            type: USER_LIST_SUCCES,
            payload: data,
        })
       
    } catch (error) {
        dispatch({
            type:USER_LIST_FAIL,
            payload: error.response && error.response.data.message 
            ?error.response.data.message  
            :error.message,
        })
        
    }

}



export const adminUserDelete = (id) => async(dispatch,getState)=> {
    try {
        dispatch ({type:USER_DELETE_REQUEST,
        })
        const { auth: {user}} =getState()

        const config ={
            headers:{ 
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.token}`

            }
        }
        const { data }  =await axios.delete(`/api/users/${id}`,config)
        dispatch ({
            type: USER_DELETE_SUCCES,
        })
       
    } catch (error) {
        dispatch({
            type:USER_DELETE_FAIL,
            payload: error.response && error.response.data.message 
            ?error.response.data.message  
            :error.message,
        })
        
    }

}

export const adminGetUser = (id) => async(dispatch,getState)=> {
    try {
        dispatch ({type:USER_GET_USER_REQUEST,
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
            type: USER_GET_USER_SUCCES,
            payload: data,
        })
       
    } catch (error) {
        dispatch({
            type:USER_GET_USER_FAIL,
            payload: error.response && error.response.data.message 
            ?error.response.data.message  
            :error.message,
        })
        
    }

}

export const adminUpdateUser = (userb) => async(dispatch,getState)=> {
    try {
        dispatch ({type:USER_UPDATE_ADMIN_REQUEST,
        })
        const { auth: {user}} =getState()

        const config ={
            headers:{ 
                'Content-Type':'application/json',
                Authorization:`Bearer ${user.token}`

            }
        }
        const { data }  =await axios.put(`/api/users/${userb._id}`,userb,config)
        dispatch ({
            type: USER_UPDATE_ADMIN_SUCCES,
            payload: data,
        })
       
    } catch (error) {
        dispatch({
            type:USER_UPDATE_ADMIN_FAIL,
            payload: error.response && error.response.data.message 
            ?error.response.data.message  
            :error.message,
        })
        
    }

}