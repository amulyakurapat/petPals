import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AdoptPet from './pages/AdoptPet';
import RehomePet from './pages/RehomePet';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Toaster position="top-center" />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adopt" element={<AdoptPet />} />
            <Route path="/rehome" element={<RehomePet />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;