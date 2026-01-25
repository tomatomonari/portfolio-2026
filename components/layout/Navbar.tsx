"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

// Snappy pop-up spring for mobile menu
const menuSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
  mass: 0.8,
  delay: 0.05,
};


const navLinks = [
  { label: "Work History", href: "#work-history" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "About", href: "#about" },
];

interface NavbarProps {
  isDarkBg?: boolean;
}

export function Navbar({ isDarkBg = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 lg:px-10 py-6 pointer-events-none">
        {/* Left: Brand Logo */}
        <a
          href="/"
          className="pointer-events-auto flex items-center"
        >
          <Image
            src="/tt-logo.png"
            alt="Toma Tomonari Logo"
            width={40}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </a>

        {/* Center: Nav Pill - Desktop only */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full border border-slate-200/50 px-2 py-2.5 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-violet-900 hover:bg-violet-100 px-6 py-3 rounded-full transition-all duration-300 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: Contact Button + Mobile Menu Button */}
        <div className="flex items-center gap-3">
          {/* Contact Button - stays behind backdrop on mobile when menu open */}
          <a
            href="#contact"
            className={`font-medium rounded-full px-6 h-12 md:h-auto md:px-8 md:py-4 transition-all duration-300 text-sm md:text-base flex items-center justify-center ${
              isMenuOpen ? "pointer-events-none" : "pointer-events-auto"
            } ${
              isDarkBg
                ? "bg-[#3D3A50] text-white hover:bg-violet-200 hover:text-violet-900"
                : "bg-violet-300 text-violet-900 hover:bg-violet-200"
            }`}
          >
            Contact
          </a>

          {/* Mobile Menu Button - always stays above backdrop */}
          <button
            onClick={toggleMenu}
            className="pointer-events-auto md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors duration-300 relative z-[60]"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence initial={false} mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-6 h-6 text-slate-800" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-6 h-6 text-slate-800" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay + Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={closeMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={menuSpring}
              className="fixed top-24 left-4 right-4 z-50 bg-white rounded-3xl shadow-2xl md:hidden overflow-hidden"
            >
              <div className="p-6">
                {/* Navigation Links */}
                <nav className="flex flex-col">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between py-5 text-2xl font-semibold text-slate-700 hover:text-violet-600 transition-colors duration-200"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-6 h-6 text-slate-400" />
                    </a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
