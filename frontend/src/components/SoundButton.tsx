import { useContext, useState, useEffect } from "react"
import useSound from "use-sound";
import AppContext from "@context/AppContext";
import { Howl, Howler } from 'howler';

type Props = {
    className?: string
}

function SoundButton({ className }: Props) {

    const { isPlaying, setIsPlaying } = useContext(AppContext)
    const [clicked, setClicked] = useState(false)
    // const [play, { stop, sound }] = useSound("/sounds/ULabs-Background.mp3", { soundEnabled: true, volume: 0.5, interrupt: true, loop: true });

    const sound = new Howl({
        src: ['/sounds/ULabs-Background.mp3'],
        volume: 0.5,
    });


    useEffect(() => {
        sound?.on("play", () => setIsPlaying(true));
        sound?.on("stop", () => setIsPlaying(false));
        sound?.on("end", () => setIsPlaying(false));
        sound?.on("pause", () => setIsPlaying(false));
    }, [sound]);

    return (
        <div className={`${className}`}>
            <button className="relative outline-none w-10 lg:w-12 xl:w-14 2xl:w-16" onPointerOver={() => setClicked(false)} onClick={() => {
                setClicked(true)
                isPlaying ? sound?.stop() : sound?.play()
            }}>
                <div className="absolute inset-x-0 h-full -bottom-2 bg-dark-acid rounded-full" />
                <div className={`rounded-full relative bg-acid
                    p-4 transition transform duration-500 ${clicked ? 'hover:translate-y-2' : 'hover:translate-y-1'}`}>
                    {isPlaying ? <img src="/sound-off.png" /> : <img src="sound-on.png" />}
                </div>
            </button>
        </div>
    )
}

export default SoundButton