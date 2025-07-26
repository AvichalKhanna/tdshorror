import { useState, useEffect, useRef } from 'react';
import ghost from "../assets/ghost.svg"
import { motion } from 'framer-motion';

import GameModeCarousel from './GameModeCarousel';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [width, setWidth] = useState(window.innerWidth);
    const [selectedMode, setMode] = useState(0);
    useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    const navigate = useNavigate();

  const clicksound = () => {
    const audio = new Audio(`${import.meta.env.BASE_URL}sounds/click.mp3`);
    audio.play();
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const isAudioInitialized = useRef(false);

  const loopSpookySound = () => {
    if (!isAudioInitialized.current) {
      audioRef.current = new Audio(`${import.meta.env.BASE_URL}sounds/haunted.mp3`);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      isAudioInitialized.current = true;
    }

    if (audioRef.current.paused) {
      audioRef.current.play().catch((err) => {
        console.error("Failed to play spooky sound:", err);
      });
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    let wasPlayingBeforeHidden = false;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (audioRef.current && !audioRef.current.paused) {
          wasPlayingBeforeHidden = true;
          audioRef.current.pause();
          setIsPlaying(false);
        }
      } else {
        if (wasPlayingBeforeHidden && audioRef.current) {
          audioRef.current.play().catch((err) => {
            console.error("Failed to resume audio:", err);
          });
          setIsPlaying(true);
          wasPlayingBeforeHidden = false;
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);


    return (
    <>
    <div className='absolute w-[350px] sm:w-fit h-fit
    bg-white/10 rounded-3xl p-6'>
        
        <div className='flex flex-col space-y-5 items-center justify-between h-full py-15 sm:py-2'>
            <p className='bg-clip-text text-transparent 
            bg-gradient-to-b from-white to-red-800/40
            text-3xl '
            style={{ fontFamily:"Nosifer" }}
            >Truth & Dare</p>

            <GameModeCarousel setMode={setMode} />

            <button className='bg-gradient-to-b from-white/50 to-red-800/70
            w-fit h-fit px-4 py-3 rounded-3xl text-2xl
            hover:from-red-900/80 hover:to-white/40 transition-all duration-500 
            ease-in-out'
            onClick={() => {
              clicksound(); // play the sound first
              navigate('/selectplayers', { state: { mode: selectedMode } }); // then navigate
            }}
            style={{fontFamily:"Pirata One"}}
            >Start Game</button>

            <a className='absolute bottom-2 underline' onClick={() => navigate('/attribution')}>Audio Attribution</a>
            <button className='absolute top-4 right-2 bg-gradient-to-b from-white/50 to-red-800/70
            w-fit h-fit px-4 py-3 rounded-3xl text-xl
            hover:from-red-900/80 hover:to-white/40 transition-all duration-500 
            ease-in-out'
            onClick={() => {
              clicksound();
              loopSpookySound();
            }}
            style={{fontFamily:"Pirata One"}}
            >{isPlaying ? "Pause Audio" : "Play Audio"}
            </button>
        </div>

    </div>

    <motion.div
    initial={{ x: '-30vw', y: '5vh'}}
    animate={{ x: ['110vw','-30vw',
                  '-30vw','110vw',
                  '110vw','-30vw'
              ],
               y: ['5vh', '5vh',
                '38vh', '38vh',
                '71vh', '71vh'
               ]
     }}
    transition={{ duration: width*0.08, repeat: Infinity, ease: "linear" }}
    className="absolute top-0 left-0 flex items-center justify-center
    w-45 h-45 opacity-10 overflow-hidden"
  >
    <motion.img
    initial={{ x:0, y:6 }}
    animate={{ x:0, y:[6,-6, 6] }}
    transition={{ duration:3, repeat:Infinity}}
    src={ghost}
    alt="ghost"
    className='w-40 h-40'
    />
    </motion.div>

    </>
    )
}