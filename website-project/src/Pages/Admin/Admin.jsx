import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const renderDashboard = () => (
    <div className="admin-dashboard">
      <h1>Karim Industries - Admin Dashboard</h1>
      <p>Manage your medical products and users</p>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Products Management</h3>
          <p>Manage your product catalog</p>
          <button onClick={() => setActiveTab('products')} className="btn">View Products</button>
          <button onClick={() => { resetForm(); setActiveTab('product-form'); }} className="btn">Add Product</button>
        </div>

        <div className="card">
          <h3>Users Management</h3>
          <p>Manage user accounts</p>
          <button onClick={() => setActiveTab('users')} className="btn">View Users</button>
        </div>

        <div className="card">
          <h3>Database Stats</h3>
          <p>Database information</p>
          <button onClick={() => setActiveTab('stats')} className="btn">View Stats</button>
        </div>

        <div className="card">
          <h3>API Health</h3>
          <p>Check system status</p>
          <button onClick={() => window.open('http://localhost:5000/api/health', '_blank')} className="btn">
            Check Health
          </button>
        </div>
      </div>
    </div>
  );

  const [productForm, setProductForm] = useState({
    id: null,
    name: '',
    title: '',
    description: '',
    features: '',
    sizes: '',
    usage: '',
    imageUrl: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    } else if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'stats') {
      fetchStats();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const reloadProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products/reload', {
        method: 'POST'
      });
      const data = await response.json();
      alert(data.message);
      fetchProducts(); // Refresh the products list
      fetchStats(); // Refresh stats
    } catch (error) {
      alert('Error reloading products');
      console.error('Error reloading products:', error);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          alert('Product deleted successfully');
          fetchProducts();
        } else {
          alert('Failed to delete product');
        }
      } catch (error) {
        alert('Error deleting product');
      }
    }
  };

  const resetForm = () => {
    setProductForm({
      id: null,
      name: '',
      title: '',
      description: '',
      features: '',
      sizes: '',
      usage: '',
      imageUrl: ''
    });
    setIsEditing(false);
    setMessage('');
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setProductForm({
      id: product.id,
      name: product.name || '',
      title: product.title || '',
      description: product.description || '',
      features: (product.features || []).join(', '),
      sizes: product.sizes || '',
      usage: (product.usage || []).join(', '),
      imageUrl: product.imageUrl || ''
    });
    setMessage(`Editing product ID ${product.id}`);
    setActiveTab('product-form');
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProductForm((prev) => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitProduct = async (event) => {
    event.preventDefault();

    const payload = {
      name: productForm.name,
      title: productForm.title,
      description: productForm.description,
      features: productForm.features.split(',').map((item) => item.trim()).filter(Boolean),
      sizes: productForm.sizes,
      usage: productForm.usage.split(',').map((item) => item.trim()).filter(Boolean),
      imageUrl: productForm.imageUrl
    };

    try {
      const response = await fetch(
        isEditing ? `http://localhost:5000/api/products/${productForm.id}` : 'http://localhost:5000/api/products',
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );

      if (response.ok) {
        alert(`Product ${isEditing ? 'updated' : 'added'} successfully`);
        resetForm();
        setActiveTab('products');
        fetchProducts();
      } else {
        alert(`Failed to ${isEditing ? 'update' : 'add'} product`);
      }
    } catch (error) {
      alert(`Error ${isEditing ? 'updating' : 'adding'} product`);
      console.error(error);
    }
  };
  <div className="admin-dashboard">
    <h1>Karim Industries - Admin Dashboard</h1>
    <p>Manage your medical products and users</p>

    <div className="dashboard-grid">
      <div className="card">
        <h3>Products Management</h3>
        <p>Manage your product catalog</p>
        <button onClick={() => setActiveTab('products')} className="btn">View Products</button>
        <button onClick={() => { resetForm(); setActiveTab('product-form'); }} className="btn">Add Product</button>
      </div>

      <div className="card">
        <h3>Users Management</h3>
        <p>Manage user accounts</p>
        <button onClick={() => setActiveTab('users')} className="btn">View Users</button>
      </div>

      <div className="card">
        <h3>Database Stats</h3>
        <p>Database information</p>
        <button onClick={() => setActiveTab('stats')} className="btn">View Stats</button>
      </div>

      <div className="card">
        <h3>API Health</h3>
        <p>Check system status</p>
        <button onClick={() => window.open('http://localhost:5000/api/health', '_blank')} className="btn">Check Health</button>
      </div>
    </div>
  </div>


  const renderProducts = () => (
    <div className="admin-products">
      <h1>Products Management</h1>
      <button onClick={() => setActiveTab('dashboard')} className="btn back-btn">← Back to Dashboard</button>

      <div className="actions">
        <button onClick={() => { resetForm(); setActiveTab('product-form'); }} className="btn">Add New Product</button>
        <button onClick={reloadProducts} className="btn reload-btn">Reload from Files</button>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.title}</td>
                <td>
                  <button onClick={() => handleEditProduct(product)} className="btn edit-btn">Edit</button>
                  <button onClick={() => deleteProduct(product.id)} className="btn delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  const renderUsers = () => (
    <div className="admin-users">
      <h1>Users Management</h1>
      <button onClick={() => setActiveTab('dashboard')} className="btn back-btn">← Back to Dashboard</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.phone || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderStats = () => (
    <div className="admin-stats">
      <h1>Database Statistics</h1>
      <button onClick={() => setActiveTab('dashboard')} className="btn back-btn">← Back to Dashboard</button>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Products</h3>
          <div className="stat-number">{stats.products || 0}</div>
        </div>
        <div className="stat-card">
          <h3>Total Users</h3>
          <div className="stat-number">{stats.users || 0}</div>
        </div>
        <div className="stat-card">
          <h3>Database Size</h3>
          <div className="stat-number">{stats.dbSize || 'N/A'}</div>
        </div>
      </div>
    </div>
  );

  const renderProductForm = () => (
    <div className="admin-add-product">
      <h1>{isEditing ? `Edit Product ID ${productForm.id}` : 'Add New Product'}</h1>
      <button onClick={() => setActiveTab('products')} className="btn back-btn">← Back to Products</button>
      {message && <p className="form-message">{message}</p>}

      <form className="product-form" onSubmit={handleSubmitProduct}>
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productForm.name}
            onChange={handleFormChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Product Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={productForm.title}
            onChange={handleFormChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={productForm.description}
            onChange={handleFormChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="features">Features (comma-separated):</label>
          <input
            type="text"
            id="features"
            name="features"
            value={productForm.features}
            onChange={handleFormChange}
            placeholder="Feature 1, Feature 2, Feature 3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sizes">Available Sizes:</label>
          <input
            type="text"
            id="sizes"
            name="sizes"
            value={productForm.sizes}
            onChange={handleFormChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="usage">Usage (comma-separated):</label>
          <input
            type="text"
            id="usage"
            name="usage"
            value={productForm.usage}
            onChange={handleFormChange}
            placeholder="Use case 1, Use case 2, Use case 3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Product Image URL:</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={productForm.imageUrl}
            onChange={handleFormChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUpload">Or Upload Image:</label>
          <input type="file" id="imageUpload" accept="image/*" onChange={handleImageUpload} />
        </div>

        {productForm.imageUrl && (
          <div className="form-group image-preview-group">
            <label>Image Preview:</label>
            <img src={productForm.imageUrl} alt="Preview" className="image-preview" />
          </div>
        )}

        <button type="submit" className="btn">{isEditing ? 'Update Product' : 'Add Product'}</button>
      </form>
    </div>
  );

  return (
    <div className="admin-container">
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'products' && renderProducts()}
      {activeTab === 'users' && renderUsers()}
      {activeTab === 'stats' && renderStats()}
      {activeTab === 'product-form' && renderProductForm()}
    </div>
  );
};

export default Admin;