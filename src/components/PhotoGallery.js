import React, { useEffect, useState } from 'react'
import Image from './Image'
import './PhotoGallery.css'

export default function PhotoGallery(props) {
    const { images } = props;
    const [currentImage, setCurrentImage] = useState(images[0]);

    let imageNum = 0;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage(images[imageNum]);
            imageNum = (imageNum + 1) % images.length;
        }, 3000)
        
        return () => clearInterval(intervalId);
    }, [])

    

    return (
        <>
            <div class="photo-gallery fill">
                <Image fileName={currentImage} alt='Photo Gallery' className='' />
            </div>
        </>
    )
}