import * as api from "../api";
import { GETALLSPONSORS } from "../constants/actionTypes";

export const getAllSponsors = () => async (dispatch) => {
    try {
        const {data} = await api.getAllSponsors();
        dispatch({ type: GETALLSPONSORS, data });
    } catch (error) {
        console.log({error});
    }
}