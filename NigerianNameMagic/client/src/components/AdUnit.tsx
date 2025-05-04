import React, { useEffect, useRef } from 'react';

export default function AdUnit() {
  const adContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This is where you would normally initialize AdSense
    // For now, we'll just leave the placeholder
    console.log("Ad unit loaded");
    
    // If using actual Google AdSense, you would add code like:
    // (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className="mt-8 w-full max-w-md flex justify-center">
      <div 
        ref={adContainerRef}
        className="bg-gray-200 border border-gray-300 rounded-md p-2 text-center w-full"
      >
        <p className="text-xs text-gray-500 mb-2">ADVERTISEMENT</p>
        <div className="h-16 flex items-center justify-center text-gray-400">
          <span>Ad Space</span>
        </div>
      </div>
    </div>
  );
}
