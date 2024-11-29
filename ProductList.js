// src/components/ProductList.js
import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div>
      <h3>Available Products</h3>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>Category: {product.category}</p>
              <p>Price: M {product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
