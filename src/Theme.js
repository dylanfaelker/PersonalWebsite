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
            fontFamily: "BeVietnamPro, Arial, sans-serif",
            h2: {
                fontSize: '128px',
                fontWeight: 500,
                letterSpacing: '0em',
                textAlign: 'center',
                color: white,
                marginBottom: '1vh',
                whiteSpace: 'pre-wrap',
                textTransform: 'uppercase',
            },
            // Map your CSS h4 styles here
            h4: {
                fontSize: '34px',
                fontWeight: 400,
                letterSpacing: '0em',
                textAlign: 'center',
                color: white,
                marginBottom: '0.5vh',
                whiteSpace: 'pre-wrap',
                textTransform: 'uppercase',
            },
            // Map your CSS p styles to body1[cite: 2]
            body1: {
                fontSize: '18px',
                fontWeight: 500,
                letterSpacing: '0em',
                color: white,
                textAlign: 'left',
                // Note: For margins, it's often better to handle 
                // layout in the Box container rather than the text
                // marginLeft: '20vw',
                // marginRight: '20vw',
                whiteSpace: 'pre-wrap',
            }
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    '*': {
                        margin: 0,
                        padding: 0,
                    }
                }
            }
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