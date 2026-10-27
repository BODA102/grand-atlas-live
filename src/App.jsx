import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeContent from './components/HomeContent';
import Units from './components/Units';
import DisplayUnit from './components/DisplayUnit';
import Zones from './components/Zones';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import Developers from './components/Developers';
import DeveloperDetail from './components/DeveloperDetail';
import ContactContent from './components/ContactContent';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans bg-white text-gray-800">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/units" element={<Units />} />
            <Route path="/unit/:id" element={<DisplayUnit />} />
            <Route path="/zones" element={<Zones />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/developer/:id" element={<DeveloperDetail />} />
            <Route path="/contact" element={<ContactContent />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}


