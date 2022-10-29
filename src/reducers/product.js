import { GETALLFOODS, GETFOOD } from "../constants/actionTypes";

const foodReducers = (state = {isLoading: true, products: []}, action) => {
    switch(action.type) {
        case GETALLFOODS:
            return {...state, products: action.data.result}
        case GETFOOD: {
            return {...state, products: [action.data.result]}
        }
        default:
            return state;
    }
}

export default foodReducers;