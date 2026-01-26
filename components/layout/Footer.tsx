"use client";

import { useState } from "react";
import Image from "next/image";

export function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Using mailto link as a simple solution
      const subject = encodeURIComponent("Portfolio Contact");
      const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:tomatomonari@gmail.com?subject=${subject}&body=${body}`;
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <footer id="contact" className="w-full px-4 md:px-6 pb-6 scroll-mt-24" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
      {/* Main Footer Card */}
      <div className="w-full max-w-[1440px] mx-auto bg-white rounded-[2rem] md:rounded-[3rem] px-6 md:px-12 py-10 md:py-16">
        {/* Top Section: Logo + Contact Form */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12">
          {/* Logo + Tagline */}
          <div className="flex-shrink-0">
            <Image
              src="/tt-logo.png"
              alt="Toma Tomonari Logo"
              width={60}
              height={60}
              className="h-12 md:h-16 w-auto object-contain"
            />
          </div>

          {/* Contact Form Card */}
          <div className="flex-1 max-w-2xl">
            <div className="bg-violet-50/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                {/* Subtext - at top */}
                <p className="mb-4 text-sm text-slate-500 text-center md:text-left">
                  Drop me a message and I&apos;ll get back to you soon.
                </p>

                {/* Mobile: Stacked layout */}
                <div className="flex flex-col gap-4 md:hidden">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white rounded-full text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-violet-400 transition-all"
                  />
                  <textarea
                    placeholder="Your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white rounded-2xl text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-violet-400 transition-all resize-none"
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full px-8 py-3 bg-violet-200 text-slate-700 font-medium rounded-full hover:bg-[#3D3A50] hover:text-white transition-all duration-300 disabled:opacity-50"
                  >
                    {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Send"}
                  </button>
                </div>

                {/* Desktop: Name + Email row, then Message, then Send */}
                <div className="hidden md:flex md:flex-col gap-4">
                  {/* Name + Email Row */}
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="flex-1 px-4 py-3 bg-white rounded-full text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-violet-400 transition-all"
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 px-4 py-3 bg-white rounded-full text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-violet-400 transition-all"
                    />
                  </div>
                  {/* Message */}
                  <textarea
                    placeholder="Your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white rounded-2xl text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-violet-400 transition-all resize-none"
                  />
                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full px-8 py-3 bg-violet-200 text-slate-700 font-medium rounded-full hover:bg-[#3D3A50] hover:text-white transition-all duration-300 disabled:opacity-50"
                  >
                    {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Send"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section: Status + Social */}
        <div className="mt-12 md:mt-16">
          <div className="flex items-center gap-4">
            {/* Status Indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-slate-600">Available for work</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/toma-tomonari/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright - Outside the card */}
      <div className="w-full max-w-[1440px] mx-auto mt-6 text-center">
        <p className="text-sm text-slate-500">
          &copy; Toma Tomonari {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
