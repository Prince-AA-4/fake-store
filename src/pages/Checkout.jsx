import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Divider, CardMedia, Grow } from '@mui/material';

const Checkout = ({ cartItems, setCartItems, setCheckedOutItems }) => {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirmOrder = () => {
    setCheckedOutItems(cartItems); // Save cart
    setTimeout(() => {
      setCartItems([]);
      navigate('/order-summary');
    }, 100);
  };

  return (
    <Box sx={{
      p: 3,
      backgroundColor: 'white',
      maxWidth: 600, margin: 'auto',
      mt: 5,
      borderRadius: 2,
      boxShadow: 3,
      color: 'black'
    }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <Divider sx={{ mb: 2 }} />

      {cartItems.map((item, index) => (
        <Grow in={true} timeout={400 + index * 100} key={item.id}>
          <Box sx={{ mb: 2 }}>
            <CardMedia
              component='img'
              height='200'
              image={item.image}
              alt={item.title}
              sx={{ objectFit: 'contain', p: 2 }}
            />
            <Typography>{item.title} x {item.quantity}</Typography>
            <Typography color="primary">${(item.price * item.quantity).toFixed(2)}</Typography>
          </Box>
        </Grow>
      ))}

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={handleConfirmOrder}
        disabled={cartItems.length === 0}
      >
        Confirm Order
      </Button>
      {cartItems.length === 0 && (
        <>
          <Typography sx={{ mt: 2 }} color="text.secondary">
            Your cart is empty. Add items to proceed.
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigate('/')}
          >
            Go Home
          </Button>
      </>
      )}
    </Box>
  );
};

export default Checkout;
