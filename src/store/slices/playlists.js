import { createSlice } from "@reduxjs/toolkit";

// example : {
//     plalistId : {
//         info:","
//         nextPageToken:"",
//         playlistItems:"",
//     }
// }
const playlists = createSlice({
    name: "playlists",
    initialState: {},
    reducers: {
        addPlaylists: (state, action) => {
            const playlists = {};
            action.payload.forEach(item => {
                const { playlistId } = item;
                playlists[playlistId] = { ...state?.[playlistId], info: { ...item } };
            });
            return { ...state, ...playlists };
        },
        addPlaylistItems: (state, action) => {
            const { playlistId, nextPageToken, items } = action.payload;
            const existing = state[playlistId]?.items ? state[playlistId]?.items : [];
            const obj = {
                items: [...existing, ...items],
                nextPageToken,
                info: state?.[playlistId]?.info ? state?.[playlistId]?.info : {},
            }
            return { ...state, [playlistId]: obj }
        },
    }
});

export const { addPlaylists, addPlaylistItems } = playlists.actions;
export default playlists.reducer;