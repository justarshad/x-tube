import { createSlice } from "@reduxjs/toolkit";

const popular = createSlice({
    name: "popular",
    initialState: [],
    reducers: {
        addPopularVideos: (state, action) => {
            return [...action.payload];
        }
    }
});

export const { addPopularVideos } = popular.actions;
export default popular.reducer;