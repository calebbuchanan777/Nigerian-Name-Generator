import React from 'react';
import { Globe } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-[hsl(var(--nigerian-green))] text-white py-4 shadow-md">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-heading font-bold flex items-center justify-center">
          <Globe className="mr-2" size={32} /> Nigerian Name Generator
        </h1>
        <p className="text-sm md:text-base mt-2 font-body">Discover your authentic Nigerian identity!</p>
      </div>
    </header>
  );
}
