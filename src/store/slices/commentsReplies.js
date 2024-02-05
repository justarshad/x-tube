import { createSlice } from "@reduxjs/toolkit";

const commentsReplies = createSlice({
    name: "commentsReplies",
    initialState: {},
    reducers: {
        addCommentReplies: (state, action) => {
            const { parentId, list, nextPageToken } = action.payload;
            const existingList = state[parentId]?.items ? state[parentId]?.items : [];

            return {
                ...state,
                [parentId]: {
                    nextPageToken,
                    items: [...existingList, ...list]
                }
            };
        }
    }
});

export const { addCommentReplies } = commentsReplies.actions;
export default commentsReplies.reducer;