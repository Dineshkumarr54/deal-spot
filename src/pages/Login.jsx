import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>🔐 Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Login</button>
        <p style={styles.linkText}>
          Don’t have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    backgroundColor: '#f2f2f2',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '300px',
  },
  title: {
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  input: {
    marginBottom: '1rem',
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  linkText: {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.9rem',
  },
};

export default Login;
