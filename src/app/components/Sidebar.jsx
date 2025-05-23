'use client';

import { useState, useEffect } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { X } from 'lucide-react';

const categories = ['All', 'Electronics', 'Clothing', 'Home', 'Accessories'];
const MIN = 0;
const MAX = 1000;

const Sidebar = ({ products = [], onFiltered }) => {
  const [filters, setFilters] = useState({
    category: 'All',
    price: '',
    priceRange: [MIN, MAX],
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearPriceInput = () => updateFilter('price', '');

  useEffect(() => {
    let filtered = [...products];

    if (filters.category !== 'All') {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters.price !== '') {
      filtered = filtered.filter((p) => p.price <= filters.price);
    } else {
      filtered = filtered.filter(
        (p) =>
          p.price >= filters.priceRange[0] &&
          p.price <= filters.priceRange[1]
      );
    }

    onFiltered(filtered);
  }, [filters, products, onFiltered]);

  const renderCategoryOptions = (name, selected) =>
    categories.map((cat) => (
      <label key={cat} className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name={name}
          value={cat}
          checked={selected === cat}
          onChange={() => updateFilter('category', cat)}
          className="w-4 h-4 accent-blue-800"
        />
        <span>{cat}</span>
      </label>
    ));

  return (
    <div className="flex flex-col border border-gray-200 h-[850px] w-[430px] mx-auto">
      <aside className="bg-blue-800 text-white rounded-2xl p-6 shadow-md space-y-6 w-[300px] ml-2 h-[400px] mt-4">
        <h2 className="text-xl font-bold">Filters</h2>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Category</h3>
          {renderCategoryOptions('category-main', filters.category)}
        </div>

        <div className="space-y-2 mt-6">
          <h3 className="text-sm font-semibold">Price Range</h3>
          <Range
            step={10}
            min={MIN}
            max={MAX}
            values={filters.priceRange}
            onChange={(values) => updateFilter('priceRange', values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                ref={props.ref}
                className="h-[6px] w-full rounded bg-gray-300"
                style={{
                  background: getTrackBackground({
                    values: filters.priceRange,
                    colors: ['#ccc', '#fff', '#ccc'],
                    min: MIN,
                    max: MAX,
                  }),
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props, index }) => {
              const { key, ...rest } = props;
              return (
                <div
                  key={key || index}
                  {...rest}
                  className="h-4 w-4 rounded-full bg-white border-2 border-blue-600 shadow-md"
                />
              );
            }}
          />
          <div className="flex justify-between text-xs mt-2">
            <span>{filters.priceRange[0]}</span>
            <span>{filters.priceRange[1]}</span>
          </div>
        </div>
      </aside>

      <div className="bg-white text-black rounded-2xl p-6 border border-gray-300 space-y-4 w-[300px] ml-2 h-[400px] mt-4">
        <h2 className="text-lg font-bold">Category 2</h2>
        <div className="space-y-2">
          {renderCategoryOptions('category-second', filters.category)}
        </div>

        <div className="relative mt-4">
          <h3 className="text-sm font-semibold mb-2">Max Price</h3>
          <input
            type="number"
            min={0}
            max={10000}
            step={100}
            value={filters.price}
            onChange={(e) => {
              const val = e.target.value;
              updateFilter('price', val ? parseInt(val) : '');
            }}
            placeholder="Enter max price"
            className="w-full border border-gray-300 rounded px-3 py-1 text-sm pr-8 h-[40px]"
          />
          {filters.price !== '' && (
            <button
              onClick={clearPriceInput}
              className="absolute right-2 top-[38px] text-gray-500 hover:text-black"
              aria-label="Clear price"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
