import { ShoppingCart } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-blue-800 text-white p-4 flex items-center justify-between">
      <div className="text-2xl font-bold">WB</div>
      <input
        type="text"
        placeholder="Search for products..."
        className="w-1/2 px-4 py-2 rounded text-black"
      />
      <div className="relative flex items-center">
        <ShoppingCart />
        <span className="ml-2">Cart</span>
        <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
          
        </span>
      </div>
    </header>
  );
}