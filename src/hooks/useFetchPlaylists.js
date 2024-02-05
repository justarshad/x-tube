import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { YT_PLAYLIST_WITH_API_KEY } from "../utils/apiConstent";
import { addPlaylists } from "../store/slices/playlists";

const useFetchPlaylists = (playlistIds) => {
    const dispatch = useDispatch();
    const existing = useSelector(store => store.playlists);
    const ids = playlistIds?.filter(id => existing?.[id] ? false : true)?.join(',');

    useEffect(() => {
        (async () => {
            try {
                if (ids?.length > 0) {
                    const res = await fetch(YT_PLAYLIST_WITH_API_KEY
                        + "&part=contentDetails,id,localizations,snippet,status"
                        + "&maxResults=50"
                        + `&id=${ids}`
                    );
                    const data = await res.json();

                    const items = data?.items.map(item => {

                        const { id } = item;
                        const { publishedAt, channelId, title, description, channelTitle } = item?.snippet;
                        const { thumbnails } = item?.snippet;
                        const { privacyStatus } = item?.status;
                        const { itemCount } = item?.contentDetails;

                        return {
                            playlistId: id,
                            publishedAt,
                            channelId,
                            title,
                            description,
                            channelTitle,
                            privacyStatus,
                            itemCount,
                            defaultThumbnail: thumbnails?.default?.url,
                            mediumThumbnail: thumbnails?.medium?.url,
                            highThumbnail: thumbnails?.high?.url,
                            standardThumbnail: thumbnails?.standard?.url,
                            maxresThumbnail: thumbnails?.maxres?.url,
                        }
                    });
                    dispatch(addPlaylists(items));
                }
            } catch (err) { }
        })();

    }, [ids]);
}
export default useFetchPlaylists;