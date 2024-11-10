import { useEffect, useRef, useState } from "react"
import {useNavigate } from "react-router-dom";
import { Room } from "./Room";

export const Landing = () => {
    const [name, setName] = useState("");
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const navigate = useNavigate();

    const [joined, setJoined] = useState(false);

    const getCam = async () => {
        const stream = await window.navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        // MediaStream
        const audioTrack = stream.getAudioTracks()[0]
        const videoTrack = stream.getVideoTracks()[0]
        setLocalAudioTrack(audioTrack);
        setlocalVideoTrack(videoTrack);
        if (!videoRef.current) {
            return;
        }
        videoRef.current.srcObject = new MediaStream([videoTrack])
        videoRef.current.play();
        // MediaStream
    }

    useEffect(() => {
        if (videoRef && videoRef.current) {
            getCam()
        }
    }, [videoRef]);

    if (!joined) {
    return <div>
            <div className="bg-slate-950">   
                <div className="flex justify-center flex-cols-span pt-5">
                    <div className="flex flex-1 items-center justify-center p-5 pb-10 ">
                        <video autoPlay ref={videoRef}></video>
                    </div>
                    <div className="flex flex-1 items-center justify-center p-2 relative">
                        <button className="px-12 py-4 rounded-full bg-[#1ED720] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-blue-600 transition-colors duration-200 mr-2" onClick={() => {
                            setJoined(true);
                        }}>Start Room</button>
                        <div>
                            <button className="px-12 py-4 rounded-full bg-zinc-600 font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-blue-600 transition-colors duration-200" onClick={() => {
                                navigate("/signup")
                            }}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    }
    setName(name);
    return <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
}