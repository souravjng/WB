'use client';

import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

export function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="border rounded-lg p-4 shadow h-[330px] w-[250px]">
      <img
        src={product.image?.src || product.image}
        alt={product.title}
        className="w-full h-48 object-contain"
      />
      <h2 className="font-semibold mt-2">{product.title}</h2>
      <p className="font-bold text-lg">₹{product.price}</p>
      <button
        onClick={() => dispatch(addToCart(product))}
        className="bg-blue-800 text-white w-full mt-2 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
