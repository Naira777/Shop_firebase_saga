import { takeLatest, call, all, put } from "redux-saga/effects";
import productsTypes from "./products.types";

import {
  auth,
 
} from "../../firebase/utils";
import { handleAddProduct, handleDeleteProduct, handleFetchProduct, handleFetchProducts } from "./products.helpers";
import { fetchProductsStart, fetchProductStart, setProduct, setProducts } from "./products.actions";



export function* addProduct( { payload }) {

  try {

const timestamp = new Date()

     yield handleAddProduct({ 
        ...payload,
        productAdminUserUID: auth.currentUser.uid,
        createdDate: timestamp
     })

 yield put(fetchProductsStart())// ays tox vor grum enq, henc add enq anum prodact, miangamic erevuma listum



  } catch (err) {
console.log(err)}

}



export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts( {payload}) {
 
  try{

    const products = yield handleFetchProducts( payload)
    yield put(setProducts(products))

  }catch(err){

  }


}


export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}


export function* deleteProduct( { payload} ) {
 
  try{

  yield handleDeleteProduct(payload)
  yield put(fetchProductsStart())

  }catch(err){

  }


}

export function* onDeleteProductStart() {
  yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}



export function* fetchProduct( { payload} ) {
 
  try{

   const product = yield handleFetchProduct(payload)
   yield put(setProduct(product))

  }catch(err){
  //console.log(err)
  }


}



export function* onFetchProductStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct);
}


export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart), 
     call(onDeleteProductStart),
     call(onFetchProductStart),
     ]);
}
