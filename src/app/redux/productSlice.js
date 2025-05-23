import { createSlice } from '@reduxjs/toolkit';
import img1 from '../assets/bag.png';
import img2 from '../assets/camera.png';
import img3 from '../assets/watch.png';

const initialState = {
  products: [
    { id: 1, title: 'Bag', price: 499, image: img1, category: 'Accessories' },
    { id: 2, title: 'Camera', price: 899, image: img2, category: 'Electronics' },
    { id: 3, title: 'Watch', price: 299, image: img3, category: 'Accessories' },
  ],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productSlice.reducer;
