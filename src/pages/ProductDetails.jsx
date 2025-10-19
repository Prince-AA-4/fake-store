import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import axios from 'axios';

const ProductDetails = ({ onAddToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details.');
      }
    };
    fetchProduct();
  }, [id]);

  if (error) return <Typography variant="h6">{error}</Typography>;
  if (!product) return <Typography variant="h6">Loading product...</Typography>;

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="300"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: 'contain' }}
      />
      <CardContent>
        <Typography variant="h4" gutterBottom>{product.title}</Typography>
        <Typography variant="body1" gutterBottom><strong>Price:</strong> ${product.price}</Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Rating:</strong> ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
        </Typography>
        <Typography variant="body2" color="text.secondary">{product.description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCart />}
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductDetails;
