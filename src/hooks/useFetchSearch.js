import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { YT_SEARCH_API } from "../utils/apiConstent";
import { addQuery } from "../store/slices/query";

const useFetchSearch = (query) => {
    const dispatch = useDispatch();
    const isQueryExist = useSelector(store => store?.query[query] ? true : false);

    useEffect(() => {
        (async () => {
            try {
                if (!isQueryExist && query) {
                    const res = await fetch(YT_SEARCH_API +
                        "&maxResults=50" +
                        "&safeSearch=strict" +
                        "&regionCode=IN" +
                        `&q=${query}`
                    );

                    const data = await res.json();
                    let list = [];

                    data?.items?.map(item => {

                        if (item?.id?.kind === "youtube#video") {
                            const { videoId } = item?.id;
                            list.push({
                                type: "video",
                                videoId,
                            });
                        }

                        if (item?.id?.kind === "youtube#channel") {
                            const { channelId } = item?.id;
                            list.push({
                                type: "channel",
                                channelId,
                            });
                        }

                    });
                    dispatch(addQuery({ query, items: list }));
                }
            } catch (err) { }
        })();
    }, [query]);
};
export default useFetchSearch;