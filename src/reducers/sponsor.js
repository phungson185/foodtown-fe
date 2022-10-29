import { GETALLSPONSORS } from "../constants/actionTypes";

const sponsorReducers = (state = {isLoading: true, sponsors: []}, action) => {
    switch(action.type) {
        case GETALLSPONSORS:
            return {...state, sponsors: action.data.result}
        default:
            return state;
    }
}

export default sponsorReducers;