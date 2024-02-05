import { createSlice } from "@reduxjs/toolkit";

const query = createSlice({
    name: "query",
    initialState: {},
    reducers: {
        addQuery: (state, action) => {
            const { payload } = action;
            return {
                ...state,
                [payload.query]: [...payload.items]
            }
        }
    }

});

export const { addQuery } = query.actions;
export default query.reducer;