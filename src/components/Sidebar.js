import SidebarCart from "./SidebarCart";

import HomeIcon from "../assets/icons/Home";
import LikeIcon from "../assets/icons/Like";
import TrendingIcon from "../assets/icons/Trending";
import ExpandIcon from "../assets/icons/Expand";
import PlaylistsIcon from "../assets/icons/Playlist";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetchChannels from "../hooks/useFetchChannels";

const SidebarChannel = ({ channelId }) => {
    const channel = useSelector(store => store.channels[channelId]);
    return (
        <SidebarCart url={channel?.profileUrl} text={channel?.title} />
    );
}


const Sidebar = () => {
    const navigate = useNavigate();
    const Devider = () => (<span className=" w-full h-[0.05rem] bg-light_dividerColor dark:bg-dark_dividerColor"></span>)
    const [showAllSubs, setShowAllSubs] = useState(false);
    const [showAllPlaylists, setShowAllPlaylists] = useState(false);
    const isSidebarOpen = useSelector(store => store.states.isSidebarOpen);
    const screenSize = useSelector(store => store.states.deviceSize);
    const subscriptions = useSelector(store => store.userInfo.subscriptionsList);
    const playlists = useSelector(store => store.userInfo.playlists);
    useFetchChannels(subscriptions);
    return (
        <>
            {
                isSidebarOpen &&
                (<div className={`p-2 min-w-[12rem] ${screenSize === "ph" ? "absolute left-0 top-0" : ""} flex flex-col gap-2 z-[100]  bg-light_bg_00 dark:bg-dark_bg_00`}>
                    <SidebarCart Icon={HomeIcon} text={"Home"} click={() => navigate("/")} />
                    <SidebarCart Icon={() => (<TrendingIcon width="1.5rem" />)} text={"Treanding"} click={() => navigate("/trending")} />
                    <Devider />
                    <SidebarCart
                        Component={() => (<>
                            <span className=" font-medium">You</span>
                            <span className=" rotate-[-90deg]">
                                <ExpandIcon />
                            </span>
                        </>)}
                    />
                    <SidebarCart Icon={LikeIcon} text={"Liked Videos"} click={() => navigate("/liked")} />
                    <Devider />
                    <div className="mt-1">
                        <SidebarCart Component={() => (<h1 className=" font-medium text-lg">Subscriptions</h1>)} />
                        {(showAllSubs ? subscriptions : subscriptions?.slice(0, 3))?.map(
                            item => (<SidebarChannel key={item} channelId={item} />))}

                        {subscriptions?.length > 3 && (
                            <SidebarCart
                                click={() => setShowAllSubs(pre => !pre)}
                                Icon={() => (<span className={showAllSubs ? "rotate-[180deg]" : "rotate-[0deg]"}><ExpandIcon /></span>)}
                                text={showAllSubs ? "Show fewer" : `Show ${subscriptions?.length - 3} more`}
                            />)}
                    </div>
                    <Devider />
                    <div className="mt-1">
                        <SidebarCart Component={() => (<h1 className=" font-medium text-lg bg-none hover:bg-none">Playlists</h1>)} />
                        {(showAllPlaylists ? playlists : playlists?.slice(0, 3))?.map(
                            item => (item?.privacyStatus &&
                                (<SidebarCart
                                    key={item?.id}
                                    text={item?.title}
                                    Icon={PlaylistsIcon}
                                    click={() => navigate(`/playlist?list=${item?.id}`)}
                                />)))}

                        {playlists?.length > 3 && (
                            <SidebarCart
                                click={() => setShowAllPlaylists(pre => !pre)}
                                Icon={() => (<span className={showAllPlaylists ? "rotate-[180deg]" : "rotate-[0deg]"}><ExpandIcon /></span>)}
                                text={showAllPlaylists ? "Show fewer" : `Show ${playlists?.length - 3} more`}
                            />)}
                    </div>
                    <h1 className="mt-12 pl-2 cursor-pointer text-light_text_800 dark:text-dark_text_800" onClick={() => navigate("/privacy")}>Privacy Policy</h1>
                    <h1 className="mt-1 pl-2 cursor-pointer file:text-light_text_800 dark:text-dark_text_800" onClick={() => navigate("/terms")}>Terms and Conditions</h1>
                </div>)
            }
        </>);
}
export default Sidebar;