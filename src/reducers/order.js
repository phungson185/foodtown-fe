import { GET_ALL_ORDERS_BY_USER } from "../constants/actionTypes";

const orderReducers = (state = {isLoading: true, orders: []}, action) => {
    switch(action.type) {
        case GET_ALL_ORDERS_BY_USER:
            return {...state, orders: action.data.result}
        default:
            return state;
    }
}

export default orderReducers;