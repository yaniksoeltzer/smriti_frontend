

export function pad(n){
    return n < 10 ? '0' + n : n
}


export function playOnFirstInteraction(audio){
    let playPromise = audio.play()
    playPromise.catch(()=>{
        // Autoplay was prevented
        console.log("Autoplay was prevented, delay until first user input")
        function singleTimeEvent(){
            new Audio(require("../../assets/sound_lock_in.mp3")).play()
            document.removeEventListener("click", singleTimeEvent)
            console.log("delayed autoplay continued")
        }
        document.addEventListener("click", singleTimeEvent)
    })
}

