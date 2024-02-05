import { useEffect, useState } from "react";
import Comment from "./Comment";
import CommentInputBox from "./CommentInputBox";
import { useSelector } from "react-redux"
import useFetchComments from "../hooks/useFetchComments";
import Loader from "./Loader";

const CommentsSection = ({ videoId }) => {
    const [fetchingState, setFetchingState] = useState("");
    const getComments = useFetchComments(videoId);

    const userChannelId = useSelector(store => store?.states?.userChannelId);
    const comments = useSelector(store => store?.comments[videoId]);
    useEffect(() => {
        const element = document.getElementById("commentSectionInfiniteScroll");
        let status = "";
        const observer = new IntersectionObserver((items, obs) => {

            if (!status && items[0].isIntersecting) {
                setFetchingState("loading");
                status = "loading";
                getComments(comments?.nextPageToken)
                    .then(() => {
                        status = "";
                        setFetchingState("");
                    });
                obs.unobserve(items[0].target);
            }
        },
            {
                rootMargin: "250px"
            });
        observer.observe(element);
    }, [comments]);

    return (
        <div className="mt-4">
            <h1 className={"text-2xl font-medium"
                + " text-light_text_900 dark:text-dark_text_900"
            }>
                Comments</h1>
            {userChannelId && (<CommentInputBox videoId={videoId} />)}
            <div>
                {comments && comments?.items.map(item => (<Comment key={item?.commentId} data={item} />))}
            </div>
            <div id="commentSectionInfiniteScroll"></div>
            {fetchingState === "loading" && (<Loader />)}
        </div>
    );
}

export default CommentsSection;