import LikeIcon from "../assets/icons/Like";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { countHandler, howOldTimeHandler } from "../utils/functions";
import SubscribeButton from "./SubscribeButton";

const WatchingVideo = ({ videoId }) => {

    const [fullDiscription, setFullDiscription] = useState(false);
    const navigate = useNavigate();

    const video = useSelector(store => store.videos?.[videoId]);
    const ChannelInfo = useSelector(store => store?.channels?.[video?.channelId]);
    return (
        <div className="mt-1">
            <h1 className={"mt-3 text-xl font-medium"
                + " text-light_text_1000 dark:text-dark_text_1000"
            }
            >
                {video?.title}
            </h1>
            <div className="flex items-center justify-between">
                <div className="mt-1 flex items-center gap-5">
                    <img
                        src={ChannelInfo?.profileUrl}
                        className="w-[3.2rem] h-[3.2rem] rounded-full border"
                        alt="ChannelProfile"
                    />
                    <div>
                        <h2
                            onClick={() => navigate(`/channel?id=${video?.channelId}`)}
                            className={"text-base font-medium cursor-pointer"
                                + " text-light_text_1000 dark:text-dark_text_1000"
                            }
                        >
                            {video?.channelTitle}
                        </h2>
                        <p className="text-sm text-light_text_800 dark:text-dark_text_800"
                        >
                            {`${countHandler(ChannelInfo?.subscriberCount)} subscribers`}
                        </p>
                    </div>
                    <SubscribeButton channelId={video?.channelId} />
                </div>
                <div className="px-4 py-2 rounded-full flex w-fit gap-3 bg-light_bg_20 dark:bg-dark_bg_200">
                    <div className="rounded-s-2xl flex gap-1 border-r border-light_text_1000 dark:border-dark_text_1000 pr-3">
                        <LikeIcon />
                        <span
                            className=" font-medium text-light_text_1000 dark:text-dark_text_1000"
                        >{countHandler(video?.likeCount)}</span>
                    </div>
                    <span className=" rotate-180"><LikeIcon /></span>
                </div>
            </div>
            <div
                className={`mt-4 rounded-lg p-4 bg-light_bg_200 hover:bg-light_bg_50 dark:bg-dark_bg_800 dark:hover:bg-dark_bg_700 ${fullDiscription ? 'cursor-default' : 'cursor-pointer'}`}
                onClick={() => setFullDiscription(true)}
            >
                <p
                    className={"py-1 font-medium "
                        + " text-light_text_900 dark:text-dark_text_900"
                    }
                >
                    {`${countHandler(video?.viewCount)} views • ${howOldTimeHandler(video?.publishedAt)}`}
                </p>
                <p
                    style={{ whiteSpace: "pre-line" }}
                    className=" text-light_text_800 dark:text-dark_text_800"
                >
                    {fullDiscription ? video?.description : video?.description.slice(0, 430)}
                </p>
                {fullDiscription ?
                    (<h1
                        onClick={(e) => {
                            setFullDiscription(false);
                            e.stopPropagation();
                        }}
                        className={"text-right font-medium cursor-pointer"
                            + " text-light_text_900 dark:text-dark_text_900"
                        }
                    >
                        Show less
                    </h1>)
                    :
                    (<h1
                        className={"text-right font-medium "
                            + " text-light_text_900 dark:text-dark_text_900"
                        }
                    >View Full Discription</h1>)
                }
            </div>
        </div>
    );
}

export default WatchingVideo;