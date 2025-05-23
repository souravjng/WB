'use client';

import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ProductCard } from './components/ProductCard';
import { Header } from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

export default function HomePage() {
  const products = useSelector((state) => state.products.products || []);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFiltered = useCallback(
    (filteredList) => {
      const finalList = filteredList.filter((product) =>
        product.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      setFilteredProducts(finalList);
    },
    [searchQuery]
  );

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="flex">
        <Sidebar products={products} onFiltered={handleFiltered} />
        <div className="flex-col mt-10 ml-10 w-full">
          <h1 className="text-4xl font-bold text-blue-950">Product Listing</h1>
          <div className="flex flex-wrap gap-4 p-4 w-full">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="text-center w-full text-gray-500 text-2xl mt-20">
                No products found.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
