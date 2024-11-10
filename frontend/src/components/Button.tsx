import { useState } from "react";

export const Button = () => {
    const [joined, setJoined] = useState(false);
    return <div>
        <button className="px-12 py-4 rounded-full bg-[#1ED760] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#21e065] transition-colors duration-200" onClick={() => {
                setJoined(true);
            }}>Join</button>
    </div>
}