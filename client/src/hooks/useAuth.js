import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New error state

  // Function to get the current user from your backend or local storage
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('http://localhost:80/current-user', { withCredentials: true });
      if (response.data && response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      setError("Error fetching current user"); // Set error state
      console.error("Error fetching current user:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:80/auth/google'; // Redirect to Google OAuth endpoint
  };

  const loginWithEmail = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:80/auth/login', { email, password }, { withCredentials: true });
      if (response.data && response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      setError("Error signing in with email"); // Set error state
      console.error("Error signing in with email:", error.message);
    }
  };

  const registerWithEmail = async (email, password, name) => {
    try {
      const response = await axios.post('http://localhost:80/auth/signup', { email, password, name }, { withCredentials: true });
      if (response.data && response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      setError("Error registering with email"); // Set error state
      console.error("Error registering with email:", error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:80/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      setError("Error signing out"); // Set error state
      console.error("Error signing out:", error.message);
    }
  };

  return {
    user,
    loading,
    error, // Expose error state
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout
  };
};

export default useAuth;

