import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen to auth state change
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("✅ Logged out!");
      navigate('/login');
    } catch (err) {
      alert("❌ Logout failed: " + err.message);
    }
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}><Link to="/" style={styles.link}>DealSpot</Link></h2>
      
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/create" style={styles.link}>Create</Link>
        <Link to="/my-listings" style={styles.link}>My Listings</Link>

        {user ? (
          <>
            <span style={styles.user}>{user.email}</span>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// Simple inline styles
const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    backgroundColor: '#1f2937',
    color: '#fff',
    alignItems: 'center',
  },
  logo: {
    margin: 0,
  },
  links: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  user: {
    fontSize: '0.9rem',
    marginRight: '10px',
    color: '#ccc',
  },
  button: {
    padding: '6px 12px',
    backgroundColor: '#e11d48',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};
