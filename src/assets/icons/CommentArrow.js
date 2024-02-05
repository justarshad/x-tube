import React from 'react'
import { useSelector } from "react-redux";
import { iconColorDarkThem, iconColorLightTheme } from "../../utils/color";
const CommentArrow = ({ width }) => {
    const theme = useSelector(store => store.states.theme);
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            fill="#3f51b5"
            viewBox="0 0 24 24"
            focusable="false"
            style={{
                pointerEvents: "none", display: "block", width: width, height: "100%"
            }}
        >
            <path fill={theme === "light" ? iconColorLightTheme : iconColorDarkThem} h d="M7 10l5 5 5-5z"></path>
        </svg>
    )
}

export default CommentArrow;