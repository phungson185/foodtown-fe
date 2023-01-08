import * as api from '../api';
import { GETALLUSERS, GETUSER, UPDATEUSER } from '../constants/actionTypes';

export const getAllUsers = async (dispatch) => {
  try {
    const { data } = await api.getAllUsers();
    dispatch({ type: GETALLUSERS, data });
  } catch (error) {
    console.log({ error });
  }
};
