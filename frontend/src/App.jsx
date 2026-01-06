import { SignInButton } from "@clerk/clerk-react";
import React from "react";
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import EditProductPage from "./pages/EditProductPage";

function App() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar></Navbar>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/create" element={<CreatePage />}></Route>
          <Route path="/edit" element={<EditProductPage />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
