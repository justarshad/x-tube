import { configureStore } from "@reduxjs/toolkit";
import state from "./slices/state";
import videos from "./slices/videos";
import channels from "./slices/channels";
import query from "./slices/query";
import comments from "./slices/comments";
import commentsReplies from "./slices/commentsReplies";
import userInfo from "./slices/userInfo";
import playlists from "./slices/playlists";
import popular from "./slices/popular";

const store = configureStore({
    reducer: {
        states: state,
        videos,
        channels,
        query,
        comments,
        commentsReplies,
        userInfo,
        playlists,
        popular,
    }
});
export default store;