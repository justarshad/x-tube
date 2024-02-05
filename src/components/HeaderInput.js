import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../assets/icons/Search";

const HeaderInput = ({ screenSize }) => {
    const navigate = useNavigate();
    const [queryText, setQueryText] = useState("");

    const querySearcher = () => {
        if (queryText.trim()) {
            navigate(`/search?q=${queryText.trim().split(" ").join('+')}`)
        }
    }
    return (
        <div className="flex flex-1 justify-center">
            <input
                type="text"
                placeholder="search..."
                className={` ${screenSize ? "w-[50%]" : "flex-1"} border-[0.015rem] text-light_text_800 outline-0 px-[0.8rem] py-[0.32rem] text-[1rem] rounded-s-full dark:bg-dark_bg_700 dark:border-dark_bg_500 dark:text-dark_text_800`}
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
            />
            <div
                className="border-[0.015rem] 
                px-[0.5rem] flex justify-center items-center rounded-e-full border-l-0 cursor-pointer
                bg-light_bg_50 dark:bg-dark_bg_600 
                border-light_border dark:border-dark_bg_500 
                  hover:bg-light_bg_100 dark:hover:bg-dark_bg_500"
                onClick={() => querySearcher()}
            >
                <SearchIcon />
            </div>
        </div>
    );
}
export default HeaderInput;