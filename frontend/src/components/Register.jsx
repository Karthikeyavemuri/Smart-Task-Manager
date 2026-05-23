import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const AuthContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthCard = styled.div`
  background: var(--surface-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
  color: var(--text-primary);
  
  h2 {
    font-weight: 700;
    margin-bottom: 2rem;
    text-align: center;
  }
`;

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/auth/register`, {
        username,
        password
      });
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data || 'An error occurred during registration');
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <h2>Create Account</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required 
              style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border-color)' }}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border-color)' }}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mb-3" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none' }}>
            Register
          </Button>
          <div className="text-center">
            <span style={{ color: 'var(--text-secondary)' }}>Already have an account? </span>
            <Link to="/login" style={{ color: '#a855f7', textDecoration: 'none' }}>Login</Link>
          </div>
        </Form>
      </AuthCard>
    </AuthContainer>
  );
}

export default Register;
