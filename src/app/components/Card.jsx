'use client';

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft size={20} />
        Back to shop
      </button>

      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 py-40 text-5xl">Your cart is empty.</div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row justify-between items-center gap-4"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{item.title}</h4>
                <p className="text-gray-500 text-sm mt-1">₹{item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="p-1 rounded-full border hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>

                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                  className="w-14 text-center border rounded-md py-1 px-2 text-sm"
                />

                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="p-1 rounded-full border hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:text-red-600 p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <div className="text-lg font-bold">
              Total: <span className="text-blue-700">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
