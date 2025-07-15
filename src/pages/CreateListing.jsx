import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { useAuth } from "../context/AuthContext";

const CreateListing = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !description || !image) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      // Upload image to Cloudinary
      const imageUrl = await uploadToCloudinary(image);

      // Save listing in Firestore
    await addDoc(collection(db, "listings"), {
  title: form.title,
  description: form.description,
  price: form.price,
  category: form.category,
  imageUrl,
  location: form.location,  // ✅ ADD THIS
  postedBy: currentUser.email, // ✅ ADD THIS
  userRef: currentUser.uid,
  createdAt: serverTimestamp(),
});


      alert("Listing posted successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to post listing: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create a Listing</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Price (in ₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={styles.input}
        />
        <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        required
        />
        
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Posting..." : "Post Listing"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "500px",
    margin: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.8rem",
    fontSize: "1rem",
  },
  textarea: {
    padding: "0.8rem",
    fontSize: "1rem",
    height: "100px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "0.8rem",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default CreateListing;
