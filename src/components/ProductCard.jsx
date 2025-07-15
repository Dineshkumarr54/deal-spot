import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div onClick={handleClick} style={styles.card}>
      <img src={product.imageUrl} alt={product.title} style={styles.image} />
      <h3>{product.title}</h3>
      <p>₹{product.price}</p>
      <p>📍 {product.location}</p>
      <p>👤 Posted by: {product.postedBy}</p>
    </div>
  );
};

const styles = {
  card: {
    cursor: 'pointer',
    width: '200px',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
};

export default ProductCard;
