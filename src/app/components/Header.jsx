'use client';

import Link from 'next/link';
import { ShoppingCart, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../redux/cartSlice';
import { useEffect } from 'react';

export function Header({ searchQuery, onSearchChange }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Load cart from localStorage once on client
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      try {
        dispatch(setCart(JSON.parse(stored)));
      } catch (e) {
        console.error('Invalid cart in localStorage');
      }
    }
  }, [dispatch]);

  return (
    <header className="bg-blue-800 px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-white text-3xl font-bold">
        WB
      </Link>

      <div className="flex items-center w-1/2 border border-gray-300 rounded-sm px-4 py-2 focus-within:ring-2 ring-white">
        <Search className="text-white mr-2 w-5 h-5" />
        <input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search for products..."
          className="bg-transparent outline-none text-white w-full placeholder-white"
        />
      </div>

      <Link
        href="/cart"
        className="flex items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white px-4 py-2 rounded"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>Cart</span>
        {cartCount > 0 && (
          <span className="ml-1 bg-red-500 rounded-full text-xs px-2 py-0.5">
            {cartCount}
          </span>
        )}
      </Link>
    </header>
  );
}
