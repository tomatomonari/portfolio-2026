"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function NavBar() {
  const [showName, setShowName] = useState(false);

  // Listen for scroll to toggle name visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowName(true);
      } else {
        setShowName(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-transparent">
      {/* Container with Phantom alignment */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between h-full">
        {/* Left: Logo - Always visible */}
        <a href="/" className="flex items-center">
          <Image
            src="/tt-logo.png"
            alt="Toma Tomonari Logo"
            width={40}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </a>

        {/* Right: Name - Desktop only, fades in on scroll */}
        <a
          href="/"
          className={`hidden md:block text-lg font-medium text-slate-500 tracking-wide hover:text-slate-900 transition-all duration-500 ease-in-out ${
            showName ? "opacity-100" : "opacity-0"
          }`}
        >
          Toma Tomonari
        </a>
      </div>
    </nav>
  );
}
