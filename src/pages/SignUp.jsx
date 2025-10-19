import { Typography, Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const newUser = { name, email };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    navigate('/checkout');
  };

  return (
    <Box sx={{ p: 5, maxWidth: 400, margin: 'auto', mt: 10, backgroundColor: 'white', boxShadow: 7 }}>
      <Typography variant="h5" sx={{color:'black'}} gutterBottom>Create Account</Typography>

        <TextField label="Name" 
        fullWidth sx={{ mb: 2 }} 
        value={name} onChange={(e) => 
        setName(e.target.value)} />

        <TextField label="Email"
         fullWidth sx={{ mb: 2 }}
         value={email} 
        onChange={(e) => 
            setEmail(e.target.value)} 
        />

        <TextField label="Password" 
        type="password" 
        fullWidth sx={{ mb: 2 }} 
        value={password} 
        onChange={(e) => 
            setPassword(e.target.value)} 
        />

        <TextField label="Confirm Password" 
        type="password" 
        fullWidth sx={{ mb: 2 }} 
        value={confirmPassword} 
        onChange={(e) => 
        setConfirmPassword(e.target.value)} 
        />

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Button variant="contained" fullWidth onClick={handleSignup}>
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
