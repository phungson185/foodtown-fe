import * as api from "../api";
import { SIGNUP, LOGIN, LOGOUT, REAUTH } from "../constants/actionTypes";
import { ADMIN } from "../constants/role";

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({
            type: SIGNUP,
            data
        });
        navigate("/");
    } catch (error) {
        console.log(error);
    }
}

export const login = (formData, isLoginAsAdmin, navigate) => async (dispatch) => {
    try {
        const {data} = await api.login(formData, isLoginAsAdmin);
        dispatch({
            type: LOGIN,
            data
        });
        document.cookie = `token=${data.result.token}; expired=`;
        if (data?.result?.role === ADMIN) {
            navigate("/admin");
        } else {
            navigate("/");
        }
    } catch (error) {
        console.log(error);
    }
}

export const getUser = () => async (dispatch) => {
    try {
        const { data } = await api.getUser();
        dispatch({ type: REAUTH, data })
    } catch (error) {
        console.log({error});
    }
}

export const logout = () => async (dispatch) => {
    try {
        await api.logout();
        document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        dispatch({
            type: LOGOUT
        })
    } catch (error) {
        
    }
}