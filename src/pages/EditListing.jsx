import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.userRef !== currentUser.uid) {
          alert("You are not authorized to edit this listing");
          navigate("/");
        } else {
          setForm({
            title: data.title,
            description: data.description,
            price: data.price,
            category: data.category,
            image: null,
          });
          setPreviewUrl(data.imageUrl);
        }
      } else {
        alert("Listing not found");
        navigate("/");
      }
    };
    fetchListing();
  }, [id, currentUser, navigate]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm((prev) => ({
        ...prev,
        image: e.target.files[0],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = previewUrl;
      if (form.image) {
        imageUrl = await uploadToCloudinary(form.image);
      }

      const listingRef = doc(db, "listings", id);
      await updateDoc(listingRef, {
        title: form.title,
        description: form.description,
        price: form.price,
        category: form.category,
        imageUrl,
        updatedAt: serverTimestamp(),
      });

      alert("Listing updated successfully!");
      navigate("/my-listings");
    } catch (err) {
      console.error("Error updating listing:", err);
      alert("Failed to update listing.");
    }
  };

  return (
    <div className="form-container">
      <h2>✏ Edit Listing</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        {previewUrl && <img src={previewUrl} alt="Preview" className="preview" />}
        <button type="submit">✅ Update Listing</button>
      </form>
    </div>
  );
};

export default EditListing;
