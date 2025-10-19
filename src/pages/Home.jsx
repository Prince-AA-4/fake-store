import ProductCard from "../components/ProductCard";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { Typography, Grow } from "@mui/material";

const Home = ({ searchTerm, onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('https://fakestoreapi.com/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions(products);
    } else if (searchTerm.length > 0) {
      setLoading(true);
      const filteredSuggestions = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
      setLoading(false);
    }
  }, [searchTerm, products]);

  return (
    <Grid container spacing={3} sx={{ p: 3 }} item xs={12}>
      <div className="home-container">
        <Typography variant="h3" sx={{ color: 'black' }}>
          🛍️🛍️Welcome to the FakeStore
        </Typography>
        {loading && <Typography>Loading products...</Typography>}
        {error && <Typography className="error">{error}</Typography>}
        <div className="product-grid">
          {suggestions.length > 0 ? (
            suggestions.map((product, index) => (
              <Grow in={true} timeout={400 + index * 100} key={product.id}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} onAddToCart={onAddToCart} />
                </Grid>
              </Grow>
            ))
          ) : (
            <Typography>No matching products found.</Typography>
          )}
        </div>
      </div>
    </Grid>
  );
};

export default Home;
