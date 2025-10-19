import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Typography, TextField, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper
} from '@mui/material';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('https://fakestoreapi.com/products');
        setProducts(data);
      } catch (error) {
        setMessage('❌ Failed to load products');
      }
    };
    fetchProducts();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update product
  const handleSubmit = async () => {
    const payload = {
      title: form.title,
      price: parseFloat(form.price),
      description: form.description,
      image: form.image,
      category: form.category
    };

    try {
      if (editingId) {
        const { data } = await axios.put(`https://fakestoreapi.com/products/${editingId}`, payload);
        setMessage(`✅ Updated: ${data.title}`);
      } else {
        const { data } = await axios.post('https://fakestoreapi.com/products', payload);
        setMessage(`✅ Added: ${data.title}`);
      }
      setForm({ title: '', price: '', description: '', image: '', category: '' });
      setEditingId(null);
    } catch (error) {
      setMessage('❌ Error saving product');
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setMessage(`🗑️ Deleted product ${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      setMessage('❌ Error deleting product');
    }
  };

  // Start editing
  const handleEdit = (product) => {
    setForm({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category
    });
    setEditingId(product.id);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{color: 'black'}}>🛠️ Admin Dashboard</Typography>

      <Box sx={{ mb: 4, p: 3, backgroundColor: 'white', boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h6">{editingId ? 'Update Product' : 'Add New Product'}</Typography>
        <TextField 
          label="Title" 
          name="title" 
          fullWidth sx={{ mb: 2 }} 
          value={form.title} 
          onChange={handleChange} 
        />

        <TextField 
          label="Price" 
          name="price" 
          fullWidth sx={{ mb: 2 }} 
          value={form.price} 
          onChange={handleChange} 
        />

        <TextField 
          label="Description" 
          name="description" 
          fullWidth sx={{ mb: 2 }} 
          value={form.description} 
          onChange={handleChange} 
        />

        <TextField 
          label="Image URL" 
          name="image" 
          fullWidth sx={{ mb: 2 }} 
          value={form.image} 
          onChange={handleChange} 
        />

        <TextField 
          label="Category" 
          name="category" 
          fullWidth sx={{ mb: 2 }} 
          value={form.category} 
          onChange={handleChange} 
        />
        <Button variant="contained" onClick={handleSubmit}>
          {editingId ? 'Update Product' : 'Add Product'}
        </Button>
        {message && <Typography sx={{ mt: 2, color:'black' }}>{message}</Typography>}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleEdit(product)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(product.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminDashboard;
