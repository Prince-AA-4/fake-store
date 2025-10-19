import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, Email } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f5f5f5',
        color: 'black',
        py: 4,
        px: 2,
        mt: 5,
        borderTop: '1px solid #ddd',
        textAlign: 'center'
      }}
    >
      <Typography variant="h6" gutterBottom>
        🛍️ FakeStore
      </Typography>

      <Typography variant="body2" sx={{ mb: 2 }}>
        Your one-stop shop for everything fake but fabulous.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
        <Link href="/" underline="hover">Home</Link>
        <Link href="/shop" underline="hover">Shop</Link>
        <Link href="/admin" underline="hover">Admin</Link>
        <Link href="/contact" underline="hover">Contact</Link>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
        <IconButton href="https://facebook.com" target="_blank"><Facebook /></IconButton>
        <IconButton href="https://twitter.com" target="_blank"><Twitter /></IconButton>
        <IconButton href="https://instagram.com" target="_blank"><Instagram /></IconButton>
        <IconButton href="mailto:support@fakestore.com"><Email /></IconButton>
      </Box>

      <Typography variant="caption" display="block" sx={{ mt: 2 }}>
        &copy; {new Date().getFullYear()} FakeStore. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
