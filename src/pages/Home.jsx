import ProductCard from "../components/ProductCard";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { Typography, Grow,Box } from "@mui/material";

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
    <Box sx={{ px: { xs: 2, sm: 3, md: 5 }, py: 3, maxWidth: '1440px', mx: 'auto'}}>
      <Typography
        variant="h3"
        sx={{
          color: 'black',
          fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
          mb: 3,
          textAlign: 'center'
        }}
      >
        🛍️🛍️Welcome to Prince's Discovery 
      </Typography>
      <Typography
        variant="h6"
        sx={{ color: 'black', mb: 4, textAlign: 'center' }}
      >
        Discover amazing products at unbeatable prices!
      </Typography>

      {loading && <Typography>Loading products...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={3}>
        {suggestions.length > 0 ? (
          suggestions.map((product, index) => (
            <Grow in={true} timeout={400 + index * 100} key={product.id}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} onAddToCart={onAddToCart} />
              </Grid>
            </Grow>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography textAlign="center">No matching products found.</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};



export default Home;
