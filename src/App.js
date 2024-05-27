import './App.css';

import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import SinglePage from "./pages/SinglePage";
import FlatsPage from "./pages/FlatsPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import Liked from "./pages/Liked";
import Rated from "./pages/Rated";
import RateFlat from "./pages/RateFlat";


function App() {

    return (

        <Router>
            <div>
                <Header/>
                <Routes>
                    <Route path="/" element={<FlatsPage />} />
                    <Route path="/flats/:id" element={<SinglePage />} />
                    <Route path="/flats/:id/rate" element={<RateFlat />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<UserDashboard />} />
                    <Route path="/liked" element={<Liked />} />
                    <Route path="/rated" element={<Rated />} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;