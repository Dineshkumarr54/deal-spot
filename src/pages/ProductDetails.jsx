import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import MessageModal from '../components/MessageModal';

const ProductDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'listings', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing({ id: docSnap.id, ...docSnap.data() });
      } else {
        alert('Product not found');
      }
    };

    fetchProduct();
  }, [id]);

  if (!listing) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <img src={listing.imageUrl} alt={listing.title} style={styles.image} />
      <div style={styles.details}>
        <h2>{listing.title}</h2>
        <p><strong>Price:</strong> ₹{listing.price}</p>
        <p><strong>Description:</strong> {listing.description}</p>
        <p><strong>Location:</strong> {listing.location}</p>
        <p><strong>Posted by:</strong> {listing.userEmail}</p>

        <button style={styles.button} onClick={() => setShowModal(true)}>
          📩 Contact Seller
        </button>
      </div>

      {showModal && (
        <MessageModal
          sellerEmail={listing.userEmail}
          productTitle={listing.title}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '300px',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  details: {
    maxWidth: '600px',
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  button: {
    marginTop: '1rem',
    padding: '0.7rem 1.5rem',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default ProductDetails;
