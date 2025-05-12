import React, { useState } from 'react';
import loginUser from '../../api/loginUser'; // Adjust path as needed

interface LoginResponse {
  message: string;
  token: string;
}

function LoginArea() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    try {
      setIsLoading(true);
      const backendUrl = (import.meta as any).env.VITE_BACKEND_URL;
      
      if (!backendUrl) {
        throw new Error('Backend URL is not configured');
      }

      console.log('Attempting login with:', { email, password: '******' });
      
      const response = await loginUser(backendUrl, email, password);
      
      console.log('Login successful:', response.message);
      
      // Store the JWT token in localStorage
      localStorage.setItem('authToken', response.token);
      
      // Show success message and redirect or update app state
      alert('Login Successful!');
      
      // Optional: Redirect to dashboard or home page
      // window.location.href = '/dashboard';

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            minLength={8}
          />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginArea;