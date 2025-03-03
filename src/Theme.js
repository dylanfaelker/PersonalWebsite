import { createTheme } from "@mui/material"


const Theme = () => {

    const darkGreen = '#2E534B'
    const lightGreen = '#7DCFB6'
    const white = '#F6F4F4'
    const maroon = '#530C0C'
    const peach = '#FD9072'
    const darkGrey = '#434648'
    const lightGrey = '#93A3B1'
    const purple = '#826D90'
    const yellow = '#FFD23F'
    const pink = '#EE4266'
    const indigo = '#3A1772'
    const darkBlue = '#091540'
    const lightBlue = '#86BBD8'
    const orange = '#D74E09'
    const gold = '#A59132'

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
                darkGrey: darkGrey,
                lightGrey: lightGrey,
                purple: purple,
                yellow: yellow,
                pink: pink,
                indigo: indigo,
                darkBlue: darkBlue,
                lightBlue: lightBlue,
                orange: orange,
                gold: gold,
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