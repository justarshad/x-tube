import React from 'react';
import { useSelector } from "react-redux";
import { iconColorDarkThem, iconColorLightTheme } from "../../utils/color";

const Subscription = ({width}) => {
    const theme = useSelector(store => store.states.theme);
    return (
        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false"
            style={{
                pointerEvents: "none",
                display: "block",
                width: width,
                height: "100%",
            }}
        >
            <path fill={theme === "light" ? iconColorLightTheme : iconColorDarkThem} d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z">
            </path>
        </svg>
    )
}

export default Subscription;

