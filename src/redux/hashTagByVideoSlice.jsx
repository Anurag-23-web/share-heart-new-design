// src/slices/hashTagByVideoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [], // stores videos with selected hashtags
};

const hashTagByVideoSlice = createSlice({
  name: 'hashTagByVideo',
  initialState,
  reducers: {
    // Action to add videos associated with hashtags
    addHashTagByVideo: (state, action) => {
      state.data = action.payload;  // Set the payload (videos) to the state
    },

    // Action to clear the list of videos
    clearHashTagByVideo: (state) => {
      state.data = [];  // Clear the stored videos
    },
  },
});

// Export actions
export const { addHashTagByVideo, clearHashTagByVideo } = hashTagByVideoSlice.actions;

// Export reducer to be used in the store
export default hashTagByVideoSlice.reducer;
