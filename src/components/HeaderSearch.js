import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import HeaderInput from "./HeaderInput";
import SearchIcon from "../assets/icons/Search";
import ArrowIcon from "../assets/icons/Arrow";
    
const HeaderSearch = () => {

    const [showInput, setShowInput] = useState(false);
    const screenSize = useSelector(store => store.states.deviceSize);

    useEffect(() => {
        window.addEventListener('resize', () => setShowInput(false));
        return () => window.removeEventListener('resize', setShowInput(false));
    }, []);
    return (
        <>
            {screenSize === "ph" ?
                (<div
                    className={"flex items-center justify-center cursor-pointer rounded-full p-2 bg-light_bg_50"
                        + " hover:bg-light_bg_100"
                        + " dark:bg-dark_bg_600 dark:hover:bg-dark_bg_500"
                    }
                    onClick={(e) => setShowInput(true)}
                >
                    <SearchIcon />
                </div>)
                :
                (<HeaderInput screenSize={screenSize} />)
            }
            {showInput &&
                (<div className={"py-3 px-4 flex absolute left-0 right-0 bg-light_bg_50"
                    + " dark:bg-dark_bg_600 dark:hover:bg-dark_bg_500"
                }>
                    <div
                        className={"mr-8 cursor-pointer rounded-full p-2"
                            + " hover:bg-light_bg_100"
                        }
                        onClick={() => setShowInput(false)}
                    >
                        <ArrowIcon />
                    </div>
                    <HeaderInput />
                </div>)
            }
        </>
    )
}

export default HeaderSearch;