// src/Header.js
import React, { useState } from 'react';
import { NavLink } from './App'; // Adjust path if needed

export const Header = ({ portfolioData }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Name */}
        <div className="text-white">
          <h1 className="text-xl font-bold">{portfolioData.header.name}</h1>
          <p className="text-sm text-gray-400">{portfolioData.header.subtitle}</p>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <NavLink href="#highlights">Highlights</NavLink>
          <NavLink href="#featured-projects">Projects</NavLink>
          <NavLink href="#about">About me</NavLink>
          <NavLink href="#journey">Journey</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          <a
            href={portfolioData.header.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white ml-4"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-200 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"/>
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="md:hidden fixed top-20 right-4 left-4 bg-gray-900 rounded-xl shadow-lg z-50 p-6 flex flex-col space-y-4 animate-slide-down">
          <NavLink href="#highlights" onClick={() => setMenuOpen(false)}>Highlights</NavLink>
          <NavLink href="#featured-projects" onClick={() => setMenuOpen(false)}>Projects</NavLink>
          <NavLink href="#about" onClick={() => setMenuOpen(false)}>About me</NavLink>
          <NavLink href="#journey" onClick={() => setMenuOpen(false)}>Journey</NavLink>
          <NavLink href="#skills" onClick={() => setMenuOpen(false)}>Skills</NavLink>
          <NavLink href="#contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          <a
            href={portfolioData.header.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;