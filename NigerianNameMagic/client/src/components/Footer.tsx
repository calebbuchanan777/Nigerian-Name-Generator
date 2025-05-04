import React from 'react';
import { FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[hsl(var(--nigerian-black))] text-white py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-body">© {new Date().getFullYear()} Nigerian Name Generator | For entertainment purposes only</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="text-white hover:text-[hsl(var(--nigerian-gold))] transition duration-300">
            <TwitterIcon className="inline-block" size={16} />
          </a>
          <a href="#" className="text-white hover:text-[hsl(var(--nigerian-gold))] transition duration-300">
            <InstagramIcon className="inline-block" size={16} />
          </a>
          <a href="#" className="text-white hover:text-[hsl(var(--nigerian-gold))] transition duration-300">
            <FacebookIcon className="inline-block" size={16} />
          </a>
        </div>
        <div className="mt-4 text-xs space-x-4 font-body">
          <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}
