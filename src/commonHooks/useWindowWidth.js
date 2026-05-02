import { useEffect, useState } from 'react'

// Mobile:  <=640
// Tablet:  641-1007
// Desktop: >=1008

// {windowWidth <= 640 ?
//     <>
//         Mobile Size
//     </> : 
// windowWidth >= 641 && windowWidth <= 1007 ?
//     <>
//         Tablet Size
//     </> :
// windowWidth >= 1008 ?
//     <>
//         Desktop Size
//     </> :
// <></>}

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return { 
        windowWidth,
    }
}

export default useWindowWidth