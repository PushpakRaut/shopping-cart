import { useEffect, useState } from "react";

const useFetch = () => {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products") || "[]")
  );

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("products"))) {
      fetch("https://fakestoreapiserver.reactbd.com/amazonproducts")
        .then((res) => res.json())
        .then((data) =>
          setProducts(
            data.map((product) => {
              return { ...product, isWish: false, count: 1 };
            })
          )
        );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);
  return [products, setProducts];
};

export default useFetch;
