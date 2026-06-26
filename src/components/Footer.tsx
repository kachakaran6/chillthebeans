export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cocoa-dark text-oat py-12 text-center">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center space-y-6">
        <h2 className="font-display italic text-3xl text-cream-foam">Chill The Beans</h2>
        <p className="font-body font-light text-sm opacity-80">
          Main Street, Castlemungret, Mungret, Co. Limerick
        </p>
        
        <div className="flex space-x-6">
          <a href="tel:+353830811943" className="hover:text-caramel transition-colors">
            +353 83 081 1943
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-caramel transition-colors">
            Instagram
          </a>
        </div>

        <div className="w-16 h-px bg-cocoa-rich my-4"></div>

        <p className="font-mono text-xs text-oat/50">
          Built with love for the queue. &copy; {currentYear}
        </p>
      </div>
    </footer>
  );
}
