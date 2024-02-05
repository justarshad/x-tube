import { createSlice } from "@reduxjs/toolkit";

const userInfo = createSlice({

    name: "userInfo",
    initialState: {
        subscriptionsList: [],
        playlists: [],
        comments: {},
        likedVideos: {
            nextPageToken: "",
            totalVideos: "",
            list: []
        }
    },
    reducers: {
        addUser: (state, action) => {
            return { ...state, ...action.payload };
        },
        removeUser: (state, action) => {
            return {
                subscriptionsList: [],
            };
        },
        addSubcriptions: (state, action) => {
            const subs = [...state.subscriptionsList, ...action.payload];
            return { ...state, subscriptionsList: [...subs] };
        },
        addComment: (state, action) => {
            let list = [action.payload];
            const videoId = action.payload.videoId;

            if (state?.comments?.videoId) {
                list = [...list, ...state?.comments?.[videoId]];
            }

            const comments = { ...state.comments, [videoId]: list };
            return { ...state, comments };
        },
        addPlaylists: (state, action) => {
            const list = [...state.playlists, ...action.payload];
            return { ...state, playlists: list };
        },
        addLikedVideos: (state, action) => {
            const existing = state?.likedVideos?.list;
            return {
                ...state, likedVideos: {
                    totalVideos: Number(action.payload.totalVideos),
                    nextPageToken: action.payload.nextPageToken,
                    list: [...existing, ...action.payload.list]
                }
            }
        }
    }
});

export const {
    addUser,
    removeUser,
    addSubcriptions,
    addComment,
    addPlaylists,
    addLikedVideos } = userInfo.actions;

export default userInfo.reducer;