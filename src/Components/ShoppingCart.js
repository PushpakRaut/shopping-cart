import React, { useContext, useState } from "react";
import useFetch from "./useFetch";
import styles from "./Shopping.module.css";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { productContext } from "../App";
import Alert from "./Alert";

const ShoppingCart = () => {
  const [products, setProducts] = useFetch();

  const [isAlertVisible, setIsAlertisible] = useState(false)

  const cart = useContext(productContext);

  const handleClick = (id) => {
    const filteredProduct = products.find(product => product.id === id)
    if(!filteredProduct) return;

    const isInCart = cart.cartProducts.some(product => product.id === id)

    if(isInCart) {
      cart.setCartProducts(prevCart => 
        prevCart.map(product => 
          product.id === id
            ? {...product, count: product.count + 1}
          : product
        )
      );
    } else {
      cart.setCartProducts(prevCart => [...prevCart, filteredProduct])
    }

    setIsAlertisible(true)

    setTimeout(()=>{
      setIsAlertisible(false)
    },2000)

  };
  

  const handleWish = (id) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          return { ...product, isWish: !product.isWish };
        }
        return product;
      })
    );
  };

  return (
    <div className={styles.main}>
      {products?.map((product) => {
        return (
          <div key={product.id} className={styles.card}>
            <div className={styles.card_img}>
              <img src={product.image} alt="product_image" />
              <div
                className={styles.wish_icon}
                onClick={() => handleWish(product.id)}
              >
                {product.isWish ? <FaHeart /> : <FaRegHeart />}
              </div>
            </div>
            <div className={styles.card_title}>
              <p className={styles.card_name}>{product.title}</p>
              <p>$ {product.price}</p>
            </div>
            <div className={styles.card_description}>
              <p>{product.description}</p>
            </div>
            <div className={styles.rating}>
              <p className={styles.rate}>
                Rating: {product.rating.rate}/5.0 ({product.rating.count})
              </p>
            </div>
            <button
              className={styles.addToCart}
              onClick={() => handleClick(product.id)}
            >
              Add To Cart
            </button>
          </div>
        );
      })}
      <div className={styles.alert}>
      {isAlertVisible && <Alert />}
      </div>
    </div>
  );
};

export default ShoppingCart;
