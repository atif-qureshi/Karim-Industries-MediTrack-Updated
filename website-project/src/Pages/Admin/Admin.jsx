import React, { useState, useEffect } from 'react';
import './Admin.css';
import AIDashboard from './AIDashboard.jsx';
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const renderDashboard = () => (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <span className="eyebrow">Admin Portal</span>
          <h1>Karim Industries Dashboard</h1>
          <p className="dashboard-description">
            A central admin experience with the same blue and purple palette used across the website.
          </p>
        </div>
        <div className="dashboard-actions">
          <button className="btn secondary" onClick={() => { resetForm(); setActiveTab('product-form'); }}>
            Add Product
          </button>
          {adminToken && (
            <button onClick={handleAdminLogout} className="btn outline">Logout</button>
          )}
        </div>
      </div>

      <div className="dashboard-summary-grid">
        <div className="summary-card">
          <p className="summary-label">Total Products</p>
          <strong>{stats.products || 0}</strong>
        </div>
        <div className="summary-card">
          <p className="summary-label">Total Users</p>
          <strong>{stats.users || 0}</strong>
        </div>
        {/* Removed Database Size and Live Status cards per request */}
      </div>

      <div className="dashboard-grid">
        <div className="card accent-left">
          <h3>Products Management</h3>
          <p>Browse and update the product catalog from a single dashboard.</p>
          <div className="card-actions">
            <button onClick={() => setActiveTab('products')} className="btn">View Products</button>
            <button onClick={() => { resetForm(); setActiveTab('product-form'); }} className="btn secondary">
              Add Product
            </button>
          </div>
        </div>

        <div className="card accent-left">
          <h3>Database Stats</h3>
          <p>Track current product and user metrics.</p>
          <button onClick={() => setActiveTab('stats')} className="btn">View Stats</button>
        </div>

        <div className="card accent-left">
          <h3>Users Management</h3>
          <p>Review user accounts and their roles easily.</p>
          <button onClick={() => setActiveTab('users')} className="btn">View Users</button>
        </div>

        <div className="card accent-left">
          <h3>Subscribers</h3>
          <p>View newsletter subscribers collected from the website footer.</p>
          <div className="card-actions">
            <button onClick={() => setActiveTab('subscribers')} className="btn">View Subscribers</button>
          </div>
        </div>

        <div className="card accent-left">
          <h3>Contact Messages</h3>
          <p>View and reply to all incoming contact form inquiries from customers.</p>
          <div className="card-actions">
            <button onClick={() => setActiveTab('contacts')} className="btn">View Messages</button>
            {contacts.filter(c => c.status === 'new').length > 0 && (
              <span className="badge-unread">{contacts.filter(c => c.status === 'new').length} new</span>
            )}
          </div>
        </div>

        <div className="card accent-left">
          <h3>AI Management</h3>
          <p>Manage the RAG knowledge base and monitor semantic embedding health.</p>
          <button onClick={() => setActiveTab('ai')} className="btn">Open AI Panel</button>
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
  const [adminUser, setAdminUser] = useState('admin_atif');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminToken, setAdminToken] = useState(() => window.localStorage.getItem('adminToken') || '');
  const [adminError, setAdminError] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    }

    if (activeTab === 'users') {
      fetchUsers();
    }

    if (activeTab === 'stats' || activeTab === 'dashboard') {
      fetchStats();
    }
    if (activeTab === 'subscribers') {
      fetchSubscribers();
    }
    if (activeTab === 'contacts' || activeTab === 'dashboard') {
      fetchContacts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/products`);
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
      const response = await fetch(`${API_BASE}/api/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/contactmessages`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch contact messages');
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/subscribers`);
      const data = await response.json();
      setSubscribers(data);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
  };

  const deleteSubscriber = async (email) => {
    // Attempt direct deletion without prompting. If a secret is available
    // (build-time or stored), include it. Backend will allow unprotected
    // deletes in development or when configured.
    const buildSecret = process.env.REACT_APP_ADMIN_SECRET;
    const stored = window.localStorage.getItem('adminSecret');
    const secret = buildSecret || stored || null;

    try {
      const headers = { 'Content-Type': 'application/json' };
      // Prefer bearer token if logged in
      const token = window.localStorage.getItem('adminToken') || null;
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (secret) headers['x-admin-secret'] = secret;

      const res = await fetch(`${API_BASE}/api/subscribers`, {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        return alert(err.message || 'Failed to delete subscriber');
      }

      setSubscribers((prev) => prev.filter((s) => s.email !== email));
      alert('Subscriber deleted');
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      alert('Error deleting subscriber');
    }
  };

  const sendContactReply = async () => {
    if (!selectedContact || !replyText.trim()) {
      return alert('Please enter a reply message.');
    }

    try {
      const response = await fetch(`${API_BASE}/api/contactmessages/${selectedContact._id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ reply: replyText.trim() }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to send reply.');
      }

      alert('Reply sent successfully.');
      setReplyText('');
      setSelectedContact(null);
      fetchContacts();
    } catch (error) {
      console.error('Error sending reply:', error);
      alert(error.message || 'Unable to send reply.');
    }
  };

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    setReplyText(contact.reply || '');
  };

  const handleClearContactSelection = () => {
    setSelectedContact(null);
    setReplyText('');
  };

  const handleAdminLogin = async (ev) => {
    ev && ev.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminUser, password: adminPassword })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err && err.message ? err.message : 'Login failed';
        setAdminError(msg);
        return;
      }
      const data = await res.json();
      if (data && data.token) {
        window.localStorage.setItem('adminToken', data.token);
        setAdminToken(data.token);
        setAdminPassword('');
        setAdminError('');
        // show a small confirmation
        setTimeout(() => { window.location.href = '/admin'; }, 150);
      }
    } catch (err) {
      console.error('Admin login error:', err);
      setAdminError('Login error');
    }
  };

  const handleAdminLogout = () => {
    window.localStorage.removeItem('adminToken');
    setAdminToken('');
    alert('Logged out');
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/stats`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const reloadProducts = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/products/reload`, {
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
        const response = await fetch(`${API_BASE}/api/products/${id}`, {
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
        isEditing ? `${API_BASE}/api/products/${productForm.id}` : `${API_BASE}/api/products`,
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

  const renderProducts = () => (
    <div className="admin-products">
      <div className="section-header">
        <div>
          <span className="eyebrow">Products Management</span>
          <h1>Product Catalog</h1>
          <p className="dashboard-description">
            Review catalog items, edit product details, and keep your inventory up to date.
          </p>
        </div>
        <div className="section-actions">
          <button onClick={() => { resetForm(); setActiveTab('product-form'); }} className="btn secondary">Add New Product</button>
          <button onClick={reloadProducts} className="btn reload-btn">Reload from Files</button>
          <button onClick={() => setActiveTab('dashboard')} className="btn outline">Back to Dashboard</button>
        </div>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="table-wrap">
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
        </div>
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

  const renderSubscribers = () => (
    <div className="admin-subscribers">
      <h1>Newsletter Subscribers</h1>
      <button onClick={() => setActiveTab('dashboard')} className="btn back-btn">← Back to Dashboard</button>

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Subscribed At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((s, idx) => (
            <tr key={idx}>
              <td>{s.email}</td>
              <td>{s.subscribedAt || 'N/A'}</td>
              <td>
                <button onClick={() => deleteSubscriber(s.email)} className="btn delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderContacts = () => (
    <div className="admin-contacts">
      <div className="section-header">
        <div>
          <span className="eyebrow">Contact Messages</span>
          <h1>Contact Form Submissions</h1>
          <p className="dashboard-description">
            Manage incoming contact inquiries and reply directly to users from the admin panel.
          </p>
        </div>
        <div className="section-actions">
          <button onClick={() => { handleClearContactSelection(); setActiveTab('dashboard'); }} className="btn outline">Back to Dashboard</button>
          <button onClick={fetchContacts} className="btn secondary">Refresh</button>
        </div>
      </div>

      {loading ? (
        <p>Loading messages...</p>
      ) : contacts.length === 0 ? (
        <p>No contact messages have been received yet.</p>
      ) : (
        <div className="contacts-grid">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Country</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact._id}>
                    <td>{contact.Name}</td>
                    <td>{contact.Email}</td>
                    <td>{contact.Company}</td>
                    <td>{contact.Country}</td>
                    <td>{contact.Phone}</td>
                    <td>{contact.status || 'new'}</td>
                    <td>{new Date(contact.createdAt).toLocaleString()}</td>
                    <td>
                      <button onClick={() => handleSelectContact(contact)} className="btn">Reply</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card contact-reply-card">
            {selectedContact ? (
              <>
                <h3>Reply to {selectedContact.Name}</h3>
                <p><strong>Email:</strong> {selectedContact.Email}</p>
                <p><strong>Message:</strong></p>
                <div className="contact-message-box">{selectedContact.Message}</div>
                <textarea
                  className="reply-textarea"
                  rows="8"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply here"
                />
                <div className="form-actions-row">
                  <button onClick={sendContactReply} className="btn">Send Reply</button>
                  <button onClick={handleClearContactSelection} className="btn outline">Cancel</button>
                </div>
              </>
            ) : (
              <div className="contact-placeholder">
                <h3>Select a message to reply</h3>
                <p>Click any inquiry in the table to view the full message and send a reply email directly from the admin panel.</p>
              </div>
            )}
          </div>
        </div>
      )}
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
        {/* Database Size removed per request */}
      </div>
    </div>
  );

  const renderProductForm = () => {
    return (
    <div className="admin-add-product">
      <h1>{isEditing ? `Edit Product ID ${productForm.id}` : 'Add New Product'}</h1>
      <button onClick={() => setActiveTab('products')} className="btn back-btn">← Back to Products</button>
      {message && <p className="form-message">{message}</p>}

      <div className="card product-card">
      <form className="product-form" onSubmit={handleSubmitProduct}>
        <div className="form-grid">
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

        <div className="form-group full-width">
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
            <div className="form-group image-preview-group full-width">
              <label>Image Preview:</label>
              <img src={productForm.imageUrl} alt="Preview" className="image-preview" />
            </div>
          )}

        </div>

        <div className="form-actions-row">
          <button type="submit" className="btn">{isEditing ? 'Update Product' : 'Add Product'}</button>
          <button type="button" onClick={() => { resetForm(); setActiveTab('products'); }} className="btn outline">Cancel</button>
        </div>
      </form>
      </div>
    </div>
    );
  };

  if (!adminToken) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card">
          <h1>Admin Login</h1>
          <p className="lead">Sign in to access the admin panel and manage products and subscribers.</p>
          {adminError && <div className="admin-login-error">{adminError}</div>}
          <form onSubmit={handleAdminLogin} className="admin-login-form-large">
            <input autoFocus type="text" placeholder="Admin username" value={adminUser} onChange={(e) => setAdminUser(e.target.value)} />
            <input type="password" placeholder="Password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
            <div className="admin-login-actions">
              <button type="submit" className="btn">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'products' && renderProducts()}
      {activeTab === 'users' && renderUsers()}
      {activeTab === 'subscribers' && renderSubscribers()}
      {activeTab === 'stats' && renderStats()}
      {activeTab === 'contacts' && renderContacts()}
      {activeTab === 'ai' && <AIDashboard token={adminToken} />}
      {activeTab === 'product-form' && renderProductForm()}
    </div>
  );
};

export default Admin;
