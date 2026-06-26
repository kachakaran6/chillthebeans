export type MenuItem = {
  id: string;
  name: string;
  category: 'hot-drinks' | 'chill-drinks' | 'smoothie-bowls' | 'ice-cream' | 'treats' | 'addons';
  description: string;
  price: string;
  mostLoved?: boolean;
};

export const menuData: MenuItem[] = [
  // HOT DRINKS
  { id: 'h1', name: 'Espresso', category: 'hot-drinks', description: 'Rich, intense double shot of our house blend.', price: '2.50' },
  { id: 'h2', name: 'Americano', category: 'hot-drinks', description: 'Espresso over hot water for a smooth, robust cup.', price: '2.80' },
  { id: 'h3', name: 'Flat White', category: 'hot-drinks', description: 'Double espresso with perfectly textured micro-foam.', price: '3.00', mostLoved: true },
  { id: 'h4', name: 'Cappuccino', category: 'hot-drinks', description: 'Equal parts espresso, steamed milk, and thick foam.', price: '3.20' },
  { id: 'h5', name: 'Latte', category: 'hot-drinks', description: 'A smooth and milky classic coffee.', price: '3.20' },
  { id: 'h6', name: 'Mocha', category: 'hot-drinks', description: 'Espresso combined with rich hot chocolate.', price: '3.30' },
  { id: 'h7', name: 'Hot Chocolate', category: 'hot-drinks', description: 'Rich, creamy, and comforting hot chocolate.', price: '3.30', mostLoved: true },
  { id: 'h8', name: 'Tea', category: 'hot-drinks', description: 'Classic traditional tea.', price: '2.00' },
  { id: 'h9', name: 'Chai', category: 'hot-drinks', description: 'Spiced chai tea with steamed milk.', price: '3.20' },
  { id: 'h10', name: 'Dirty Chai', category: 'hot-drinks', description: 'Chai latte with a shot of espresso.', price: '3.50' },

  // CHILL DRINKS
  { id: 'c1', name: 'Iced Americano', category: 'chill-drinks', description: 'Espresso over ice and cold water.', price: '3.50' },
  { id: 'c2', name: 'Iced Latte', category: 'chill-drinks', description: 'Smooth espresso and cold milk over ice.', price: '4.00' },
  { id: 'c3', name: 'Iced Coffee', category: 'chill-drinks', description: 'Classic cold brewed coffee.', price: '4.00' },
  { id: 'c4', name: 'Iced Mocha', category: 'chill-drinks', description: 'Rich chocolate and espresso over ice.', price: '4.20', mostLoved: true },

  // SMOOTHIE BOWLS
  { id: 'sb1', name: 'Build your bowl', category: 'smoothie-bowls', description: 'Choose your base (Açai, Pitaya, Mango) and load it with toppings (Granola, Strawberries, Blueberries, Banana, Kiwi, Peanut butter, Nutella, Coconut).', price: '7.95', mostLoved: true },

  // ICE CREAM RANGE
  { id: 'ic1', name: 'Taste of mOREO', category: 'ice-cream', description: 'Vanilla Ice Cream, Crushed Oreo & Chocolate Sauce.', price: '3.95' },
  { id: 'ic2', name: 'Malt Disney', category: 'ice-cream', description: 'Vanilla Ice Cream, Maltesers, Malteser bites & Chocolate Sauce.', price: '3.95' },
  { id: 'ic3', name: 'The Eminem One', category: 'ice-cream', description: 'Vanilla Ice Cream, Crispy MnMs, Wafer & chocolate sauce.', price: '3.95' },
  { id: 'ic4', name: 'The Happy Hippo', category: 'ice-cream', description: 'Vanilla Ice Cream, Kinder Bueno, Kinder Happy Hippo & Kinder Sauce.', price: '3.95', mostLoved: true },
  { id: 'ic5', name: 'Chill The Beans Special', category: 'ice-cream', description: 'Choose your Cookie of choice topped with vanilla ice cream.', price: '3.95', mostLoved: true },
  { id: 'ic6', name: 'Classic 99', category: 'ice-cream', description: 'Crunchy wafer cone, smooth vanilla ice cream topped with a Cadbury chocolate flake + sauce of your choice.', price: '2.00' },
  { id: 'ic7', name: 'Affogato', category: 'ice-cream', description: 'Rich Espresso shot topped with Vanilla Ice Cream & Sauce of your choice.', price: '3.95' },

  // TREATS & SNACKS
  { id: 't1', name: 'SOS Cookies', category: 'treats', description: 'Our famous soft, chunky cookies.', price: '3.00', mostLoved: true },
  { id: 't2', name: 'Pastries', category: 'treats', description: 'Freshly baked daily pastries.', price: '2.80' },
  { id: 't3', name: 'Protein Balls', category: 'treats', description: 'A satisfying, energy-packed snack on the go.', price: '2.00' },
  { id: 't4', name: 'Minerals & Bars', category: 'treats', description: 'Various chocolate bars and soft drinks.', price: '1.00 - 1.50' },

  // ADD-ONS
  { id: 'a1', name: 'Alternative Milks', category: 'addons', description: 'Oat Milk, Almond Milk, Coconut Milk, Soya Milk.', price: 'Ask inside' },
  { id: 'a2', name: 'Coffee Syrups', category: 'addons', description: 'Hazelnut, Caramel, Vanilla.', price: 'Ask inside' },
  { id: 'a3', name: 'Ice Cream Extras', category: 'addons', description: 'Extra toppings (0.50). Sauces: Salted Caramel, White Choc, Milk Chocolate, Kinder, Raspberry (Free).', price: 'Varies' },
  { id: 'a4', name: 'Herbal Teas', category: 'addons', description: 'A selection of soothing herbal teas.', price: '2.00' },
];
