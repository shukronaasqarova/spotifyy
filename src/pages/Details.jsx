import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlay, FaHeart, FaEllipsisH } from 'react-icons/fa';
import http from '../axios';
import { getToken } from '../utils/utils';

function Details() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        getToken().then(() => {
            const token = localStorage.getItem('token');

            http.get(`https://api.spotify.com/v1/playlists/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setPlaylist(response.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }).catch(err => {
            console.log(err);
        });
    }, [id]);

    return (
        <div className="pb-14" style={{ backgroundColor: '#121212' }}>
            <div className="pl-10 pr-10 pt-10 bg-gradient-to-b from-green-500 to-black text-white playlist-info">
                <div className="flex gap-3 pt-5 items-center">
                    <img className="w-[200px] h-[200px] rounded-lg" src={playlist?.images[0]?.url || 'fallback-image-url'} alt={playlist?.name} />
                    <div className="flex flex-col gap-3">
                        <p className="text-sm font-semibold">PUBLIC PLAYLIST</p>
                        <h1 className="text-6xl font-bold">{playlist?.name}</h1>
                        <p className="text-md">{playlist?.description}</p>
                        <p className="text-sm text-gray-400">Made for {playlist?.owner?.display_name} • {playlist?.tracks?.total} songs</p>
                    </div>
                </div>
                <div className="flex gap-5 mt-8 items-center">
                    <button className="bg-green-500 p-4 rounded-full">
                        <FaPlay size={24} />
                    </button>
                    <FaHeart size={24} className="text-gray-400 cursor-pointer" />
                    <FaEllipsisH size={24} className="text-gray-400 cursor-pointer" />
                </div>
            </div>

            <div className="pl-10 pr-10 mt-6">
                <h2 className="text-2xl mb-4 text-white">Tracks</h2>
                <table className="w-full text-left text-gray-400">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="pb-2">#</th>
                            <th className="pb-2">TITLE</th>
                            <th className="pb-2">ALBUM</th>
                            <th className="pb-2">DATE ADDED</th>
                            <th className="pb-2 text-right">TIME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playlist?.tracks?.items.map((trackItem, index) => (
                            <tr key={index} className="border-b border-gray-800 hover:bg-gray-800">
                                <td className="py-2">{index + 1}</td>
                                <td className="py-2">
                                    <div className="flex items-center gap-3">
                                        <img className="w-10 h-10 rounded" src={trackItem.track.album.images[0]?.url || 'fallback-image-url'} alt={trackItem.track.name} />
                                        <div>
                                            <p className="text-white">{trackItem.track.name}</p>
                                            <p className="text-xs text-gray-400">{trackItem.track.artists.map(artist => artist.name).join(', ')}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2">{trackItem.track.album.name}</td>
                                <td className="py-2">{new Date(trackItem.added_at).toLocaleDateString()}</td>
                                <td className="py-2 text-right">{Math.floor(trackItem.track.duration_ms / 60000)}:{('0' + Math.floor((trackItem.track.duration_ms % 60000) / 1000)).slice(-2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Details;
