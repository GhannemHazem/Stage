import {PRODUCT_LIST_SUCCES,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST, 
    PRODUCT_DELETE_REQUEST, 
    PRODUCT_DELETE_SUCCES, 
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCES,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESTE,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCES,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESTE} 
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

export const adminProductCreate = (state = {}, action ) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return {loading :true };
        case PRODUCT_CREATE_SUCCES:
            return {loading :false, sucess:true, createproduct: action.payload };
        case PRODUCT_CREATE_FAIL:
            return {loading :false, error : action.payload};
        case PRODUCT_CREATE_RESTE:
            return {};
        default :
            return state;
    } 

}

export const adminProductUpdtae = (state = {Updateproduct:{}}, action ) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return {loading :true };
        case PRODUCT_UPDATE_SUCCES:
            return {loading :false, sucess:true, Updateproduct: action.payload };
        case PRODUCT_UPDATE_FAIL:
            return {loading :false, error : action.payload};
        case PRODUCT_UPDATE_RESTE:
            return {Updateproduct:{}};
        default :
            return state;
    } 

}