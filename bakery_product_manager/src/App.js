
import { useState, useEffect } from 'react';
import {
  get_products,
  save_products,
} from './api/fetch';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [saving, setSaving] = useState(false);

  // Load products from the JSON file through the API
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await get_products();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Check the API server.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Save the updated products to the JSON file
  async function persistProducts(updatedProducts) {
    setSaving(true);
    setSaveMessage('');

    try {
      await save_products(updatedProducts);
      setProducts(updatedProducts);
      setSaveMessage('Products saved successfully!');
      setError('');
      return true;
    } catch (err) {
      setSaveMessage('Failed to save products. Please try again.');
      return false;
    } finally {
      setSaving(false);
    }
  }

  // Add a new product or update an existing product
  async function handleAdd(e) {
    e.preventDefault();

    const cleanName = name.trim();
    const numericPrice = Number(price);

    if (!cleanName || price === '' || !Number.isFinite(numericPrice) || numericPrice < 0) {
      setSaveMessage('Please enter a valid product name and price.');
      return;
    }

    let updatedProducts;

    if (editId !== null) {
      updatedProducts = products.map((item, index) =>
        (item.id ?? index) === editId
          ? {
              ...item,
              name: cleanName,
              price: numericPrice,
            }
          : item
      );
    } else {
      const newProduct = {
        id: Date.now(),
        name: cleanName,
        price: numericPrice,
      };

      updatedProducts = [...products, newProduct];
    }

    const saved = await persistProducts(updatedProducts);

    if (saved) {
      setName('');
      setPrice('');
      setEditId(null);
    }
  }

  // Select a product to edit
  function handleEdit(item, index) {
    setEditId(item.id ?? index);
    setName(item.name);
    setPrice(String(item.price).replace('$', ''));
    setSaveMessage('');
  }

  // Delete a product
  async function handleDelete(item, index) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.name}"?`
    );

    if (!confirmed) return;

    const id = item.id ?? index;

    const updatedProducts = products.filter(
      (product, productIndex) =>
        (product.id ?? productIndex) !== id
    );

    await persistProducts(updatedProducts);

    // If the deleted product was being edited, reset the form
    if ((item.id ?? index) === editId) {
      resetForm();
    }
  }

  // Cancel editing or clear the form
  function resetForm() {
    setEditId(null);
    setName('');
    setPrice('');
    setSaveMessage('');
  }

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return (
      <div className="App">
        <h1>Bakery Product Manager</h1>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Bakery Product Manager</h1>

      {saveMessage && (
        <p role="status" aria-live="polite">
          {saveMessage}
        </p>
      )}

      {products.length === 0 && (
        <p>No products found. Add your first product below.</p>
      )}

      <div className="product-list">
        {products.map((item, index) => (
          <div
            className="product-row"
            key={item.id ?? index}
          >
            <span className="name">{item.name}</span>

            <span className="price">
              ${Number(
                String(item.price).replace('$', '')
              )}
            </span>

            <button
              type="button"
              onClick={() => handleEdit(item, index)}
              disabled={saving}
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => handleDelete(item, index)}
              disabled={saving}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleAdd} className="add-form">
        <h2>
          {editId !== null ? 'Edit Product' : 'Add Product'}
        </h2>

        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={saving}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          step="1"
          required
          disabled={saving}
        />

        <button type="submit" disabled={saving}>
          {saving
            ? 'Saving...'
            : editId !== null
              ? 'Update Product'
              : 'Add Product'}
        </button>

        {editId !== null && (
          <button
            type="button"
            onClick={resetForm}
            disabled={saving}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default App;
