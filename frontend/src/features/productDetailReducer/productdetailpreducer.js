import {PRODUCT_DETAIL_SUCCES,PRODUCT_DETAIL_FAIL,PRODUCT_DETAIL_REQUEST} from '../constance/productconstance'
export const productDetailReducer = (state = { product: { reviews: []} }, action ) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return {loading :true, ... state};
        case PRODUCT_DETAIL_SUCCES:
            return {loading :false, product : action.payload};
        case PRODUCT_DETAIL_FAIL:
            return {loading :false, error : action.payload};
        default :
            return state;
    } 

}