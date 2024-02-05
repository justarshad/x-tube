import { useDispatch, useSelector } from "react-redux";
import { YT_PLAYLISTITEMS_WITH_API_KEY } from "../utils/apiConstent";
import { addPlaylistItems } from "../store/slices/playlists";

const useFetchPlaylistItems = (playlistId) => {
    const dispatch = useDispatch();
    const firstPageExist = useSelector(store => store?.[playlistId]?.items ? true : false);
    const existingNextPageToken = useSelector(store => store?.[playlistId]?.nextPageToken);
    return async (nextPageToken) => {

        try {
            if ((!firstPageExist && !nextPageToken) || nextPageToken !== existingNextPageToken) {

                const suffix = nextPageToken ? `&pageToken=${nextPageToken}` : "";
                const res = await fetch(YT_PLAYLISTITEMS_WITH_API_KEY
                    + `&part=contentDetails`
                    + `&playlistId=${playlistId}`
                    + `&maxResults=50`
                    + suffix
                );
                const data = await res.json();
                const items = data?.items?.map(item => item?.contentDetails?.videoId);

                if (items) {
                    dispatch(addPlaylistItems({
                        playlistId,
                        items,
                        nextPageToken: data?.nextPageToken ? data?.nextPageToken : ""
                    }));
                }
            }
        } catch (err) { }
    }
}
export default useFetchPlaylistItems;