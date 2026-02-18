import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./ui/components/navbar.jsx";
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
};

export default App;
