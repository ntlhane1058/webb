import React, { useState, useEffect } from 'react';
import api from '../api';
import './ProductForm.css';

const ProductForm = ({ editingProduct, onSave, onCancel }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    if (editingProduct) setProduct(editingProduct);
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiCall = editingProduct
      ? api.put(`/products/update/ M{editingProduct.id}`, product)
      : api.post('/products/add', product);

    apiCall.then(() => {
      onSave();
    }).catch(error => console.error('Error saving product:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>

      <div className="form-group">
        <label>Name:</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Description:</label>
        <input type="text" name="description" value={product.description} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Category:</label>
        <input type="text" name="category" value={product.category} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Price:</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Quantity:</label>
        <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-save">Save</button>
        {editingProduct && <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>}
      </div>
    </form>
  );
};

export default ProductForm;
