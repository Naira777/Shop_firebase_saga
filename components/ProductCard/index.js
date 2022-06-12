import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { addProduct } from "../../redux/Cart/cart.actions";
import { fetchProductStart, setProduct } from "../../redux/Products/products.actions";
import Button from "../forms/Button";
import './styles.scss'

const ProductCard = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory()

  const product = useSelector((state) => state.productsData.product);
  const { productName, productThumbnail, productPrice, productDesc } = product;
  const { productID } = useParams();

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    return () => {
        dispatch(setProduct({}))
    }
  }, []);

  const configAddToCartBtn = {
    type: "button",
  };

  const handleAddToCart = (product) => {

    if(!product) return

dispatch(addProduct(product))
history.push('/cart')


  }

  return (
    <div className="productCard">
      <div className="hero">
        <img src={productThumbnail} />
      </div>
      <div className="productDetails">
        <ul>
          <li>
            <h1>{productName}</h1>
          </li>

          <li>
            <span>${productPrice}</span>
          </li>


          <li>
            <span dangerouslySetInnerHTML= {{__html: productDesc}} />
          </li>

          <li>
            <div className="addToCart">
              <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}> Add to cart</Button>
            </div>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
