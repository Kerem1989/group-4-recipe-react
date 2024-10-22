export default function Hero() {
    return (
      <section
        className="hero-background"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50vh',
        }}
      >
        <div className="flex items-center justify-center h-full">
          <h4 className="max-w-2xl mb-4 text-1xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-4xl text-white text-center">
            Välkomna
          </h4>
        </div>
      </section>
    );
  }
  