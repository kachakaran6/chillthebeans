import Nav from './components/Nav';
import Hero from './components/Hero/Hero';
import QueueStrip from './components/QueueStrip';
import Menu from './components/Menu/Menu';
import ProductShowcase from './components/ProductShowcase';
import ReviewWall from './components/Reviews/ReviewWall';
import FindUs from './components/FindUs';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative bg-cream-foam min-h-screen overflow-x-hidden selection:bg-caramel selection:text-cream-foam">
      <Nav />
      <main>
        <Hero />
        <QueueStrip />
        <Menu />
        <ProductShowcase />
        <ReviewWall />
        <FindUs />
      </main>
      <Footer />
    </div>
  );
}

export default App;
