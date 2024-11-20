import React, { useState, useEffect } from 'react';

// Dummy list of music files (this would be dynamic in a real app)
const musicFiles = [
  { name: 'Song 1', artist: 'Artist 1', file: '1.mp3' },
  { name: 'Song 2', artist: 'Artist 2', file: '2.mp3' },
  { name: 'Song 3', artist: 'Artist 3', file: '3.mp3' },
  { name: 'Song 4', artist: 'Artist 4', file: '4.mp3' },
  { name: 'Song 5', artist: 'Artist 5', file: '5.mp3' },
  { name: 'Song 6', artist: 'Artist 6', file: '6.mp3' },
  {name: 'Song 7', artist: 'Artist 7', file: 'Bisrat_Surafel_-_Yebet_Sira___%E1%8B%A8%E1%89%A4%E1%89%B5_%E1%88%B5%E1%88%AB_-_New_Ethiopian_Music_2018__Official_Video_(256k).mp3'},
  {name: 'Song 8', artist: 'Artist 8', file: 'Bisrat_Surafel_-Ateteyekuwat-_አትጠይቋት_-_New_Ethiopian_Music_2.mp3'},
  {name: 'Song 9', artist: 'Artist 9', file: 'DAADOO_Oromo_Music_by_Dinkisa_Debela(360p).mp3'},
  {name: 'Song 10', artist: 'Artist 10', file: 'Dagmawi_Tamirat_-_Yhon_Ende.mp3'},
  {name: 'Song 11', artist: 'Artist 11', file: 'Daniel_Caesar_-_Best_Part_ft._H.E.R.mp3'},
  {name: 'Song 12', artist: 'Artist 12', file: 'Dawit_Alemayehu_-_Ha_Lemene___ሀ_ለምኔ_-_New_Ethiopian_Music_2017_(Official_Video)(256k).mp3'},
  {name: 'Song 13', artist: 'Artist 13', file: 'Eessa Jirta.mp3'},
  {name: 'Song 14', artist: 'Artist 14', file: 'Ethiopian_Music___Dagmawi_Tamirat_%E1%8B%B3%E1%8C%8D%E1%88%9B%E1%8B%8A_%E1%89%B3%E1%88%9D%E1%88%AB%E1%89%B5__%E1%8B%AD%E1%88%86%E1%8A%95_%E1%8A%A5%E1%8A%95%E1%8B%B4__-_New_Ethiopian_Music_2022_Official_Vid....mp3'},
  {name: 'Song 15', artist: 'Artist 15', file: 'Ethiopian_Music__Mykey_Shewa_-_ፍንዳታ_(Fendata)_New_Ethiopian_Animated_music_video_2020_(Visualizer)(256k).mp3'},
  // Add more music file objects as needed
  {name: 'Song 16', artist: 'Artist 16', file: 'Goota Koo.mp3'},
  {name: 'Song 17', artist: 'Artist 17', file: 'Kendrick Lamar_-_Bitch_Don_t_Kill_My_Vibe.mp3'},
  {name: 'Song 18', artist: 'Artist 18', file: 'kent_Jone_-_Don_t_Mind.mp3'},
  {name: 'Song 19', artist: 'Artist 19', file: 'Yene Zema CD 1 TRACK 14 (128).mp3'},
];

const MusicCard = ({ name, artist, file }) => {
  return (
    <div className="max-w-xs w-full bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
      <img 
        src="../assets/music.jpg" 
        alt="Album Art" 
        className="w-full h-48 object-cover rounded-t-lg" 
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{artist}</p>
        <audio controls className="w-full">
          <source src={`/assets/music/${file}`} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

const Home = () => {
  const [musicList, setMusicList] = useState([]);

  useEffect(() => {
    // Simulate loading music files (this would be dynamic in a real app)
    setMusicList(musicFiles);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Music Library</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {musicList.length === 0 ? (
          <p className="text-center col-span-full text-lg text-gray-600">Loading music...</p>
        ) : (
          musicList.map((music, index) => (
            <MusicCard
              key={index}
              name={music.name}
              artist={music.artist}
              file={music.file}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
