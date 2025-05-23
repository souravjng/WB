'use client';

import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '@/app/redux/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowLeft } from 'lucide-react';

export default function ProductPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const productId = parseInt(id);

  const product = useSelector((state) =>
    state.products.products.find((p) => p.id === productId)
  );

  if (!product) {
    return (
      <div className="p-10 text-xl text-red-600 text-center">
        Product not found.
        <Link href="/" className="block mt-4 text-blue-600 underline">
          ← Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: typeof product.image === 'string' ? product.image : product.image.src,
        category: product.category,
      })
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    alert('Proceeding to checkout... (You can hook this into your real checkout page)');
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={20}
          className={i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
          aria-hidden="true"
        />
      );
    }
    return (
      <div className="flex items-center gap-1 mt-2" aria-label={`Rating: ${rating} out of 5 stars`}>
        {stars}
      </div>
    );
  };

  const fakeRating = 4;

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        aria-label="Go back to products"
      >
        <ArrowLeft size={20} />
        Back to Products
      </Link>

      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:underline">
          Home
        </Link>{' '}
        /<span className="ml-1 capitalize text-gray-700">{product.category}</span>
      </nav>

      <div className="bg-white rounded-xl shadow-md p-6 sm:p-10 flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src={typeof product.image === 'string' ? product.image : product.image.src}
            alt={product.title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
            <p className="text-gray-500 mt-2 text-sm uppercase">{product.category}</p>
            {renderStars(fakeRating)}
            <p className="text-2xl text-blue-800 font-semibold mt-4">₹{product.price.toFixed(2)}</p>
            <p className="text-gray-600 mt-4 leading-relaxed">
              This is a premium quality product that meets your expectations with outstanding
              performance and reliability.
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="py-3 px-6 bg-blue-700 text-white rounded-lg text-base font-medium hover:bg-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="py-3 px-6 bg-green-600 text-white rounded-lg text-base font-medium hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
