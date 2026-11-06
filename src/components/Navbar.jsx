import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/units', label: 'Units' },
  { to: '/zones', label: 'Zones' },
  { to: '/developers', label: 'Developers' },
  { to: '/contact', label: 'Contact Us' },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = path => location.pathname === path;
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-4 left-0 z-50 w-full px-4 md:px-[9%]">
      <nav className="relative mx-auto flex min-h-18 max-w-[1800px] items-center justify-between rounded-full border border-white/0 bg-white/5 px-5 py-1 shadow-lg shadow-slate-900/10 backdrop-blur-x2 sm:px-7 md:min-h-18 md:px-10">
        <Link to="/" onClick={closeMenu} className="flex shrink-0 items-center gap-3 text-[#182338]">
          <img src="/logo.png" alt="Grand Atlas" className="h-9 w-9 object-contain sm:h-11 sm:w-11" />
          <span className="hidden flex-col sm:flex">
            <span className="font-serif text-base font-bold tracking-[0.12em] sm:text-lg md:text-xl">GRAND ATLAS</span>
            <span className="font-serif text-[9px] tracking-[0.14em] sm:text-[9px]">REAL ESTATE AGENCY</span>
          </span>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 text-sm font-medium text-slate-700 md:flex lg:gap-10">
          {links.map(({ to, label }) => (
            <Link key={to} to={to} className={`relative whitespace-nowrap py-2 transition-colors hover:text-[#8B1E22] ${isActive(to) ? 'text-[#8B1E22]' : ''}`}>
              {label}
              {isActive(to) && <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[#8B1E22]" />}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Link to="/register" onClick={closeMenu} className="rounded-full bg-[#941f24] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#74171b] sm:px-7 sm:py-3 sm:text-sm">
            Register
          </Link>
          <button onClick={() => setIsOpen(open => !open)} className="rounded-full p-2 text-slate-700 hover:bg-white/70 md:hidden" aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>

        {isOpen && <div className="absolute left-3 right-3 top-[calc(100%+0.6rem)] flex flex-col gap-1 rounded-3xl border border-white/70 bg-white/90 p-4 text-sm font-medium text-slate-700 shadow-xl backdrop-blur-xl md:hidden">
          {links.map(({ to, label }) => <Link key={to} to={to} onClick={closeMenu} className={`rounded-xl px-4 py-3 hover:bg-white ${isActive(to) ? 'text-[#8B1E22]' : ''}`}>{label}</Link>)}
        </div>}
      </nav>
    </header>
  );
}
