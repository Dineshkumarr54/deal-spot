import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const q = query(collection(db, 'listings'), orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        const listings = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(listings);
      } catch (err) {
        console.error("Error fetching listings:", err.message);
      }
    };

    fetchListings();
  }, []);

  return (
    <div style={styles.container}>
      <h2>🛒 Browse Listings</h2>
      <div style={styles.grid}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
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
};

export default Home;
