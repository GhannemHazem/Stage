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
      USER_UPDATE_ADMIN_RESET, 
      USER_UPDATE_ADMIN_SUCCES, 
      USER_UPDATE_FAIL, 
      USER_UPDATE_REQUEST, 
      USER_UPDATE_SUCCES } from '../constance/productconstance'
export const usertDetailReducer = (state = { userInfo:{} }, action ) => {
    switch (action.type) {
        case USER_DETAIL_REQUEST:
            return {loading :true , ... state};
        case USER_DETAIL_SUCCES:
            return {loading :false, userInfo : action.payload};
        case USER_DETAIL_FAIL:
            return {loading :false, error : action.payload};
            case USER_DETAIL_LOGOUT:
                return {loading: false ,userInfo: {}}
        default : 
            return state;
    } 

}

export const usertUpdateProfileReducer = (state = {}, action ) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return {loading :true };
        case USER_UPDATE_SUCCES:
            return {loading :false, sucess:true,userInfo : action.payload};
        case USER_UPDATE_FAIL:
            return {loading :false, error : action.payload};
        
        default :
            return state;
    } 

}

export const adminUserList = (state = {userslist:[]}, action ) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return {loading :true };
        case USER_LIST_SUCCES:
            return {loading :false, userslist : action.payload};
        case USER_LIST_FAIL:
            return {loading :false, error : action.payload};
        
        default :
            return state;
    } 

}

export const adminUserDelete = (state = {}, action ) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return {loading :true };
        case USER_DELETE_SUCCES:
            return {loading :false, sucess:true};
        case USER_DELETE_FAIL:
            return {loading :false, error : action.payload};
        default :
            return state;
    } 

}

export const AdminGetUserReducer = (state = {adminUser:{}}, action ) => {
    switch (action.type) {
        case USER_GET_USER_REQUEST:
            return {loading :true };
        case USER_GET_USER_SUCCES:
            return {loading :false,adminUser :action.payload};
        case USER_GET_USER_FAIL:
            return {loading :false, error : action.payload};
        default :
            return state;
    } 

}
export const AdminUpdateUserUserReducer = (state = {adminUpdateUser:{}}, action ) => {
    switch (action.type) {
        case USER_UPDATE_ADMIN_REQUEST:
            return {loading :true };
        case USER_UPDATE_ADMIN_SUCCES:
            return {loading :false,sucess:true};
        case USER_UPDATE_ADMIN_FAIL:
            return {loading :false, error : action.payload};
        case USER_UPDATE_ADMIN_RESET:
            return{adminUpdateUser:{}}
        default :
            return state;
    } 

}