import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./Navbar.module.css";
import { productContext } from "../App";

const Navbar = () => {
  const cart = useContext(productContext);
  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.logo_wrapper}>
          <p>ShopCart</p>
        </div>
        <div className={styles.links_wrapper}>
          <Link to="/">Home</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>
        <div className={styles.search_cart_wrapper}>
          <div className={styles.search_wrapper}>
            <input
              type="text"
              placeholder="Search Product"
              className={styles.search_input}
            />
            <div className={styles.search_icon}>
              <FaSearch />
            </div>
          </div>
          <div className={styles.cart_wrapper}>
            <Link to="/cart">
              <div className={styles.cart_icon}>
                <FaShoppingCart />
                <p className={styles.cart_number}>{cart.cartProducts.length}</p>
              </div>
              Cart
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
