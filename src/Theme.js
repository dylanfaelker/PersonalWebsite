import { createTheme } from "@mui/material"
import { useMemo } from "react"


const Theme = () => {

    const theme = createTheme({
        typography: {
            fontFamily: "BeVietnamPro, Arial, sans-serif"
        },
        palette: {
            df: {
                mainColor: '#2E534B',
                mainColorLight: '#7DCFB6',
                secondaryColor: '#F6F4F4',
                tertiaryColor: '#530C0C',
                neutral: '#434648',
                highlight: '#FD9072',

                darkGreen: '#2E534B',
                lightGreen: '#7DCFB6',
                white: '#F6F4F4',
                maroon: '#530C0C',
                peach: '#FD9072',
                grey: '#434648',

            }
        }
    })

    return theme
}

export default Theme