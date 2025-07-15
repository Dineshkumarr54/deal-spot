import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyListings = () => {
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyListings = async () => {
      if (!currentUser) return;
      const q = query(collection(db, 'listings'), where('userRef', '==', currentUser.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMyListings(data);
      setLoading(false);
    };

    fetchMyListings();
  }, [currentUser]);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this listing?');
    if (confirm) {
      await deleteDoc(doc(db, 'listings', id));
      setMyListings(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div style={styles.container}>
      <h2>📦 My Listings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : myListings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <div style={styles.grid}>
          {myListings.map(listing => (
            <div key={listing.id} style={styles.card}>
              <img src={listing.imageUrl} alt={listing.title} style={styles.image} />
              <h3>{listing.title}</h3>
              <p>₹{listing.price}</p>
              <p>📍 {listing.location || 'N/A'}</p>
              <p>👤 {listing.postedBy || currentUser.email}</p>
              <div style={styles.buttons}>
                <button onClick={() => navigate(`/edit/${listing.id}`)} style={styles.edit}>✏️ Edit</button>
                <button onClick={() => handleDelete(listing.id)} style={styles.delete}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    width: '260px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '0.5rem',
  },
  buttons: {
    marginTop: '0.5rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  edit: {
    background: '#4caf50',
    color: '#fff',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  delete: {
    background: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default MyListings;
