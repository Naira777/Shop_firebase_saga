import React from "react";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartItems, selectCartTotal } from "../../redux/Cart/cart.selectors";
import Button from "../forms/Button";
import Item from "./Item";
import "./styles.scss";
import { useHistory } from 'react-router-dom'

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

const Checkout = ({}) => {
  const { cartItems, total } = useSelector(mapState);

  const history = useHistory();

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="cart">
        {cartItems.length > 0 ? (
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <table
                className="checkoutHeader"
                border="0"
                cellPadding="10"
                cellSpacing="0"
              >
                <tbody>
                  <tr>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Remove</th>
                  </tr>
                </tbody>
              </table>
            </tr>

            <tr>
              <table border="0" cellPadding="0" cellSpacing="10">
                <tbody>
                  {cartItems.map((item, pos) => {
                    return (
                      <tr key={pos}>
                        <td><Item {...item}/></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </tr>

            <tr>
              <table align="left" border="0" cellPadding="0" cellSpacing="10">
                <tbody>
                  <tr align="left">
                    <td>
                      {" "}
                      <h3>Total: ${total}</h3>
                    </td>
                  </tr>
                  <tr>
                    <table border="0" cellPadding="0" cellSpacing="10">
                      <tbody>
                        <tr>
                          <td>
                            <Button onClick={() => history.goBack()}>Continue Shopping </Button>
                          </td>

                          <td>
                            <Button onClick={()=> history.push('/payment')}>Checkout </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </tr>
                </tbody>
              </table>
            </tr>
          </tbody>
        </table>
        ) :
        <p> You have no items in your cart. </p> }
      </div>
    </div>
  );
};

export default Checkout;
