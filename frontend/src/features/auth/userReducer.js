import { USER_DETAIL_FAIL,
      USER_DETAIL_REQUEST,
      USER_DETAIL_SUCCES, 
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