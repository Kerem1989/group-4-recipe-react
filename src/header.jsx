import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function SimpleHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-blue-100">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-5 p-0,5">
            <span className="sr-only">Your Company</span>
            <img
              alt="Company Logo"
              src="assets\logo.jpeg" 
              className="h-14 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        <div className={`lg:flex lg:gap-x-12 ${mobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Recept
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Mat
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Kontakt
          </a>
        </div>
      </nav>
    </header>
  );
}
