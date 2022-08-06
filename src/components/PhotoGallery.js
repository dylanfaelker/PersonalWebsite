import React, { useEffect, useState } from 'react'
import './PhotoGallery.css'

import Img01 from '../content/HobbyPics/HobbyPic01.jpg';
import Img02 from '../content/HobbyPics/HobbyPic02.jpg';
import Img03 from '../content/HobbyPics/HobbyPic03.jpg';
import Img04 from '../content/HobbyPics/HobbyPic04.jpg';
import Img05 from '../content/HobbyPics/HobbyPic05.jpg';
import Img06 from '../content/HobbyPics/HobbyPic06.jpg';

const images = [Img01, Img02, Img03, Img04, Img05, Img06];

export default function PhotoGallery() {
    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage(images[Math.floor(Math.random() * images.length)]);
        }, 5000)
        
        return () => clearInterval(intervalId);
    }, [])

    return (
        <div class="photo-gallery fill">
            <img src={currentImage} class="hobby-pic" alt="pciture of hobby"/>
        </div>
    )
}