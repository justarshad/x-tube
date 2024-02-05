import React from 'react';
import { useSelector } from "react-redux";
import { iconColorDarkThem, iconColorLightTheme } from "../../utils/color";

const Playlist = ({ width }) => {
    const theme = useSelector(store => store.states.theme);
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false"
            style={{
                pointerEvents: "none",
                display: "block",
                width: width,
                height: "100%",
            }}>
            <path fill={theme === "light" ? iconColorLightTheme : iconColorDarkThem} d="M22 7H2v1h20V7zm-9 5H2v-1h11v1zm0 4H2v-1h11v1zm2 3v-8l7 4-7 4z">
            </path>
        </svg >
    )
}
export default Playlist;