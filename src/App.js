import './App.css';

import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom'
import MainPage from "./pages/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SinglePage from "./pages/SinglePage";
import Statistics from "./pages/Statistics";

function App() {
    return (

        <Router>
            <div>
                <Header/>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/apartments/:id" element={<SinglePage />} />
                    <Route path="/statistics" element={<Statistics />} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;