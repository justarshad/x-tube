import React from 'react';
import SunIcon from "../assets/icons/Sun";
import MoonIcon from "../assets/icons/Moon";
import { useDispatch } from 'react-redux';
import { updateTheme } from "../store/slices/state";
const HeaderTheme = () => {

    const dispatch = useDispatch();
    const themeUpdater = (type) => {
        const body = document.getElementsByTagName("body")[0];
        type === "light" ? body.classList.remove("dark") : body.classList.add("dark");
        dispatch(updateTheme(type));
    }

    return (
        <div className="flex overflow-hidden rounded-full border-[0.025rem] border-light_border">
            <div
                className=" cursor-pointer rounded-full px-3 py-2 bg-light_bg_100 dark:bg-inherit"
                onClick={() => themeUpdater("light")}
            >
                <SunIcon />
            </div>
            <div
                className=" cursor-pointer rounded-full px-3 py-2 dark:bg-light_bg_100"
                onClick={(e) => themeUpdater("dark")}
            >
                <MoonIcon />
            </div>
        </div>
    )
}

export default HeaderTheme;