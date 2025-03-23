'use client';

import { useEffect, useState } from 'react';

const gifs = [
  '/loading/loading1.gif',
  '/loading/loading2.gif',
  '/loading/loading3.gif',
];

export default function Loading() {
  const [gif, setGif] = useState(gifs[0]);

  useEffect(() => {
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
    setGif(randomGif);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <img src={gif} alt="Loading..." className="w-48 h-48" />
    </div>
  );
}
