"use client"
import Head from 'next/head';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductCard } from './components/ProductCard';
import { Header } from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  const products = useSelector((state) => state.products.products);
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <>
      <Head>
        <title>Product Listing</title>
      </Head>
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex">
          <main className="flex-1 p-8">
            <h1 className="text-3xl font-bold mb-6">Product Listing</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>
        </div>
        <Footer/>
      </div>
    </>
  );
}