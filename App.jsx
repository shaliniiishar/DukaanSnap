import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import BottomNavigation from "./components/layout/BottomNavigation";

import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import ProductPreview from "./pages/ProductPreview";
import MyShop from "./pages/MyShop";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/preview" element={<ProductPreview />} />
          <Route path="/shop" element={<MyShop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </main>

      <BottomNavigation />
    </div>
  );
}

export default App;