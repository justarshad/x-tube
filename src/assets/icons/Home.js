import React from 'react';
import { useSelector } from "react-redux";
import { iconColorDarkThem, iconColorLightTheme } from "../../utils/color";

const Home = ({width}) => {
    const theme = useSelector(store => store.states.theme);
    return (
        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false"
            style={{
                pointerEvents: "none", display: "block", width: width, height: "100%"
            }}
        >
            <path fill={theme === "light" ? iconColorLightTheme : iconColorDarkThem} d="m12 4.44 7 6.09V20h-4v-6H9v6H5v-9.47l7-6.09m0-1.32-8 6.96V21h6v-6h4v6h6V10.08l-8-6.96z">
            </path >
        </svg >
    )
}

export default Home;