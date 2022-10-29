import { combineReducers } from 'redux';

import auth from "./auth"
import product from "./product"
import user from "./user"
import blog from "./blog"
import sponsor from "./sponsor"
import order from "./order"

export const reducers = combineReducers({ auth, product, user, blog, sponsor, order });