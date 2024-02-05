import { createSlice } from "@reduxjs/toolkit";

const comments = createSlice({
    name: "comments",
    initialState: {},
    reducers: {
        addComments: (state, action) => {
            const { videoId, items, nextPageToken } = action.payload;

            let updatedItems = [];
            if (state[videoId]) {
                updatedItems = [...state[videoId].items];
            }
            updatedItems = updatedItems.concat(items);

            return {
                ...state,
                [videoId]: {
                    nextPageToken,
                    items: [...updatedItems]
                }
            };
        }
    }
});

export const { addComments } = comments.actions;
export default comments.reducer;