# 🛒 DealSpot — OLX-Style Marketplace (React + Firebase)

A full-featured OLX-style marketplace web app where users can list, view, edit, and delete items for sale. Built using **React** and **Firebase** with authentication, Firestore, and image upload via Cloudinary.

---

## 🚀 Features

- 🔐 Firebase Auth (Login/Register)
- 🖼 Image Upload with Cloudinary
- 🧾 Product Listings with Title, Price, Location, Image, PostedBy
- ➕ Create Listings (Protected Route)
- 📝 Edit & Delete your own listings
- 👤 View My Listings
- 📱 Fully responsive layout
- 🗃 Stored in Firestore

---

## 🛠 Tech Stack

- ⚛️ React.js
- 🔥 Firebase Auth + Firestore
- ☁️ Cloudinary for image hosting
- 📦 React Router v6
- 💅 Inline/CSS styling

---

## 📸 Screenshots

![Homepage](./screenshots/home.png)
![Create Listing](./screenshots/create.png)
![Login](./screenshots/login.png)

---

## 🧑‍💻 Setup Instructions

1. Clone the repo:

```bash
git clone https://github.com/YOUR_USERNAME/deal-spot.git
cd deal-spot
npm install

2.Create a .env file:

VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name

3.Run the app locally:
npm run dev

📂 Folder Structure

src/
├── components/
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   └── ProtectedRoute.jsx
├── context/
│   └── AuthContext.jsx
├── firebase/
│   └── config.js
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── CreateListing.jsx
│   ├── ProductDetails.jsx
│   └── MyListings.jsx
├── utils/
│   └── uploadToCloudinary.js
└── App.jsx


📄 License
MIT — Feel free to use and modify!


---

### ✅ Step 5: Push README to GitHub

Save the above as `README.md` in your project root, then:

```bash
git add README.md
git commit -m "Add project README"
git push

