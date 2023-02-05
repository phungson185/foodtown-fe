import * as api from '../api'
import { GET_ALL_PAYMENTS, CREATE_PAYMENT } from '../constants/actionTypes'

export const createPayment = (payment) => async (dispatch) => {
  try {
    const { data } = await api.createPayment(payment)
    dispatch({ type: CREATE_PAYMENT, data })
  } catch (error) {
    console.log({ error })
  }
}

export const getAllPayments = () => async (dispatch) => {
  try {
    const { data } = await api.getAllPayments()
    dispatch({ type: GET_ALL_PAYMENTS, data })
  } catch (error) {
    console.log({ error })
  }
}
