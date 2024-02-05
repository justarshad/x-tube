import { createSlice } from "@reduxjs/toolkit";

const state = createSlice({
    name: "state",
    initialState: {
        isSidebarOpen: true,
        isUserAuthenticated: "",
        userChannelId: "",
        theme: "light",
        language: "EN",
        deviceSize: "",
    },
    reducers: {
        toggleSidebarOpen: (state, action) => {

            const { type } = action.payload;
            if (type === "reverse") {
                return { ...state, isSidebarOpen: !state.isSidebarOpen }
            }
            if (type === "state") {
                return {
                    ...state, isSidebarOpen: action.payload.state
                }
            }
        },
        updateAuthenticationStatus: (state, action) => {
            return { ...state, isUserAuthenticated: action.payload };
        },
        updateUserChannelId: (state, action) => {
            return { ...state, userChannelId: action.payload };
        },
        updateDeviceSize: (state, action) => {
            if (state.deviceSize !== action.payload) {
                return { ...state, deviceSize: action.payload }
            }
        },
        updateLanguage: (state, action) => {
            return { ...state, language: action.payload }
        },
        updateTheme: (state, action) => {
            return { ...state, theme: action.payload }
        },
    }
});

export const {
    toggleSidebarOpen,
    updateAuthenticationStatus,
    updateUserChannelId,
    updateDeviceSize,
    updateLanguage,
    updateTheme
} = state.actions;
export default state.reducer;