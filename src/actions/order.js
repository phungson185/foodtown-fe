import * as api from "../api";
import { GET_ALL_ORDERS_BY_USER, CREATE_ORDER } from "../constants/actionTypes";

export const createOrder = (order) => async (dispatch) => {
    try {
        const {data} = await api.createOrder(order);
        console.log(order);
        dispatch({ type: CREATE_ORDER, data });
    } catch (error) {
        console.log({error});
    }
}

export const getAllOrdersByUser = () => async (dispatch) => {
    try {
        const {data} = await api.getAllOrdersByUser();
        dispatch({ type: GET_ALL_ORDERS_BY_USER, data });
    } catch (error) {
        console.log({error});
    }
}