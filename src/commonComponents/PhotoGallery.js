import React, { useEffect, useState, useRef } from 'react'
import Image from './Image'

export default function PhotoGallery(props) {
    const { images } = props;
    const [currentImage, setCurrentImage] = useState(images[0]);

    let imageNum = useRef(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage(images[imageNum.current]);
            imageNum.current = (imageNum.current + 1) % images.length;
        }, 3000)
        
        return () => clearInterval(intervalId);
    }, [images])

    

    return (
        <>
            <div 
                style={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    alignItems: 'center',
                    width: '40vw',
                    height: '40vw',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                <Image 
                    fileName={currentImage} 
                    alt='Photo Gallery' 
                    style={{
                        objectFit: 'cover',
                        minWidth: '100%',
                        minHeight: '100%',
                    }} 
                />
            </div>
        </>
    )
}