import ReactApexChart from 'react-apexcharts';
import './StockGraph.css';
import { useEffect, useState } from 'react';
import { Box, Chip, Menu, MenuItem, MenuList, Paper, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import TimeframeList from '../../assets/data/stocks/TimeframeList.json'
import { setTimeframe } from '../../redux/slice/portfolioSlice';

function StockGraph() {

  const theme = useTheme()
  
  const dispatch = useDispatch()

  const portfolioName = useSelector((state) => state.portfolio.portfolioName)
  const benchmarkName = useSelector((state) => state.portfolio.benchmarkName)

  const timeframe = useSelector((state) => state.portfolio.timeframe)
  const valueData = useSelector((state) => state.portfolio.valueData)

  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const menuOpen = Boolean(menuAnchorEl)
  const handleOpenMenu = (event) => {
    setMenuAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = (event, timeframeIndex) => {
    setMenuAnchorEl(null)
    if (timeframeIndex !== null) {
      dispatch(setTimeframe(timeframeIndex))
    }
  }

  const [series, setSeries] = useState([
    {
      data: [{x: '07/04/03', y:100000}],
      name: "S&P 500"
    },
    {
      data: [{x: '07/04/03', y:100000}],
      name: "Portfolio"
    },
  ])
  useEffect(() => {
    setSeries([
      {
        data: valueData.map(datapoint => {return {x: datapoint.date, y: datapoint.portfolio}}),
        name: "S&P 500"
      },
      {
        data: valueData.map(datapoint => {return {x: datapoint.date, y: datapoint.benchmark}}),
        name: "Portfolio"
      },
    ])
  }, [valueData])

  const sp500Line = theme.palette.df.maroon;
  const sp500Fill = theme.palette.df.darkGreen;
  const portfolioLine = theme.palette.df.darkGreen;
  const portfolioFill = theme.palette.df.lightGreen;
  const textColor = theme.palette.df.darkGreen;
  const divider = theme.palette.df.grey;
  const chartOptions = {
    chart: {
      animations: {
        enabled: false,
      },
      fontFamily: 'inherit',
      foreColor: 'inherit',
      height: '100%',
      type: 'area',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: [sp500Line, portfolioLine],
    dataLabels: {
      enabled: false,
    },
    fill: {
      colors: [sp500Fill, portfolioFill],
      opacity: 0.5,
    },
    grid: {
      show: false,
      padding: {
        bottom: -40,
        left: 0,
        right: 0,
      },
    },
    legend: {
      show: false,
    },
    stroke: {
      curve: 'straight',
      width: 2,
    },
    tooltip: {
      followCursor: true,
      theme: 'dark',
      x: {
        format: 'MMM dd, yyyy',
      },
      y: {
        formatter: (value) => value.toFixed(2),
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      labels: {
        offsetY: -20,
        rotate: 0,
        style: {
          colors: textColor,
        },
      },
      // tickAmount: 3,
      tooltip: {
        enabled: false,
      },

      //TODO Have it skip weekends
      type: 'datetime',
    },
    yaxis: {
      labels: {
        style: {
          colors: divider,
        },
        formatter: (value) => value.toFixed(2),
      },
      max: (max) => max + 10000,
      min: 0,
      show: false,
      tickAmount: 5,
    },
  }

  return (
    <Paper sx={{ bgcolor: theme.palette.df.white, width: 1}}>
      <Box display='flex' sx={{ padding: '15px', justifyContent: 'space-between' }}>
        <Typography sx={{ color: 'black' }}>{portfolioName} Portfolio vs {benchmarkName}</Typography>
        <Chip label={timeframe} sx={{ color: theme.palette.df.grey }} onClick={handleOpenMenu}></Chip>
        <Menu
          anchorEl={menuAnchorEl}
          open={menuOpen}
          onClose={() => handleCloseMenu(null, null)}
        >
          <MenuList dense>
            {TimeframeList.map((timeframe, index) =>
              <MenuItem key={index} onClick={(event) => handleCloseMenu(event, index)} sx={{ color: theme.palette.df.grey }}>
                {timeframe}
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </Box>

      <Box sx={{ height: '320px' }}>
        <ReactApexChart
          className="graph"
          options={chartOptions}
          series={series}
          type={chartOptions.chart.type}
          height={chartOptions.chart.height}
        />
      </Box>

    </Paper>
  );
}

export default StockGraph;
