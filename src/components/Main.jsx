import { useEffect, useState,useRef } from "react"
import { TailwindcssButtons } from "../../components/ui/download-button";

export default function Main() {
    const [meme, setMeme] = useState({
        topText: " ",
        bottomText: " ",
        imageUrl: " "
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
    const fileInputRef = useRef(null);
    function handleChange(event) {
        const {value, name} = event.currentTarget;
        setMeme(prev => ({
            ...prev,
            [name]: value,
        }))
    }
    function handleUpload(event){
        const file = event.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                  setMeme(prev => ({
            ...prev,
            imageUrl: reader.result,
        }))
            }
            reader.readAsDataURL(file)
        }

    }
    const handleImageUpload= (event) => {
        event.preventDefault();//prevents the default behaviour when page reloads.
        fileInputRef.current.click();
        
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
                <input type="file" name="file" placeholder="Create a meme" ref={fileInputRef}  onChange={handleUpload}  hidden/>
                <button type="submit" onClick={handleImageUpload}>Create meme</button>
  
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