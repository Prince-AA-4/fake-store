import { Card, CardContent, CardMedia, Typography, Button,  } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card sx={{
      height: 300,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      p: 3,
      width: 250,
      boxShadow: 3

    }}>
      <Link to={`/product-details/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        sx={{
          height: 100,
          objectFit: 'contain',
          mb: 2
        }}

      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" gutterBottom noWrap>{product.title}</Typography>
        <Typography variant="body2" color="text.secondary">${product.price}</Typography>
        <Typography variant="body2" color="text.secondary">⭐ {product.rating.rate} ({product.rating.count})</Typography>
      </CardContent>
      </Link>
      <Button variant="contained" onClick={() => onAddToCart(product)}>Add to Cart</Button>
    </Card>
  );
};

export default ProductCard;
