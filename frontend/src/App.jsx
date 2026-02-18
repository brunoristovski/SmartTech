import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./ui/components/Navbar.jsx";
import HomePage from "./ui/pages/HomePage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
