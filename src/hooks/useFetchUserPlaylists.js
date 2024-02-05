import { useEffect } from "react"
import { YT_PLAYLIST } from "../utils/apiConstent";
import { useDispatch, useSelector } from "react-redux";
import { addPlaylists } from "../store/slices/userInfo";
import { updateAuthenticationStatus } from "../store/slices/state";

const useFetchUserPlaylists = () => {
    const dispatch = useDispatch();
    const authenticationStatus = useSelector(store => store.states.isUserAuthenticated);
    useEffect(() => {

        if (authenticationStatus) {
            (
                async () => {

                    try {
                        const res = await fetch(YT_PLAYLIST
                            + `?part=snippet,status,contentDetails,id,localizations`
                            + `&mine=true`
                            + `&maxResults=50`
                            ,
                            {
                                method: "GET",
                                headers: {
                                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('authInfo')).access_token}`,
                                }
                            }
                        );

                        const data = await res.json();

                        const list = data?.items?.map((item) => {
                            const { id } = item;
                            const { publishedAt, channelId, title, description, channelTitle } = item?.snippet;
                            const { url } = item?.snippet?.thumbnails?.default;
                            const { privacyStatus } = item?.status;
                            const { itemCount } = item?.contentDetails;

                            return {
                                thumbnailUrl: url,
                                id,
                                publishedAt,
                                channelId,
                                title,
                                description,
                                channelTitle,
                                privacyStatus,
                                itemCount,
                            }
                        });
                        if (data?.error) {
                            dispatch(updateAuthenticationStatus(false));
                        }
                        else {
                            dispatch(addPlaylists(list));
                        }
                    }
                    catch (err) { }
                }
            )();
}
    }, [authenticationStatus])
};

export default useFetchUserPlaylists;