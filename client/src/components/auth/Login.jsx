import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Box, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';
import useAuth from '../../hooks/useAuth';


const Login = () => {
  const { loginWithGoogle, loginWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true); // Set loading state before making the request
    setError(''); // Clear any previous errors
    setSuccess(''); // Clear any previous success messages

    try {
      await loginWithEmail(email, password);
      setSuccess('Login successful!');
      setTimeout(() => navigate('/dashboard'), 2000); // Redirect after 2 seconds
    } catch (err) {
      setError('Login failed: Something went wrong');
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
          Login
        </Typography>
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
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
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => loginWithGoogle()}
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <Typography variant="body2">
              Don't have an account? <a href="/register">Sign up</a>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
