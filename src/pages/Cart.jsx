import { Drawer, Box, Typography, Divider, List, ListItem, IconButton, Button } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import {Link } from 'react-router-dom'

export const CartDrawer = ({ open, onClose, cartItems, onUpdateQuantity, onRemoveItem, searchTerm }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 2 , backgroundColor:'white', zIndex:1300}}>
        <Typography variant="h5" gutterBottom>Shopping Cart</Typography>
        <Divider sx={{ mb: 2 }} />

        {cartItems.length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
            🛒 Your cart is empty
          </Typography>
        ) : (
          <>
            <List>
              {cartItems.map((item) => (
                <ListItem key={item.id} sx={{ flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', width: '100%', mb: 1 }}>
                    <img src={item.image} alt={item.title} style={{ width: 60, height: 60, objectFit: 'contain' }} />
                    <Box sx={{ ml: 2, flexGrow: 1 }}>
                      <Typography variant="body2" noWrap>{item.title}</Typography>
                      <Typography variant="h6" color="primary">${item.price}</Typography>
                    </Box>
                    <IconButton size="small" onClick={() => onRemoveItem(item.id)} aria-label="Remove item">
                      <Delete />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      size="small"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Remove />
                    </IconButton>
                    <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Add />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="primary">${total.toFixed(2)}</Typography>
            </Box>
            
              <Button
                variant="contained"
                fullWidth
                size="large"
                disabled={cartItems.length === 0}
                component={Link}
                to={'/checkout'}
              >
                Checkout
              </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
};
