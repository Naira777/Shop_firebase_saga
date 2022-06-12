import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { fetchProductsStart } from '../../redux/Products/products.actions'
import FormSelect from '../forms/FormSelect'
import LoadMore from '../LoadMore'
import Product from './Product'
import './styles.scss'


const ProductResults = () => {
    
const  products  = useSelector(state => state.productsData.products)


const { data, queryDoc, isLastPage } = products


const dispatch = useDispatch();
const history = useHistory();
const { filterType } = useParams()

useEffect(() => {

    dispatch(fetchProductsStart({ filterType}))

}, [filterType])

const handleFilter = (e) => {
const nextFilter = e.target.value
history.push(`/search/${nextFilter}`)

}


if(!Array.isArray(data) )
return null

if(data.length < 1) {
    return (
        <div >
   
No search results.

    </div>
    )
}

const configFilters = {

  defaultValue: filterType,

  options: [{
      name: 'Show all',
      value: ''
  },
{
       name: 'Mens',
      value: 'mens'
    
},
{
      name: 'Womens',
      value: 'womens'
}
],

handleChange: handleFilter

}
const handleLoadMore = () => {
    
    dispatch(fetchProductsStart({ filterType,
         startAfterDoc: queryDoc,
        presistProducts: data
     }))


}
const configLoadMore = {
    onLoadMoreEvt: handleLoadMore
}

return (

 <div className="products"> 
    <h1>
        BROWSE PRODUCTS
        </h1>
        <FormSelect {...configFilters}/>
  <div className="productsResults"> 
  
  {data.map((product, pos)=> {

const {productThumbnail, productName, productPrice} = product


const configProduct = {
    ...product
}
    return (
        
     <Product {...configProduct}/>
    
    )
})}

    </div>
    {!isLastPage && (<LoadMore {...configLoadMore}/>)}
  
</div>
)
}

export default ProductResults