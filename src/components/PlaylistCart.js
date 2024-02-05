import React from 'react';
import { useSelector } from 'react-redux';

const PlaylistCart = ({ playlistId }) => {
    const playlist = useSelector(store => store?.playlists?.[playlistId]?.info);
    return (
        <div>
            <div className=' relative'>
                <img
                    src={playlist?.defaultThumbnail}
                    className="w-full aspect-video"
                    alt="playlistThumbnail"
                />
                <span className="bg-grayTrans px-4 py-1 rounded-full absolute bottom-3 right-3" >{`${playlist?.itemCount} videos`}</span>
            </div>
            <h1>{playlist?.title.slice(0, 24)}</h1>
            <p className=' cursor-pointer'>view full playlist</p>
        </div>
    );
}

export default PlaylistCart;