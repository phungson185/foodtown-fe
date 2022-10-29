import { LOGIN, LOGOUT, REAUTH, SIGNUP} from "../constants/actionTypes"

const authReducers = (state = {authData: null, role: null}, action) => {
    switch(action.type){
        case LOGIN: 
            return {...state, authData: action?.data?.result, role: action?.data?.result?.role};
        case REAUTH:
            localStorage.setItem('role', action?.data?.result?.role);
            return {...state, authData: action?.data?.result, role: action?.data?.result?.role};
        case LOGOUT: 
            return { ...state, authData: null };
        case SIGNUP:
            console.log(action);
            // localStorage.setItem('token', action?.data.token);
            console.log(document.cookie);
            return {...state, authData: action?.data};
        default: return state;
    }
}

export default authReducers;