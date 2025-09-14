'use client';

import { Facebook, Instagram, Twitter } from 'lucide-react';

const LandingPageFooter = () => {
  return (
    <footer className="py-6 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p className="text-sm">© {new Date().getFullYear()} PayView. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Facebook className="hover:text-gray-600 cursor-pointer" />
          <Instagram className="hover:text-gray-600 cursor-pointer" />
          <Twitter className="hover:text-gray-600 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
