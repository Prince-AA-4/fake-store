import { Box, Typography, Divider, CardMedia } from '@mui/material';

const OrderSummary = ({ checkedOutItems }) => {
  const trackingId = Math.floor(Math.random() * 1000000000);

  return (
    <Box sx={{ p: 3, backgroundColor: 'white', mt: 5, color: 'black', maxWidth: 700, margin: 'auto'}}>
      <Typography variant="h4" gutterBottom>Order Confirmed 🎉</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Your order has been placed successfully. Estimated delivery: <strong>3–5 business days</strong>.
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Tracking ID: <strong>{trackingId}</strong>
      </Typography>
      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>Order Summary:</Typography>
      {checkedOutItems.map(item => (
        <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CardMedia
            component="img"
            image={item.image}
            alt={item.title}
            sx={{ width: 80, height: 200, objectFit: 'contain', mr: 2 }}
          />
          <Box>
            <Typography variant="body1">{item.title}</Typography>
            <Typography variant="body2">Quantity: {item.quantity}</Typography>
            <Typography variant="body2" color="primary">Subtotal: ${(item.price * item.quantity).toFixed(2)}</Typography>
          </Box>
        </Box>
      ))}

      <Divider sx={{ my: 3 }} />
      <Typography variant="body2">
        You’ll receive updates via email or SMS as your order progresses.
      </Typography>
    </Box>
  );
};

export default OrderSummary;
