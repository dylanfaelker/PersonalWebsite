import { createTheme } from "@mui/material"


const Theme = () => {

    const darkGreen = '#2E534B'
    const lightGreen = '#7DCFB6'
    const white = '#F6F4F4'
    const maroon = '#530C0C'
    const peach = '#FD9072'
    const grey = '#434648'

    const theme = createTheme({
        breakpoints: {
            values: {
              xs: 0,      // Default
            //   sm: 600,    // Default
              sm: 700, // Custom breakpoint
              md: 960,    // Default
              lg: 1280,   // Default
              xl: 1920,   // Default
            },
          },
        typography: {
            fontFamily: "BeVietnamPro, Arial, sans-serif"
        },
        palette: {
            text: {
                primary: white
            },
            // background: {
            //     default: darkGreen
            // },
            df: {
                darkGreen: darkGreen,
                lightGreen: lightGreen,
                white: white,
                maroon: maroon,
                peach: peach,
                grey: grey,

            },
            stock: {
                green: 'rgb(22 163 74)',
                red: 'rgb(220 38 38)'
            },
        }
    })

    return theme
}

export default Theme