import React from "react";
import { motion } from "framer-motion";
import { Ghost, Skull, Flame, Zap, Brain, Moon } from "lucide-react";

const icons = {
  Family: <Ghost className="w-10 h-10 text-red-600 animate-bounce drop-shadow" />,
  Fun: <Flame className="w-10 h-10 text-pink-600 animate-spin-slow drop-shadow" />,
  Crazy: <Brain className="w-10 h-10 text-indigo-400 animate-wiggle drop-shadow" />,
  Extreme: <Zap className="w-10 h-10 text-red-500 animate-pulse drop-shadow" />,
  Haunted: <Ghost className="w-10 h-10 text-green-400 animate-flicker drop-shadow" />,
  Nightmare: <Moon className="w-10 h-10 text-purple-500 animate-pulse drop-shadow" />,
};

const modeStyles = {
  Family: {
    cssClass: "family-bg",
    text: "text-red-800",
    font: "Creepster",
  },
  Fun: {
    cssClass: "fun-bg",
    text: "text-pink-700",
    font: "Creepster",
  },
  Crazy: {
    cssClass: "crazy-bg",
    text: "text-white",
    font: "Creepster",
  },
  Extreme: {
    cssClass: "extreme-bg",
    text: "text-red-200",
    font: "Creepster",
  },
  Haunted: {
    cssClass: "haunted-bg",
    text: "text-green-200",
    font: "Creepster",
  },
  Nightmare: {
    cssClass: "nightmare-bg",
    text: "text-purple-200",
    font: "Creepster",
  },
};

const GameModeCover = ({ mode }) => {
  const { cssClass, text, font } = modeStyles[mode] || modeStyles["Fun"];
  const icon = icons[mode] || <Ghost className="w-10 h-10 text-white" />;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      className={`relative w-full h-64 md:h-72 overflow-hidden transform transition hover:scale-105 duration-300 ${cssClass} shadow-xl`}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-black/30 flex flex-col items-center justify-center gap-4">
        {icon}
        <h2
          className={`text-3xl md:text-3xl font-bold uppercase tracking-widest ${text} md:pb-20`}
          style={{ fontFamily: font }}
        >
          {mode}
        </h2>
      </div>
    </motion.div>
  );
};

export default GameModeCover;
