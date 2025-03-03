import React, { useEffect, useState } from 'react'
import { ConstituentChart, StockGraph } from '../components/stock-portfolio'
import { useDispatch, useSelector } from 'react-redux'
import { setTitle } from '../redux/slice/globalSlice'
import { SectionSubtitle, SectionTitle } from '../components/common'
import { Box, List, Paper, Tab, Tabs, Typography, useTheme } from '@mui/material'
import { setTab } from '../redux/slice/portfolioSlice'
import PortfolioList from '../assets/data/stocks/PortfolioList.json'
import StockStats from '../components/stock-portfolio/StockStats'

function PortfolioGenerator() {

  const theme = useTheme()
  const dispatch = useDispatch()

  const portfolioName = useSelector((state) => state.portfolio.portfolioName)
  
  const [localTab, setLocalTab] = useState(0)
  const handleTabChange = (event, newValue) => {
    setLocalTab(newValue)
    dispatch(setTab(newValue))
  }

  useEffect(() => {dispatch(setTitle("PORTFOLIO GENERATOR"))})

  return (
    <Box type='flex' sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', backgroundColor: theme.palette.df.darkGreen }}>
      <Box type='flex' sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', width: { xs: '90vw', lg:'80vw', xl:'60vw'} }}>
        
        <Box sx={{ height: 100 }}></Box>

        <Box sx={{ width: 1, }}>
          <Tabs 
            value={localTab} 
            onChange={handleTabChange}
            variant='scrollable'
            scrollButtons='auto' 
            sx={{
              "& .MuiTabs-indicator": { backgroundColor: theme.palette.df.white },
              "& .MuiTab-root": { color: theme.palette.df.white },
              "& .Mui-selected": { color: theme.palette.df.white },
            }}
          >
            {PortfolioList.map((portoflio, index) => (
              <Tab key={index} value={index} label={portoflio.portfolio}
                sx={{
                  "&.Mui-selected": { color: theme.palette.df.white },
                  "&:hover": { color: theme.palette.df.white },
                }}
              ></Tab>
            ))}
          </Tabs>
        </Box>

        <Box sx={{ height: '10px' }}></Box>

        <StockGraph/>

        <Box sx={{ height: '50px' }}></Box>

        <StockStats/>
        
        <Box sx={{ height: '50px' }}></Box>

        <ConstituentChart/>

      </Box>
      <Box type='flex' sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', width: '60vw' }}>

        <Box sx={{ height: '50px' }}></Box>

        <SectionTitle>REQUIRED</SectionTitle>

        <Box sx={{ height: '20px' }}></Box>

        <List>
            <Typography>1. Must always have 10 Stocks in portfolio</Typography>
            <Typography>2. Start with $100000 cash in the portfolio</Typography>
            <Typography>3. Stocks must be in the S&P 500</Typography>
            <Typography>4. All stock must have a weighting between 5-35% of the portfolio</Typography>
            <Typography>5. Partial shares are allowed</Typography>
        </List>

        <Box sx={{ height: '50px' }}></Box>

        <SectionTitle>STRATEGY</SectionTitle>

        <Box sx={{ height: '30px' }}></Box>

        <SectionSubtitle>{portfolioName.toUpperCase()}</SectionSubtitle>

        <Box sx={{ height: '20px' }}></Box>

        <Typography>
          {PortfolioList[localTab].strategy.map(text => (
            <>
              {text}
              <br></br>
              <br></br>
            </>
          ))}
        </Typography>
        
        <Box sx={{ height: 100 }}></Box>

      </Box>
    </Box>
  )
}

export default PortfolioGenerator