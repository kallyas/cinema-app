import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Movies from "./pages/Movies";
import AddMovieForm from "./pages/AddMovie";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/movies/new" element={<AddMovieForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resigter" element={<Navigate to="/register" replace />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/" element={<Navigate to="/movies" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
