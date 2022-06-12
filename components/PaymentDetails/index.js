import React, { useEffect, useState } from 'react'
import FormInput from '../forms/FormInput'
import './styles.scss'
import { CountryDropdown } from 'react-country-region-selector'
//import { CardElement ,useStripe, useElements} from '@stripe/react-stripe-js'
import Button from '../forms/Button'
import { apiInstance } from '../../Utiles'
import { selectCartTotal, selectCartItemsCount, selectCartItems } from './../../redux/Cart/cart.selectors'
import {createStructuredSelector } from 'reselect'
import {useDispatch, useSelector } from 'react-redux'
import {clearCart} from './../../redux/Cart/cart.actions'
import { useHistory } from 'react-router-dom'
import { saveOrderHistory } from './../../redux/Orders/orders.actions'


const initialAddressState = {
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
}

const mapState = createStructuredSelector({
    total: selectCartTotal,
    itemCount: selectCartItemsCount,
    cartItems: selectCartItems,
})

const PaymentDetails = ({}) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { total, itemCount, cartItems } = useSelector(mapState)

//const elements = useElements()
//const stripe = useStripe()

const [billingAddress, setBillingAddress] = useState({...initialAddressState})
const [shippingAddress, setShippingAddress] = useState({...initialAddressState})
const [recipientName, setRecipientName] = useState('')
const [nameOnCard, setNameOnCard] = useState('')


useEffect(() => {

if(itemCount < 1)
history.push('/dashboard')



},[itemCount])




const handleFormSubmit = async e => {

    e.preventDefault()
   // console.log('paymentIntent')

    //const cardElement = elements.getElement('card')

    if  (!shippingAddress.line1 || !shippingAddress.city ||
        !shippingAddress.state || !shippingAddress.postal_code
        || !shippingAddress.country || !billingAddress.line1 || !billingAddress.city 
        || !billingAddress.state || !billingAddress.country || !billingAddress.postal_code
        || !recipientName || !nameOnCard)
        {
            return
        }

/*
    apiInstance.post('/payments/create', {
        amount: total * 100,
        shipping: {
            name: recipientName,
            address: {
                ...shippingAddress
            }
        }
    }).then(({ data: clientSecret}) => { 

        stripe.createPaymentMethod({

            type: 'card',
            card: cardElement,
            billing_details: {
                name: nameOnCard,
                address: {
                    ...billingAddress
                }
            }
        }).then(({ paymentMethod }) => {

            stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id
            })
            .then( ({ paymentIntent } ) => {


                const configOrder = {

                  orderTotal: total,
                  orderItems: cartItems.map(item => {

                      const {documentID, productThumbnail, productName, 
                        productPrice, quantity} = item

                        return {
                            documentID,
                            productPrice,
                            productThumbnail,
                            productName,
                            quantity
                        }
                  })
                }

                 dispatch(saveOrderHistory(configOrder) )
                   
                console.log(paymentIntent)
                
            })
        })

    })
*/


}

const handleShipping = e => {

    const {name, value } = e.target
    setShippingAddress({
        ...shippingAddress,
        [name]: value
    })
}

const handleBilling = e => {

    const {name, value } = e.target
    setBillingAddress({
        ...billingAddress,
        [name]: value
    })
}

const configCardElement = {
    iconStyle: 'solid',
        style: {
        base: {
            fontSize: '16px'
        }
    },
    hidePostalCode: true
}



    return (
        <div className="paymentDetails">

       <form onSubmit={handleFormSubmit}>
        <div className="group"> <h2>Shipping Address </h2>
        
        
        <FormInput placeholder="Recipient Name" 
        required
        name="recipientName"
        type="text"
        value={recipientName}
        handleChange={e => setRecipientName(e.target.value)} />
        
        <FormInput placeholder="Line 1" 
         required
        name="line1"
        type="text"
        value={shippingAddress.line1} 
        handleChange={e => handleShipping(e)} 
        />
        
        <FormInput placeholder="Line 2"
        name="line2"
        value={shippingAddress.line2} 
        type="text"
        handleChange={e => handleShipping(e)} />
        
        <FormInput placeholder="City"
         required 
           name="city"
        value={shippingAddress.city}
        type="text" 
        handleChange={e => handleShipping(e)}
        />
        
        <FormInput placeholder="State"
         required
        name="state"
        value={shippingAddress.state} 
        type="text" 
        handleChange={e => handleShipping(e)}
        />
        
        <FormInput placeholder="Postal Code" 
         required
        name="postal_code"
        value={shippingAddress.postal_code}
        type="text" 
        handleChange={e => handleShipping(e)}/>
        
       <div className="formRow checkoutInput">

        <CountryDropdown 
        value={shippingAddress.country}
        required
        valueType="short"
        onChange={val => handleShipping({
            target: {
                name: 'country',
                value: val
            }
        })}
        
        />
        </div>

        </div>

        <div className="group"> <h2>Billing Address </h2>
        
        <FormInput placeholder="Name on Card"
         required
           name="Name on Card"
        value={nameOnCard} 
        type="text"
        handleChange={e => setNameOnCard(e.target.value)}
         />
        
        <FormInput placeholder="Line 1"
         required
         handleChange={e => handleBilling(e)}
           name="line1"
        value={billingAddress.line1} 
        type="text" />
        
        <FormInput placeholder="Line 2"
         handleChange={e => handleBilling(e)}
           name="line2"
        value={billingAddress.line2} 
        type="text" />
        
        <FormInput placeholder="City"
         required
         handleChange={e => handleBilling(e)}
           name="city"
        value={billingAddress.city} 
        type="text" />
        
        <FormInput placeholder="State"
         required
         handleChange={e => handleBilling(e)}
           name="state" 
        value={billingAddress.state}
        type="text" />
        
        <FormInput placeholder="Postal Code"
         required
         handleChange={e => handleBilling(e)}
           name="postal_code"
        value={billingAddress.postal_code} 
        type="text" />

     
       <div className="formRow checkoutInput">
        <CountryDropdown
         required 
        value={billingAddress.country}
        valueType="short"
        onChange={val => handleBilling({
            target: {
                name: 'country',
                value: val
            }
        })}
        
        
        />
        </div>

        </div>

        <div className="group"> <h2>Card Details </h2>
        
    {   // <CardElement 
        //    options={configCardElement}
    //    />
    }

        </div>

        <Button 
        type ="submit"> Pay Now </Button>


           </form>

          </div>
    )
}

export default PaymentDetails