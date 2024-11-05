import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../axios';

function Home() {
    const [playlists, setPlaylists] = useState([]);
    const [homePlaylist, setHomePlaylist] = useState([]);
    const [categoryPlaylists1, setCategoryPlaylists1] = useState([]);
    const [categoryPlaylists2, setCategoryPlaylists2] = useState([]);
    const [categoryPlaylists3, setCategoryPlaylists3] = useState([]);
    const [showAllHome, setShowAllHome] = useState(false);
    const [showAllCategory, setShowAllCategory] = useState([false, false, false]);

    useEffect(() => {
        http.get('featured-playlists')
            .then(response => {
                setPlaylists(response.data.playlists.items.slice(0, 6));
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        http.get('categories/toplists/playlists')
            .then(response => {
                setHomePlaylist(response.data.playlists.items);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        http.get('categories/0JQ5DAqbMKFQ00XGBls6ym/playlists')
            .then(response => {
                setCategoryPlaylists1(response.data.playlists.items);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        http.get('categories/0JQ5DAqbMKFLVaM30PMBm4/playlists')
            .then(response => {
                setCategoryPlaylists2(response.data.playlists.items);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        http.get('categories/0JQ5DAqbMKFCbimwdOYlsl/playlists')
            .then(response => {
                setCategoryPlaylists3(response.data.playlists.items);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const handleSeeAllHome = () => {
        setShowAllHome(true);
    };

    const handleSeeAllCategory = (index) => {
        const updatedShowAllCategory = [...showAllCategory];
        updatedShowAllCategory[index] = true;
        setShowAllCategory(updatedShowAllCategory);
    };

    return (
        <div className='bg-gray-900 min-h-screen text-white'>
            <div className='bg-gradient-to-r from-blue-700 via-blue-900 to-black p-6'>
                <h1 className='text-4xl font-bold mb-6 text-white'>Good Afternoon</h1>
                <div className='flex'>
                    <div className='flex flex-col w-1/2'>
                        {playlists.slice(0, 3).map((playlist) => (
                            <div key={playlist.id} className='flex items-center mb-4'>
                                <img className='w-20 h-20 mr-4 rounded-lg' src={playlist.images[0]?.url || 'fallback-image-url'} alt={playlist.name} />
                                <h2 className='text-lg font-semibold text-white'>{playlist.name}</h2>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col w-1/2'>
                        {playlists.slice(3, 6).map((playlist) => (
                            <div key={playlist.id} className='flex items-center mb-4'>
                                <img className='w-20 h-20 mr-4 rounded-lg' src={playlist.images[0]?.url || 'fallback-image-url'} alt={playlist.name} />
                                <h2 className='text-lg font-semibold text-white'>{playlist.name}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Your top mixes */}
            <div>
                <div className='flex justify-between items-center m-5'>
                    <h3 className='text-[30px] font-bold leading-[38px]'>Your top mixes</h3>
                    <button className='text-gray-400 hover:text-white transition-colors' onClick={handleSeeAllHome}>SEE ALL</button>
                </div>
                <div className='flex flex-wrap justify-center gap-6 p-4'>
                    {(showAllHome ? homePlaylist : homePlaylist.slice(0, 4)).map((playlist) => (
                        <Link key={playlist.id} to={`/playlist/${playlist.id}`} className='bg-[#181818] p-4 rounded-lg shadow-lg w-[180px] hover:bg-gray-800 transition-transform transform hover:scale-105'>
                            <img className='w-full h-36 object-cover rounded-md mb-2' src={playlist.images[0]?.url || 'fallback-image-url'} alt={playlist.name} />
                            <h2 className='text-white font-semibold text-sm mt-2'>{playlist.name}</h2>
                            <h4 className='text-gray-400 text-xs mt-1'>{playlist.description}</h4>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Made for you */}
            <div>
                <div className='flex justify-between items-center m-5'>
                    <h4 className='text-[24px] font-bold leading-[30px]'>Made for you</h4>
                    <button className='text-gray-400 hover:text-white transition-colors' onClick={() => handleSeeAllCategory(0)}>SEE ALL</button>
                </div>
                <div className='flex flex-wrap justify-center gap-6 p-4'>
                    {(showAllCategory[0] ? categoryPlaylists1 : categoryPlaylists1.slice(0, 4)).map((playlist) => (
                        <Link key={playlist.id} to={`/playlist/${playlist.id}`} className='bg-[#181818] p-4 rounded-lg shadow-lg w-[180px] hover:bg-gray-800 transition-transform transform hover:scale-105'>
                            <img className='w-full h-36 object-cover rounded-md mb-2' src={playlist.images[0]?.url || 'fallback-image-url'} alt={playlist.name} />
                            <h2 className='text-white font-semibold text-sm mt-2'>{playlist.name}</h2>
                            <h4 className='text-gray-400 text-xs mt-1'>{playlist.description}</h4>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recently played */}
            <div>
                <div className='flex justify-between items-center m-5'>
                    <h4 className='text-[24px] font-bold leading-[30px]'>Recently played</h4>
                    <button className='text-gray-400 hover:text-white transition-colors' onClick={() => handleSeeAllCategory(1)}>SEE ALL</button>
                </div>
                <div className='flex flex-wrap justify-center gap-6 p-4'>
                    {(showAllCategory[1] ? categoryPlaylists2 : categoryPlaylists2.slice(0, 4)).map((playlist) => (
                        <Link key={playlist.id} to={`/playlist/${playlist.id}`} className='bg-[#181818] p-4 rounded-lg shadow-lg w-[180px] hover:bg-gray-800 transition-transform transform hover:scale-105'>
                            <img className='w-full h-36 object-cover rounded-md mb-2' src={playlist.images[0]?.url || 'fallback-image-url'} alt={playlist.name} />
                            <h2 className='text-white font-semibold text-sm mt-2'>{playlist.name}</h2>
                            <h4 className='text-gray-400 text-xs mt-1'>{playlist.description}</h4>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Jump back in */}
            <div>
                <div className='flex justify-between items-center m-5'>
                    <h4 className='text-[24px] font-bold leading-[30px]'>Jump back in</h4>
                    <button className='text-gray-400 hover:text-white transition-colors' onClick={() => handleSeeAllCategory(2)}>SEE ALL</button>
                </div>
                <div className='flex flex-wrap justify-center gap-6 p-4'>
                    {(showAllCategory[2] ? categoryPlaylists3 : categoryPlaylists3.slice(0, 4)).map((playlist) => (
                        <Link key={playlist.id} to={`/playlist/${playlist.id}`} className='bg-[#181818] p-4 rounded-lg shadow-lg w-[180px] hover:bg-gray-800 transition-transform transform hover:scale-105'>
                            <img className='w-full h-36 object-cover rounded-md mb-2' src={playlist.images[0]?.url || 'fallback-image-url'} alt={playlist.name} />
                            <h2 className='text-white font-semibold text-sm mt-2'>{playlist.name}</h2>
                            <h4 className='text-gray-400 text-xs mt-1'>{playlist.description}</h4>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;