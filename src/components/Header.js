import HeaderAuthanticatin from "./HeaderAuthanticatin";
import HeaderTheme from "./HeaderTheme";
import HeaderSearch from "./HeaderSearch";
import MenuIcon from "../assets/icons/Menu";
import xTubeIcon from "../assets/icons/x-tubeLogo.png";

import { useDispatch } from "react-redux";
import { toggleSidebarOpen } from "../store/slices/state";
import { useNavigate } from "react-router";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (<>
        <div className="px-4 py-2 flex items-center justify-between shadow-md relative z-[100]">
            <div className="flex items-center">
                <div
                    className={"cursor-pointer rounded-full p-2 bg-light_bg_50"
                        + " hover:bg-light_bg_100"
                        + " dark:bg-dark_bg_600 dark:hover:bg-dark_bg_500"
                    }
                    onClick={() => dispatch(toggleSidebarOpen({ type: "reverse" }))}
                >
                    <MenuIcon />
                </div>
                <div onClick={() => navigate("/")} className="flex cursor-pointer">
                    <img
                        src={xTubeIcon}
                        className="w-8 ml-2 mr-1"
                        alt="ytIcon"
                    />
                    <span className="font-semibold text-xl dark:text-dark_text_1000">Xtube</span>
                </div>
            </div>
            <HeaderSearch />
            <div className={"flex gap-2 justify-center items-center"}>
                <HeaderTheme />
                <HeaderAuthanticatin />
            </div>
        </div>
    </>
    );
}
export default Header;