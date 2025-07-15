import React, { useState } from 'react';

const MessageModal = ({ sellerEmail, productTitle, onClose }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    alert(`✅ Message sent to ${sellerEmail}!\n\nMessage: ${message}`);
    setMessage('');
    onClose(); // Close modal after sending
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>📩 Message to Seller</h3>
        <p><strong>Regarding:</strong> {productTitle}</p>
        <textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.textarea}
        ></textarea>
        <div style={styles.buttons}>
          <button onClick={handleSend} style={styles.sendBtn}>Send</button>
          <button onClick={onClose} style={styles.cancelBtn}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
  },
  textarea: {
    width: '100%',
    height: '100px',
    marginTop: '10px',
    marginBottom: '10px',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
  },
  sendBtn: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelBtn: {
    backgroundColor: '#ccc',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default MessageModal;
