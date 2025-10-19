import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Box, Typography, TextField, Button} from '@mui/material';

const Login = ({ setUser, loginIntent }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const fromCheckout = loginIntent === 'checkout' || location.state?.from?.pathname === '/checkout';

  const handleLogin = () => {
    const newUser = { name, email };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    navigate(fromCheckout ? '/checkout' : '/');
  };

  return (
    <Box sx={{ p: 10, maxWidth: 400, margin: 'auto', mt: 15, backgroundColor: 'white', boxShadow: 7 }}>
      <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
        {fromCheckout ? 'Login to Continue Checkout' : 'Login or Register'}
      </Typography>
      <TextField label="Name" fullWidth sx={{ mb: 2 }} value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Email" fullWidth sx={{ mb: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button variant="contained" fullWidth onClick={handleLogin}>
        {fromCheckout ? 'Continue to Checkout' : 'Login'}
      </Button>
      {!fromCheckout && (
        <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={() => navigate('/signup')}>
          Sign Up
        </Button>
      )}
      {!fromCheckout && (
        <Typography variant="body2" sx={{ mt: 2, color:'black' }} >
          Don't have an account? <strong>Sign up</strong>
        </Typography>
      )}
    </Box>
  );
};

export default Login;
