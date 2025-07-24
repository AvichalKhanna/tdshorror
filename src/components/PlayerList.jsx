import avatar1 from "../assets/avatar1.png";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, HeartOff } from "lucide-react";

const colors = [
  "bg-gradient-to-tr from-red-900 to-black",
  "bg-gradient-to-tr from-green-900 to-black",
  "bg-gradient-to-tr from-purple-900 to-black",
  "bg-gradient-to-tr from-blue-900 to-black"
];

export default function PlayerList({
  players = [
    { name: "Player 1", hearts: 3 },
    { name: "Player 2", hearts: 2 },
    { name: "Player 3", hearts: 3 },
    { name: "Player 4", hearts: 1 },
  ],
  TitleText = "Welcome to TDS-GHOST",
  CaptionText = "Conjure the Spirits",
  Button1 = "Start Game",
  Button2 = "",
  Button3 = "",
  onclickbutton1 = () => {},
  onclickbutton2 = () => {},
  onclickbutton3 = () => {},
}) {
  const containerRef = useRef(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCenter = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCenter({ x: rect.width / 2, y: rect.height / 2 });
      }
    };
    updateCenter();
    window.addEventListener("resize", updateCenter);
    return () => window.removeEventListener("resize", updateCenter);
  }, []);

  const radius_x = Math.min(window.innerWidth * 0.38, 400);
  const radius_y = Math.min(window.innerHeight * 0.80, 250);

  return (
    <div
      ref={containerRef}
      className="absolute w-[100vw] h-[100vh] overflow-hidden"
    >
      {/* Central Ritual Zone */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          flex flex-col items-center justify-center z-50 
          rounded-2xl p-6 space-y-4 w-[90vw] max-w-sm shadow-xl">

        <img 
          src={avatar1}
          alt="avatar"
          className="rounded-full w-[100px] h-[100px] border-4 border-red-600 shadow-md ring-4 ring-black ring-offset-4"
        />

        {/* Title Text */}
        <motion.p 
          className="text-3xl font-bold text-red-500 text-center flicker"
          style={{ fontFamily: "Nosifer" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {TitleText}
        </motion.p>

        {/* Caption Text */}
        <p 
          className="text-xl text-white/80 text-center italic flicker-soft"
          style={{ fontFamily: "Creepster" }}
        >
          {CaptionText}
        </p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 pt-2">
          {Button1 && (
            <button
              onClick={onclickbutton1}
              className="px-4 py-2 bg-red-700 hover:bg-red-900 text-white rounded-lg text-sm transition-all duration-300 shadow-md border border-red-400"
              style={{ fontFamily: "Creepster" }}
            >
              {Button1}
            </button>
          )}
          {Button2 && (
            <button
              onClick={onclickbutton2}
              className="px-4 py-2 bg-red-700 hover:bg-red-900 text-white rounded-lg text-sm transition-all duration-300 shadow-md border border-red-400"
              style={{ fontFamily: "Creepster" }}
            >
              {Button2}
            </button>
          )}
          {Button3 && (
            <button
              onClick={onclickbutton3}
              className="px-4 py-2 bg-red-700 hover:bg-red-900 text-white rounded-lg text-sm transition-all duration-300 shadow-md border border-red-400"
              style={{ fontFamily: "Creepster" }}
            >
              {Button3}
            </button>
          )}
        </div>
      </div>

      {/* Ghost Player Orbits */}
      {players.map((player, index) => {
        const angle = (360 / players.length) * index;
        const radians = (angle * Math.PI) / 180;
        const x = center.x + radius_x * Math.cos(radians) - 40;
        const y = center.y + radius_y * Math.sin(radians) - 40;

        return (
          <div
            key={player.name + index}
            className="absolute flex flex-col justify-center items-center"
            style={{ top: `${y}px`, left: `${x}px` }}
          >
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, -6, 0, 6, 0] }}
              transition={{ duration: 4 + index * 0.2, repeat: Infinity }}
              className={`rounded-full w-20 h-20 flex items-center justify-center
                          border-2 shadow-md ${colors[index % colors.length]}
                          ${player.isHolding ? "border-green-600" : "border-white/30"}`}
            >
              <p
                className="text-white text-xl font-extrabold"
                style={{ fontFamily: "Nosifer" }}
              >
                {player.name[0]}
              </p>
            </motion.div>

            {/* Full Name */}
            <p
              className="text-sm text-white mt-1"
              style={{ fontFamily: "Creepster" }}
            >
              {player.name}
            </p>

            {/* Heart Lives */}
            <div className="flex space-x-1 mt-1">
              {Array.from({ length: player.hearts }).map((_, i) => (
                <Heart key={i} className="text-red-500 w-4 h-4" />
              ))}
              {Array.from({ length: 3 - player.hearts }).map((_, i) => (
                <HeartOff key={i} className="text-white/40 w-4 h-4" />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
