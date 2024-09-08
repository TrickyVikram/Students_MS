import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Box, Alert } from '@mui/material';
// import useAuth from '../hooks/useAuth';
import useAuth from '../../hooks/useAuth';

import GoogleIcon from '@mui/icons-material/Google';

const Signup = () => {
  const { registerWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async () => {
    setLoading(true); // Set loading state before making the request
    setError(''); // Clear any previous errors
    setSuccess(''); // Clear any previous success messages


    try {
      await registerWithEmail(email, password);
      setSuccess('Signup successful!');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Signup failed: Something went wrong');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
          boxShadow: 3,
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Sign Up
        </Typography>
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSignup}
          disabled={loading}
        >
          Sign Up
        </Button>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
          href="http://localhost:80/auth/google" // Correct Google OAuth URL
          startIcon={<GoogleIcon />}
        >
          Sign up with Google
        </Button>
        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <Typography variant="body2">
              Already have an account? <a href="/login">Login</a>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Signup;
