import {combineReducers} from 'redux'
import productsReducer from './Products/products.reducer'
import {persistReducer} from 'redux-persist'
import userReducer from './User/user.reducer'
import cartReducer from  './Cart/cart.reducer'
import storage from 'redux-persist/lib/storage'
import ordersReducer from './Orders/orders.reducer'


export const rootReducer = combineReducers({
    user: userReducer,
    productsData: productsReducer,
    cartData: cartReducer,
    ordersData: ordersReducer,
})

const configStorage = {
    key: 'root',
    storage,
    whitelist: ['cartData']  // cartData persist enq anum
}
export default persistReducer(configStorage, rootReducer)