import React, { useContext } from "react";
import { productContext } from "../App";
import styles from "./Cart.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useContext(productContext);
  const { cartProducts, setCartProducts } = cart;

  let sumTotal = 0;
  const handleIncrement = (id) => {
    setCartProducts(
      cartProducts.map((product) => {
        if (product.id === id) {
          return { ...product, count: product.count + 1 };
        }
        return product;
      })
    );
  };

  const handleDecrement = (id) => {
    setCartProducts(
      cartProducts.map((product) => {
        if (product.id === id && product.count > 0) {
          return { ...product, count: product.count - 1 };
        }
        return product;
      }).filter(product => product.count !== 0)
    );
  };

  return (cartProducts.length) ? (
    <div className={styles.main}>
      <h2>Your Shopping Cart:</h2>
      {cartProducts?.map((product) => {
        sumTotal += Number((product.price * product.count).toFixed(2));
        return (product) ? (
          <div key={product.id} className={styles.cart_wrapper}>
            <div className={styles.cart_item}>
              <div className={styles.item_img}>
                <img src={product.image} alt="cart_item_image" />
              </div>
              <div className={styles.item_title}>
                <p>{product.title}</p>
                <p>Ref: {product.id}</p>
              </div>
              <div className={styles.item_counter}>
                <button
                  className={styles.increment}
                  onClick={() => handleIncrement(product.id)}
                >
                  +
                </button>
                <p>{product.count}</p>
                <button
                  className={styles.decrement}
                  onClick={() => handleDecrement(product.id)}
                >
                  -
                </button>
              </div>
              <div className={styles.price}>
                <p>$ {Number((product.price * product.count).toFixed(2))}</p>
              </div>
            </div>
          </div>
        ) : "";
      })}
      <div className={styles.total}>
        <div className={styles.backToShop}>
          <Link to="/">
            <FaArrowLeftLong />
            Back To Shop
          </Link>
        </div>
        <div className={styles.subTotal}>
          <p className={styles.TotalLabel}>subTotal:</p>
          <p className={styles.amount}>$ {sumTotal ? sumTotal.toFixed(2) : 0}</p>
        </div>
      </div>
    </div>
  ) : <div className={styles.empty_cart}><h2>Your Cart is Empty!</h2></div>;
};

export default Cart;
