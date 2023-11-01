import React, { useEffect, useState, useRef } from 'react'
import Image from './Image'
import './PhotoGallery.css'

export default function PhotoGallery(props) {
    const { images } = props;
    const [currentImage, setCurrentImage] = useState(images[0]);

    let imageNum = useRef(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage(images[imageNum.current]);
            imageNum.current = (imageNum.current + 1) % images.length;
            console.log(imageNum.current)
        }, 3000)
        
        return () => clearInterval(intervalId);
    }, [images])

    

    return (
        <>
            <div class="photo-gallery fill">
                <Image fileName={currentImage} alt='Photo Gallery' className='' />
            </div>
        </>
    )
}