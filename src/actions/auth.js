import * as api from "../api";
import { SIGNUP, LOGIN, LOGOUT, REAUTH } from "../constants/actionTypes";
import { ADMIN } from "../constants/role";

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        console.log(data)
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
        dispatch({
            type: LOGOUT
        })
    } catch (error) {
        
    }
}