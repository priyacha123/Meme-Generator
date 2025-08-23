import { useEffect, useState } from "react"
import { TailwindcssButtons } from "../../components/ui/download-button";

export default function Main() {
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    })
    const [allMemes, setAllMeme] = useState([])

    useEffect( () => {
       fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMeme(data.data.memes));
    }, [] )
    
    function getMeme() {
        const randomIndex = Math.floor(Math.random() * allMemes.length)
        const randomMeme = allMemes[randomIndex].url
        setMeme(prev => ({
            ...prev,
            imageUrl: randomMeme,
        }))
    }
    function handleChange(event) {
        const {value, name} = event.currentTarget;
        setMeme(prev => ({
            ...prev,
            [name]: value,
        }))
    }

     return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>
                <button onClick={getMeme}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText} </span>
            </div>
            <TailwindcssButtons href={meme.imageUrl} topText={meme.topText} bottomText={meme.bottomText}  />

        </main>
    )
}