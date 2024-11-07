import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

function Likes() {
    const [likedTracks, setLikedTracks] = useState([]);

    useEffect(() => {
        const storedTracks = JSON.parse(localStorage.getItem('likedTracks')) || [];
        
        console.log("Stored tracks from localStorage:", storedTracks);

        setLikedTracks(storedTracks);
    }, []);

    const handleRemoveTrack = (trackId) => {
        const updatedTracks = likedTracks.filter(track => track.id !== trackId);
        
        localStorage.setItem('likedTracks', JSON.stringify(updatedTracks));

        setLikedTracks(updatedTracks);
    };

    return (
        <div className="p-10 bg-[#121212] text-white">
            <h1 className="text-3xl font-bold mb-4">Yoqtirgan Treklar</h1>
            <table className="w-full text-left text-gray-400">
                <thead>
                    <tr className="border-b border-gray-700 text-sm">
                        <th className="pb-2">#</th>
                        <th className="pb-2">TITUL</th>
                        <th className="pb-2 text-right">LIKE</th>
                    </tr>
                </thead>
                <tbody>
                    {likedTracks.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="py-4 text-center text-gray-500">Hozircha yoqtirilgan treklar yo'q</td>
                        </tr>
                    ) : (
                        likedTracks.map((track, index) => {
                            console.log("Track:", track);

                            return (
                                <tr key={track.id} className="border-b border-gray-800 hover:bg-gray-800 transition-colors duration-150">
                                    <td className="py-2">{index + 1}</td>
                                    <td className="py-2">{track.title ? track.title : 'Noma’lum trek'}</td>
                                    <td className="py-2 text-right">
                                        <FaHeart
                                            className="text-green-500 cursor-pointer"
                                            onClick={() => handleRemoveTrack(track.id)} 
                                        />
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Likes;
