import React, { useEffect, useState } from 'react'
import './PhotoGallery.css'

import Img01 from '../HobbyPics/HobbyPic01.jpg';
import Img02 from '../HobbyPics/HobbyPic02.jpg';
import Img03 from '../HobbyPics/HobbyPic03.jpg';
import Img04 from '../HobbyPics/HobbyPic04.jpg';
import Img05 from '../HobbyPics/HobbyPic05.jpg';
import Img06 from '../HobbyPics/HobbyPic06.jpg';
import Img07 from '../HobbyPics/HobbyPic07.jpg';

const images = [Img01, Img02, Img03, Img04, Img05, Img06, Img07];

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