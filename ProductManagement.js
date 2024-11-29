import React, { useState, useEffect } from 'react';
import './ProductManagement.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({
    id: null,
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
  });
  const [transaction, setTransaction] = useState({
    productId: null,
    quantity: '',
  });
  const [sale, setSale] = useState({
    productId: null,
    quantity: '',
  });

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  };

  const handleTransactionChange = (e) => {
    const { name, value } = e.target;
    setTransaction({
      ...transaction,
      [name]: value,
    });
  };

  const handleSaleChange = (e) => {
    const { name, value } = e.target;
    setSale({
      ...sale,
      [name]: value,
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name: productDetails.name,
      description: productDetails.description,
      category: productDetails.category,
      price: parseFloat(productDetails.price),
      quantity: parseInt(productDetails.quantity),
    };

    setProducts([...products, newProduct]);
    resetFormFields();
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    setProducts(
      products.map((product) =>
        product.id === productDetails.id ? productDetails : product
      )
    );
    resetFormFields();
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleStockTransaction = (e) => {
    e.preventDefault();
    const { productId, quantity } = transaction;

    setProducts(
      products.map((product) => {
        if (product.id === parseInt(productId)) {
          return {
            ...product,
            quantity: Math.max(0, product.quantity + parseInt(quantity)),
          };
        }
        return product;
      })
    );

    resetTransactionFields();
  };

  const handleSaleTransaction = (e) => {
    e.preventDefault();
    const { productId, quantity } = sale;
    const qtyToSell = parseInt(quantity);

    setProducts(
      products.map((product) => {
        if (product.id === parseInt(productId)) {
          const newQuantity = Math.max(0, product.quantity - qtyToSell);
          return {
            ...product,
            quantity: newQuantity,
          };
        }
        return product;
      })
    );

    resetSaleFields();
  };

  const resetFormFields = () => {
    setProductDetails({
      id: null,
      name: '',
      description: '',
      category: '',
      price: '',
      quantity: '',
    });
  };

  const resetTransactionFields = () => {
    setTransaction({
      productId: null,
      quantity: '',
    });
  };

  const resetSaleFields = () => {
    setSale({
      productId: null,
      quantity: '',
    });
  };

  const startEditing = (product) => {
    setProductDetails(product);
  };

  return (
    <div className="product-management-container">
      <h2>Product Management</h2>

      {/* Product Form */}
      <form
        className="product-management-form"
        onSubmit={productDetails.id ? handleUpdateProduct : handleAddProduct}
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productDetails.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={productDetails.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={productDetails.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productDetails.price}
          onChange={handleChange}
          required
          step="0.01"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Initial Quantity"
          value={productDetails.quantity}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {productDetails.id ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Product List */}
      <div className="product-list-container">
        <h3>Current Products</h3>
        <ul className="product-list">
          {products.length ? (
            products.map((product) => (
              <li key={product.id}>
                <div>
                  <strong>{product.name}</strong> - {product.category}
                </div>
                <div>{product.description}</div>
                <div>
                  ${product.price.toFixed(2)} | Quantity: {product.quantity}
                </div>
                <div>
                  <button onClick={() => startEditing(product)}>Edit</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li>No products available.</li>
          )}
        </ul>
      </div>

      {/* Stock Transactions */}
      <div className="chart-container">
        <h3>Stock Transactions</h3>
        <form onSubmit={handleStockTransaction}>
          <select
            name="productId"
            value={transaction.productId}
            onChange={handleTransactionChange}
            required
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity to add/deduct"
            value={transaction.quantity}
            onChange={handleTransactionChange}
            required
          />
          <button type="submit">Adjust Stock</button>
        </form>
      </div>

      {/* Sales Transactions */}
      <div className="chart-container">
        <h3>Sales Transactions</h3>
        <form onSubmit={handleSaleTransaction}>
          <select
            name="productId"
            value={sale.productId}
            onChange={handleSaleChange}
            required
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity Sold"
            value={sale.quantity}
            onChange={handleSaleChange}
            required
          />
          <button type="submit">Sell Product</button>
        </form>
      </div>
    </div>
  );
};

export default ProductManagement;
