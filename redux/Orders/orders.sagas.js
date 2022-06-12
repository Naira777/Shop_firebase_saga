import {takeLatest, put, call, all} from 'redux-saga/effects'
import { auth } from '../../firebase/utils'
import { clearCart } from '../Cart/cart.actions'
import { handleGetOrder, handleGetUserOrderHistory, handleSaveOrder } from './orders.helpers'
import ordersTypes from './orders.types'
import {setOrderDetails, setUserOrderHistory} from './orders.actions'











export function* getUserOrderHistory( { payload }) {

try {
 
    const history = yield  handleGetUserOrderHistory(payload)
    yield put( setUserOrderHistory(history))

} catch(err){

    console.log(err)
}

}



export function* onGetUserOrderHistoryStart () {


    yield takeLatest(ordersTypes.GET_USER_ORDER_HISTORY_START,getUserOrderHistory )
}




export function* saveOrder({ payload }) {

try{
    const timestamp = new Date()
    
 yield handleSaveOrder({
     ...payload,
     orderUserID: auth.currentUser.uid,
     orderCreatedDate: timestamp
})
 yield put(clearCart())


}catch(err){
//console.log(err)
}

}


export function* onSaveOrderHistoryStart() {

 yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START,saveOrder )

}


export function* getOrderDetails ({ payload: orderID }) {

    try{
       

        const order = yield handleGetOrder(orderID)
       
       yield put(setOrderDetails(order))
    
    }catch(err){
    //console.log(err)
    }
    
    }


export function* onGetOrderDetailsStart() {

 yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails )

}



export default function* ordersSagas() {
    yield all([
        call(onSaveOrderHistoryStart),
        call(onGetUserOrderHistoryStart),
        call(onGetOrderDetailsStart),
    ])
}