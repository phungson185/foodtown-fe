import { GETALLUSERS } from '../constants/actionTypes'

const userReducers = (state = { users: null }, action) => {
  switch (action.type) {
    case GETALLUSERS:
      return { ...state, users: action?.data?.result }
    default:
      return state
  }
}

export default userReducers
