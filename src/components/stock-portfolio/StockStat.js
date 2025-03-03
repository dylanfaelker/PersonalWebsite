import { Box, Paper, Typography, useTheme } from "@mui/material"

const StockStat = ({title, mainVal, secondaryVal, percentage, positive, units}) => {

    const theme = useTheme()

    return(
        <Paper sx={{ bgcolor: theme.palette.df.white, padding: '15px', minWidth: '285px' }}>
            <Typography sx={{ color: theme.palette.df.darkGrey }}>{title} {units && '- ' + units}</Typography>
            <Box display='flex' flexDirection='row' alignItems='center'>
                <Typography sx={{ color: "black", fontSize: 36, fontWeight: 700 }}>{mainVal}</Typography>
                <Box sx={{ width: '3px' }}></Box>
                <Box>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                        {positive 
                            ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20" fill={theme.palette.stock.green}>
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                            </svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20" fill={theme.palette.stock.red}>
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                            </svg>
                        }
                        {percentage && <Typography sx={{ color: "black", fontWeight: 500, color: positive ? theme.palette.stock.green : theme.palette.stock.red }}>{percentage}%</Typography>}
                    </Box>
                    {secondaryVal && <Typography sx={{ color: "black", fontWeight: 500, color: positive ? theme.palette.stock.green : theme.palette.stock.red }}>{secondaryVal > 0 && "+"}{secondaryVal}</Typography>}
                </Box>
            </Box>
        </Paper>
    )
}

export default StockStat