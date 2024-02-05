import { createSlice } from "@reduxjs/toolkit";


const videos = createSlice({
    name: "videos",
    initialState: {},
    reducers: {
        addVideos: (state, action) => {
            const list = {};
            action.payload?.forEach((item) => {
                list[item.videoId] = { ...item };
            });
            return { ...state, ...list };
        },
        addVideosInBulk: (state, action) => {
            const list = {};
            action.payload?.forEach((item) => {
                list[item.videoId] = { ...item };
            });
            return { ...state, ...list };
        },
        updateVideoData: (state, action) => {
            const { videoId } = action.payload;
            const updatedInfo = { ...state[videoId], ...action.payload }
            return { ...state, [videoId]: updatedInfo };
        }
    }
});

export const { addVideos, addVideosInBulk, updateVideoData } = videos.actions;
export default videos.reducer;