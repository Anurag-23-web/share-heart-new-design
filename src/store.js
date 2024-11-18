// src/store.js
import { configureStore } from '@reduxjs/toolkit';

// Import your reducers (slice)
import hashTagByVideoReducer  from './redux/hashTagByVideoSlice';  // Example slice

export const store = configureStore({
  reducer: {
    hashTagByVideo: hashTagByVideoReducer, // Add your reducers here
  },
});

export default store;
