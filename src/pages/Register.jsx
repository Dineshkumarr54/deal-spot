import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registration successful!');
      navigate('/');
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleRegister} style={styles.form}>
        <h2 style={styles.title}>📝 Register</h2>
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
        <button type="submit" style={styles.button}>Register</button>
        <p style={styles.linkText}>
          Already have an account? <a href="/login">Login here</a>
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
    backgroundColor: '#28a745',
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

export default Register;
