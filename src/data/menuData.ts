export type MenuItem = {
  id: string;
  name: string;
  category: 'coffee' | 'sweet' | 'lighter' | 'milk-addons';
  description: string;
  price: number | null | string;
  mostLoved?: boolean;
};

export const menuData: MenuItem[] = [
  {
    id: 'c1',
    name: 'Coffee',
    category: 'coffee',
    description: 'Our classic house blend, brewed to perfection.',
    price: null, // TODO: Add real price
  },
  {
    id: 'c2',
    name: 'Hazelnut Cappuccino',
    category: 'coffee',
    description: 'Espresso, steamed milk, and a rich hazelnut syrup.',
    price: null, // TODO: Add real price
  },
  {
    id: 'c3',
    name: 'Caramel Cappuccino',
    category: 'coffee',
    description: 'A comforting classic with sweet caramel notes.',
    price: null, // TODO: Add real price
  },
  {
    id: 'c4',
    name: 'Vanilla Cappuccino',
    category: 'coffee',
    description: 'Smooth vanilla blended with our signature espresso and milk.',
    price: null, // TODO: Add real price
  },
  {
    id: 'c5',
    name: 'Caramel Latte',
    category: 'coffee',
    description: 'A creamy latte infused with caramel, a local favorite.',
    price: null, // TODO: Add real price
  },
  {
    id: 's1',
    name: 'SOS Cookies',
    category: 'sweet',
    description: 'A soft, caramel-laced cookie that people drive for.',
    price: null, // TODO: Add real price
    mostLoved: true,
  },
  {
    id: 's2',
    name: 'Chocolate Cookies',
    category: 'sweet',
    description: 'Rich, chocolatey, and freshly baked in-house.',
    price: null, // TODO: Add real price
  },
  {
    id: 's3',
    name: 'Chocolate Cake',
    category: 'sweet',
    description: 'Decadent, rich chocolate cake for the ultimate treat.',
    price: null, // TODO: Add real price
  },
  {
    id: 'l1',
    name: 'Protein Balls',
    category: 'lighter',
    description: 'A satisfying, energy-packed snack on the go.',
    price: null, // TODO: Add real price
    mostLoved: true,
  },
  {
    id: 'm1',
    name: 'Oat Milk',
    category: 'milk-addons',
    description: 'A creamy dairy alternative for any of our drinks.',
    price: null, // TODO: Add real price
  }
];
