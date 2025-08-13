import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import GameModeCover from './GameModeCover';


const modes = [
  { name: 'Family'},
  { name: 'Fun'},
  { name: 'Crazy'},
  { name: 'Extreme'},
  { name: 'Haunted'},
  { name: 'Nightmare'},
];

const preloadImages = (srcArray) => {
  srcArray.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

export default function ScrollableGameModeSelector({ setMode }) {
  const scrollRef = useRef(null);
  const [selected, setSelected] = useState(0);


useEffect(() => {
  const container = scrollRef.current;
  if (!container) return;

  let timeoutId;

  const handleScroll = () => {
    // Only after user *stops* scrolling
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const children = [...container.children];
      const center = container.scrollLeft + container.offsetWidth / 2;
      let closest = 0;
      let minDist = Infinity;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const boxCenter = child.offsetLeft + child.offsetWidth / 2;
        const dist = Math.abs(center - boxCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      }

      setSelected((prev) => (prev !== closest ? closest : prev));
      setMode((prev) => (prev !== closest ? closest : prev));
    }, 50); // <- delay increased to reduce updates
  };

  container.addEventListener('scroll', handleScroll, { passive: true });
  return () => container.removeEventListener('scroll', handleScroll);
}, []);


  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-10 pt-8">
      <h2 className="text-3xl sm:text-4xl text-red-600 mb-4" style={{ fontFamily: 'Creepster' }}>
        Select Your Game Mode
      </h2>

      <div className='flex justify-between w-full h-fit sm:space-x-5 items-center'>

      <ArrowLeft className="w-[50px] h-[50px]"/>

      <div
        ref={scrollRef}
        className="w-full max-w-6xl flex overflow-x-scroll scroll-smooth hide-scrollbar py-4 sm:pl-[9vw] pr-40"
        style={{ height: '260px' }}
      >
        {modes.map((mode, index) => {
          const isSelected = index === selected;
          return (
            <div
              key={mode.name}
              className={`flex-shrink-0 flex flex-col items-center transition-all duration-300
                sm:mx-15 mx-6
                ${isSelected ? 'scale-110' : 'opacity-60'}
              `}
              style={{ width: '180px' }}
            >
              <div
                className={`rounded-xl overflow-hidden border-4 transition-all duration-300 shadow-md
                    border-transparent
                  ${isSelected ? '' : ''}
                `}
                style={{ width: '180px', height: '220px' }}
              >
                <GameModeCover mode={mode.name}/>
                {/*<img
                  src={mode.image}
                  alt={mode.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                  draggable="false"
                />*/}
              </div>
              <p
                className={`mt-3 text-base font-semibold transition-all duration-300 ${
                  isSelected ? 'text-red-400' : 'text-white'
                }`}
                style={{ fontFamily: 'Pirata One, serif' }}
              >
                {mode.name}
              </p>
            </div>
          );
        })}
      </div>

      <ArrowRight className="w-[50px] h-[50px]"/>

      </div>
      <div className="mt-6 text-lg text-white font-medium tracking-wide"
      style={{ fontFamily:"Creepster"}}>
        You Chose: <span className="text-red-500 font-bold">{modes[selected].name}</span>
      </div>
    </div>
  );
}
