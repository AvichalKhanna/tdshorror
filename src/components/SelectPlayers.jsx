import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const modes = [
  { name: 'Family', image: '/images/family.jpg' },
  { name: 'Fun', image: '/images/fun.jpg' },
  { name: 'Crazy', image: '/images/crazy.jpg' },
  { name: 'Extreme', image: '/images/extreme.jpg' },
  { name: 'Haunted', image: '/images/haunted.jpg' },
  { name: 'Nightmare', image: '/images/nightmare.jpg' },
];

const cautions = [
    "Each player gets 3 hearts, if you loose all, you die.",
    "Although Moody, The Ghost chooses players on a random basis.",
    "You loose hearts once you forfeit. May the best man win!",
    "If a ghost catches you while forfieting, he will take an additonal heart, Beware",
    "A GHOST SCAN - performed when forfeiting can cost you an additonal heart, if spirit detected!"
]

export default function SelectPlayers() {
    const navigate = useNavigate();
    const location = useLocation();
    const [displaytext, setdisplaytext] = useState(cautions[0]);
    const [currentCaptionIndex, setCurrentCaptionIndex] = useState(0);
    const mode = modes[location.state?.mode ?? 1].name;

    const [players, setPlayers] = useState(() => {
      const stored = sessionStorage.getItem("players");
      return stored ? JSON.parse(stored) : [];
    });
    
    const [name, setName] = useState("");
    const [gender, setGender] = useState("male");

  const addPlayer = () => {
    if (name.length === 0 || name.length > 5) return;
    setPlayers([...players, { name, gender, hearts:3 }]);
    setName("");
    setGender("male");
    clicksound();
  };

  const deletePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };    

    const startgame = () => {
    if (players.length < 2) {
        alert("Add at least 2 players to start the game.");
        return;
    }

      clicksound()
      sessionStorage.setItem("players", JSON.stringify(players));


        navigate("/game", {
            state: {
            Players: players,
            mode: mode, // make sure gameMode is defined
            },
        })};

  const clicksound = () => {
    const audio = new Audio(`${import.meta.env.BASE_URL}sounds/click.mp3`);
    audio.play();
  };


    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentCaptionIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % cautions.length;
            setdisplaytext(cautions[nextIndex]);
            return nextIndex;
        });
        }, 5000);

        
        return () => clearInterval(interval); // cleanup
    }, []);

    // Optio

    return (
        <>
        <div className="absolute top-0 left-0
        w-screen h-screen flex flex-col 
        items-center justify-between
        ">

            <div className="w-full flex justify-between items-center h-fit px-4 py-2">
            <button 
            onClick={() => {
              clicksound(),
              navigate("../")}}
            className="
            hover:bg-red-800/20 rounded-full p-2
            transition-all duration-500 ease-in-out
            flex space-x-2 items-center
            ">
                <ArrowLeft className="text-red-800"/>
                <p className="text-xl bg-gradient-to-b
                from-white/90 to-red-500/80 bg-clip-text
                text-transparent border-b-0 border-red-500/20"
                style={{ fontFamily:"Creepster"}}
                >Afraid?</p>
            </button>

            <p className="text-xl text-red-500/80 font-semibold"
            style={{ fontFamily:"Creepster"}}
            >Mode : <span className="text-lg"
            style={{ fontFamily:"Creepster"}}
            >
                {mode}
            </span></p>
            </div>
  <div className="p-4 space-y-4 w-[90vw] max-w-xl">

      {/* Display Players */}
      <div className="flex flex-wrap h-[200px] overflow-y-scroll gap-3 hide-scrollbar">
        {players.map((player, index) => (
          <div
            key={index}
            className="bg-black/60 w-full h-fit
            border-1 border-red-200/40 justify-between
            px-4 py-2 rounded flex items-center space-x-2"
          >
            <div className="flex space-x-2 items-center text-xl tracking-widest"
            style={{ fontFamily:"ButcherMan"}}>
            <span className="font-semibold text-white/70">{player.name}</span>
            <span className="text-sm text-gray-600">({player.gender})</span>
            </div>

            <button
              onClick={() => {clicksound(), deletePlayer(index)}}
              className="text-red-500 hover:bg-red-400/40 transition-all duration-500 ease-in-out ml-2
              px-2 py-1 rounded-full"
              style={{ fontFamily:"Nosifer"}}
            >
              ✖
            </button>
          </div>
        ))}
      </div>


      {/* Input Fields */}
      <div className="flex items-center space-x-2 w-full justify-between">
        <input
          type="text"
          value={name}
          maxLength={5}
          placeholder="Name (max 5)"
          className="border px-2 py-1 rounded"
          style={{ fontFamily:"Creepster"}}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border px-2 py-1 rounded bg-black w-full"
          style={{ fontFamily:"Creepster" }}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button
          onClick={() => {addPlayer()}}
          className="bg-red-500 w-full text-white px-3 py-1 rounded hover:bg-red-600"
          style={{ fontFamily:"Creepster" }}
        >
          Add Player
        </button>
      </div>

    </div>

        <button className="text-red-500/90 bg-black/50 border-red-500/30 border-1 px-5 py-3 rounded-full
        hover:bg-red-500/50 transition-all duration-500 ease-in-out hover:text-black"
        onClick={() => {startgame()}}
        style={{ fontFamily:"Nosifer"}}
        > START GAME</button>

            <div className="flex w-screen justify-center h-fit pt-5 pb-10 px-5">
                <motion.p 
                initial={{ x:0, y:0 }}
                animate={{ x:[0,-4,0,4,0], y:[5,0,-5,0,5]}}
                transition={{ duration:3, repeat:Infinity }}
                className="text-xl text-red-600"
                style={{ fontFamily:"Pirata One" }}
                >
                    {displaytext}
                </motion.p>
            </div>

        </div>
        </>
    )
}