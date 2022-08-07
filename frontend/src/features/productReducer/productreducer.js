import {PRODUCT_LIST_SUCCES,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST, 
    PRODUCT_DELETE_REQUEST, 
    PRODUCT_DELETE_SUCCES, 
    PRODUCT_DELETE_FAIL} 
    from '../constance/productconstance'

export const productListReducer = (state = { products: [] }, action ) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading :true, products : []};
        case PRODUCT_LIST_SUCCES:
            return {loading :false, products : action.payload};
        case PRODUCT_LIST_FAIL:
            return {loading :false, error : action.payload};
        default :
            return state;
    } 

}

export const adminProductDelete = (state = {}, action ) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {loading :true };
        case PRODUCT_DELETE_SUCCES:
            return {loading :false, sucess:true};
        case PRODUCT_DELETE_FAIL:
            return {loading :false, error : action.payload};
        default :
            return state;
    } 

}