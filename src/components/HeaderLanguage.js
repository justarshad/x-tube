import React from 'react';
import { useDispatch } from 'react-redux';
import { updateLanguage } from "../store/slices/state";

const HeaderLanguage = () => {
    const dispatch = useDispatch();
    return (
        <div className="font-medium text-light_text_1000 dark:text-white">
            <select name="" id=""
                className="outline-none p-[0.15rem] dark:bg-dark_bg_200"
                onChange={(e) => dispatch(updateLanguage(e.target.value))}
            >
                <option >EN</option>
                <option >HI</option>
            </select>
        </div>
    )
}

export default HeaderLanguage;