import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlay, FaHeart, FaEllipsisH } from 'react-icons/fa';
import http from '../axios';
import { getToken } from '../utils/utils';
import '../App.css';

function Details() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [playingTrackId, setPlayingTrackId] = useState(null);
    const [audio, setAudio] = useState(null);
    const [likedTracks, setLikedTracks] = useState(new Set(JSON.parse(localStorage.getItem('likedTracks')) || []));

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

    const handlePlayPause = (url, trackId) => {
        if (audio && playingTrackId === trackId) {
            audio.pause();
            setPlayingTrackId(null);
        } else {
            if (audio) audio.pause();
            const newAudio = new Audio(url);
            newAudio.play();
            setAudio(newAudio);
            setPlayingTrackId(trackId);

            newAudio.onended = () => {
                setPlayingTrackId(null);
            };
        }
    };

    const toggleLike = (trackId) => {
        setLikedTracks(prevLikedTracks => {
            const updatedLikes = new Set(prevLikedTracks);
            if (updatedLikes.has(trackId)) {
                updatedLikes.delete(trackId);
            } else {
                updatedLikes.add(trackId);
            }
            localStorage.setItem('likedTracks', JSON.stringify(Array.from(updatedLikes)));
            return updatedLikes;
        });
    };

    return (
        <div className="pb-14 bg-[#121212]">
            <div className="pl-10 pr-10 pt-10 pb-6 bg-gradient-to-b from-[#1e3264] to-[#121212] text-white">
                <div className="flex items-center gap-6">
                    <img className="w-[200px] h-[200px] rounded-lg shadow-lg" src={playlist?.images[0]?.url || 'fallback-image-url'} alt={playlist?.name} />
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase tracking-widest">Public Playlist</p>
                        <h1 className="text-6xl font-bold leading-tight">{playlist?.name}</h1>
                        <p className="text-sm mt-2 text-gray-300">{playlist?.description}</p>
                        <p className="text-xs text-gray-400 mt-2">Made for {playlist?.owner?.display_name} • {playlist?.tracks?.total} songs</p>
                    </div>
                </div>
                <div className="flex gap-5 mt-6 items-center">
                    <button
                        className="bg-green-500 p-5 rounded-full hover:bg-green-600 transition duration-200 ease-in-out shadow-lg"
                        onClick={() => handlePlayPause(playlist?.tracks?.items[0]?.track.preview_url, playlist?.tracks?.items[0]?.track.id)}
                    >
                        <FaPlay size={24} />
                    </button>
                    <FaEllipsisH size={24} className="text-gray-400 cursor-pointer hover:text-white transition duration-200" />
                </div>
            </div>

            <div className="pl-10 pr-10 mt-6">
                <table className="w-full text-left text-gray-400">
                    <thead>
                        <tr className="border-b border-gray-700 text-sm">
                            <th className="pb-2">#</th>
                            <th className="pb-2">TITLE</th>
                            <th className="pb-2">ALBUM</th>
                            <th className="pb-2 text-right">LIKE</th>
                            <th className="pb-2 text-right">TIME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playlist?.tracks?.items.map((trackItem, index) => {
                            const isPlaying = playingTrackId === trackItem.track.id;
                            return (
                                <tr
                                    key={index}
                                    className="border-b border-gray-800 hover:bg-gray-800 transition-colors duration-150"
                                    onClick={() => handlePlayPause(trackItem.track.preview_url, trackItem.track.id)}
                                >
                                    <td className="py-2">{isPlaying ? <div className="flex items-center gap-1 animate-pulse text-green-500"><span className="bar bar1">|</span><span className="bar bar2">||</span><span className="bar bar3">|</span></div> : index + 1}</td>
                                    <td className="py-2 flex items-center gap-3">
                                        <img className="w-10 h-10 rounded" src={trackItem.track.album.images[0]?.url || 'fallback-image-url'} alt={trackItem.track.name} />
                                        <div>
                                            <p className={`font-medium ${isPlaying ? 'text-green-500' : 'text-white'}`}>{trackItem.track.name}</p>
                                            <p className="text-xs text-gray-400">{trackItem.track.artists.map(artist => artist.name).join(', ')}</p>
                                        </div>
                                    </td>
                                    <td className="py-2">{trackItem.track.album.name}</td>
                                    <td className="py-2 text-right">
                                        <FaHeart
                                            className={`cursor-pointer ${likedTracks.has(trackItem.track.id) ? 'text-green-500' : 'text-white'}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleLike(trackItem.track.id);
                                            }}
                                        />
                                    </td>
                                    <td className="py-2 text-right">{Math.floor(trackItem.track.duration_ms / 60000)}:{Math.floor((trackItem.track.duration_ms % 60000) / 1000).toString().padStart(2, '0')}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Details;
