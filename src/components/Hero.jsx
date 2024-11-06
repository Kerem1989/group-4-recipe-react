// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
const Hero = ({ searchQuery, setSearchQuery }) => {
    return (
        <section
            className="hero-background relative"
            style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '50vh',
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-40" /> {/* Overlay för bättre läsbarhet */}
            <div className="relative flex flex-col items-center justify-center h-full space-y-6">
                <h4 className="max-w-2xl mb-4 text-1xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-4xl text-white text-center">
                    Välkomna
                </h4>
                <div className="w-full max-w-md px-1">
                    <input
                        type="text"
                        placeholder="Sök recept..."
                        className="w-full p-4 rounded-lg border bg-white/90 backdrop-blur-sm border-gray-300 shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;