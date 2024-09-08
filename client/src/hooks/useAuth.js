import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to get the current user from your backend or local storage
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('http://localhost:80/current-user', { withCredentials: true });
      if (response.data && response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching current user:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const loginWithGoogle = () => {
    // Redirect to Google OAuth endpoint
    window.location.href = 'http://localhost:80/auth/google';
  };

  const loginWithEmail = async (email, password) => {
    alert("Login with email and password");
    try {
      const response = await axios.post('http://localhost:80/auth/login', { email, password }, { withCredentials: true });
      if (response.data && response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Error signing in with email:", error.message);
    }

  };

  const registerWithEmail = async (email, password) => {
    alert('Signup clicked');
    try {
      const response = await axios.post('http://localhost:80/auth/signup', { email, password }, { withCredentials: true });
      if (response.data && response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Error registering with email:", error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:80/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return {
    user,
    loading,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout
  };
};

export default useAuth;
