import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateListing from './pages/CreateListing';
import ProductDetails from './pages/ProductDetails';
import MyListings from './pages/MyListings';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import EditListing from "./pages/EditListing";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/create'
          element={
            <ProtectedRoute>
              <CreateListing />
            </ProtectedRoute>
          }
        />
        <Route
          path='/my-listings'
          element={
            <ProtectedRoute>
              <MyListings />
            </ProtectedRoute>
          }
        />
        <Route
         path="/edit-listing/:id"
         element={
          <ProtectedRoute>
             <EditListing />
           </ProtectedRoute>
             }
         /> 
        <Route path='/product/:id' element={<ProductDetails />} />
      </Routes>
    </>
  );
};

export default App;
