import { createSlice } from "@reduxjs/toolkit";

const channels = createSlice({
    name: "channels",
    initialState: {
        // data: {},
        // channelSection: {},
        // playlists: {},
    },
    reducers: {
        addChaneels: (state, action) => {

            let channelList = {};
            action.payload.forEach(item => {
                const { channelId } = item;
                const existing = state?.[channelId] ? state?.[channelId] : {};
                channelList[channelId] = { ...existing, ...item };
            });
            return { ...state, ...channelList };
        },

        addChannelSection: (state, action) => {
            const { list, channelId } = action.payload;
            const existing = state?.[channelId] ? state?.[channelId] : {};
            return { ...state, [channelId]: { ...existing, channelSection: [...list] } };
        },
    },
},
);
export const {
    addChaneels,
    addChannelSection,
} = channels.actions;
export default channels.reducer;