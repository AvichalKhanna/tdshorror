import { useNavigate } from "react-router-dom"

export default function Attribution() {
   
   const navigate = useNavigate();

    return (
    <>
    <div className="absolute top-0 left-0 flex flex-col items-center 
    justify-center w-screen h-screen space-y-5">
    
        
    <p style={{fontFamily:"Nosifer"}}>Click Sound Attribuition : </p>
        <div className="flex flex-col max-w-4xl">
            <a href="https://freesound.org/people/Vilkas_Sound/sounds/707041/">VS Button Click 04.mp3</a> 
            by <a href="https://freesound.org/people/Vilkas_Sound/">Vilkas_Sound</a> | 
            License: <a href="https://creativecommons.org/licenses/by/4.0/">Attribution 4.0</a>
        </div> 
    
    <p style={{fontFamily:"Nosifer"}}>Background Sound Attribuition: </p>
        <div className="flex flex-col max-w-4xl">
            <a href="https://freesound.org/people/Universfield/sounds/710249/">Horror Music Box For Spooky Suspenseful Stories</a>
            by <a href="https://freesound.org/people/Universfield/">Universfield</a> |
            License: <a href="https://creativecommons.org/licenses/by/4.0/">Attribution 4.0</a>
        </div>

    
    <p style={{fontFamily:"Nosifer"}}>PhonePull Sound Attribuition: </p>
        <div className="flex flex-col max-w-4xl">
        <a href="https://freesound.org/people/pfranzen/sounds/333776/">Unzipping purse, pulling out phone</a> 
        by <a href="https://freesound.org/people/pfranzen/">pfranzen</a> |
        License: <a href="https://creativecommons.org/licenses/by/4.0/">Attribution 4.0</a>
        </div>
        
        <button onClick={() => navigate(-1)} 
        className="bg-gradient-to-b from-white/50 to-red-800/70
            w-fit h-fit px-4 py-3 rounded-3xl text-2xl
            hover:from-red-900/80 hover:to-white/40 transition-all duration-500 
            ease-in-out">Home</button>
    </div>
    </>
   ) 
}