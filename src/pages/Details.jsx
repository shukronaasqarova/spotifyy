import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getToken } from '../utils/utils'; // getToken funktsiyasini import qilish

function Details() {
    const { id } = useParams(); // URL'dan id olish
    const [playlist, setPlaylist] = useState(null); // playlist holatini yaratish

    useEffect(() => {
        const fetchPlaylistDetails = async () => {
            try {
                console.log("Fetching playlist...");
                await getToken(); // Tokenni olish
                const token = localStorage.getItem('token'); // Tokenni olish
                console.log("Token:", token);

                const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Tokenni headerda qo'shish
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json(); // Xato ma'lumotlarini oling
                    console.error('Error details:', errorData); // Xato ma'lumotlarini ko'rsating
                    throw new Error(`HTTP error! status: ${response.status}`); // HTTP xatosi bo'lsa xato tashlash
                }

                const data = await response.json();
                console.log("Fetched data:", data); // Ma'lumotlarni konsolga chiqarish
                setPlaylist(data); // playlist holatini yangilash
            } catch (error) {
                console.error('Error fetching playlist details:', error); // Xato haqida xabar berish
            }
        };

        fetchPlaylistDetails(); // Funksiyani chaqirish
    }, [id]); // id o'zgarganda qayta ishlash

    if (!playlist) {
        return <div>Loading...</div>; // Ma'lumotlar yuklanayotganda ko'rsatish
    }

    return (
        <div className="text-white p-6">
            <h1 className="text-3xl font-bold mb-4">{playlist.name}</h1>
            <p className="text-lg">{playlist.description}</p>
            <h2 className="text-2xl mt-6 mb-2">Tracks</h2>
            <ul>
                {playlist.tracks.items.map((trackItem, index) => (
                    <li key={index} className="mb-2">
                        {trackItem.track.name} - {trackItem.track.artists.map(artist => artist.name).join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Details;
