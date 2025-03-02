import React, { useEffect } from 'react'
import { StockGraph } from '../components/stock-portfolio'
import { useDispatch } from 'react-redux'
import { setTitle } from '../redux/slice/globalSlice'
import { SectionSubtitle, SectionTitle } from '../components/common'
import { Box, List, ListItem, Typography, useTheme } from '@mui/material'

function PortfolioGenerator() {

  const theme = useTheme()

  const dispatch = useDispatch()
  useEffect(() => {dispatch(setTitle("PORTFOLIO GENERATOR"))})

  return (
    <Box type='flex' sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', backgroundColor: theme.palette.df.darkGreen }}>
      <Box type='flex' sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', width: '60vw' }}>
        
        <Box sx={{ height: 100 }}></Box>
        
        <StockGraph/>

        <Box sx={{ height: '50px' }}></Box>

        <SectionTitle>DEMANDS</SectionTitle>

        <Box sx={{ height: '20px' }}></Box>

        <List>
            <Typography>1. Must always have 10 Stocks in portfolio</Typography>
            <Typography>2. Start with $100000 cash in the portfolio</Typography>
            <Typography>3. Stocks must be in the S&P 500</Typography>
            <Typography>4. All stock must have a weighting between 5-35% of the portfolio</Typography>
            <Typography>5. Partial shares are allowed</Typography>
        </List>

        <SectionTitle>STRATEGY</SectionTitle>

        <Box sx={{ height: '20px' }}></Box>

        <SectionSubtitle>RISKY</SectionSubtitle>

        <Typography>
          The riskiest stock is the stock with the highest beta stock chosen the 3 highest standard deviations stocks.
          The other 9 stocks are the most correlated to the riskiest stock.
          <br></br>
          <br></br>
          When deciding the distribution of cash, 35% is given to the riskiest stock and 5% is automatically given to the other 9.
          The remaining 20% of weight is distributed to the top 3 most correlated stocks based on the most optimal stand deviation for the entire portfolio.
          <br></br>
          <br></br>
          This calculation is run once at the beginning of every month.
          The portfolio is then held till the end of the month when the portfolio is regenerated.
        </Typography>

        <Box sx={{ height: '20px' }}></Box>

        <SectionSubtitle>SAFE</SectionSubtitle>

        <Typography>
          The algorithm behind this portfolio is largely the same as the Risky Portfolio.
          The only difference is instead of aiming for higher standard deviation, beta, and correlation, it is now aiming for lower standard deviation, beta, and correlation.
          <br></br>
          <br></br>
          The safeest stock is the stock with the lowest beta stock chosen the 3 lowest standard deviations stocks.
          The other 9 stocks are the least correlated to the safest stock.
          <br></br>
          <br></br>
          When deciding the distribution of cash, 10% weight is given to each stock for even diversification.
          <br></br>
          <br></br>
          This calculation is run once at the beginning of every month.
          The portfolio is then held till the end of the month when the portfolio is regenerated.
        </Typography>
        
        <Box sx={{ height: 100 }}></Box>
        
      </Box>
    </Box>
  )
}

export default PortfolioGenerator