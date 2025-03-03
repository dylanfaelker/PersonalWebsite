import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import { Box, Paper, Slider, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

function ConstituentChart() {

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const portfolioName = useSelector((state) => state.portfolio.portfolioName)

  const weightData = useSelector((state) => state.portfolio.weightData)

  const [sliderMarks, setSliderMarks] = useState([])
  useEffect(() => {
    setSliderMarks(weightData.map(datapoint => datapoint.date))
  }, [weightData])

  const handleDateChange = (event, newValue) => {
    setSeries(Object.entries(weightData[newValue].weights).filter(([_, weight]) => weight !== null).map(arr => arr[1]))
    setLabels(Object.entries(weightData[newValue].weights).filter(([_, weight]) => weight !== null).map(arr => arr[0]))
  }

  const [series, setSeries] = useState([
    10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000
  ])
  const [labels, setLabels] = useState([
    "NVDA", "AAPL", "INTC", "META", "TSLA", "GOOG", "SHOP", "AMZN", "CSCO", "JPM"
  ])
  useEffect(() => {
    setSeries(Object.entries(weightData[weightData.length - 1].weights).filter(([_, weight]) => weight !== null).map(arr => arr[1]))
    setLabels(Object.entries(weightData[weightData.length - 1].weights).filter(([_, weight]) => weight !== null).map(arr => arr[0]))
  }, [weightData])

  const chartOptions = {
    chart: {
      type: "donut",
      animations: {
        enabled: false,
      },
      fontFamily: 'inherit',
      foreColor: 'inherit',
      height: '100%',
    },
    labels: labels,
    colors: [
      theme.palette.df.maroon, 
      theme.palette.df.darkGreen, 
      theme.palette.df.gold,
      theme.palette.df.lightGreen,
      theme.palette.df.lightBlue,
      theme.palette.df.darkBlue,
      theme.palette.df.indigo,
      theme.palette.df.purple,
      theme.palette.df.lightGrey,
      theme.palette.df.orange,
    ],
    legend: {
      position: "right",
      labels: {
        colors: theme.palette.df.darkGrey,
        useSeriesColors: false,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val.toFixed(2)}%`,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "40%",
        },
      },
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          legend: {
            position: "bottom", // Moves legend below on smaller screens
          },
        },
      },
    ],
  }

  return (
    <Paper sx={{ bgcolor: theme.palette.df.white }}>
      <Box display='flex' sx={{ padding: '15px', justifyContent: 'space-between' }}>
        <Typography sx={{ color: 'black' }}>{portfolioName} Portfolio Constituents</Typography>
      </Box>

      <Box sx={{ height: { xs: "360px", sm:'450px'} }}>
        <ReactApexChart
          options={chartOptions}
          series={series}
          type={chartOptions.chart.type}
          height={chartOptions.chart.height}
          width={isMobile ? '100%' : '650px'}
        />
      </Box>

      <Box sx={{ padding: '20px', }}>
        <Slider
          defaultValue={weightData.length - 1}
          onChangeCommitted={handleDateChange}
          min={0}
          max={weightData.length - 1}
          valueLabelDisplay="on"
          valueLabelFormat={(val) => sliderMarks[val]}
          sx={{ color: theme.palette.df.darkGreen }}
        />
      </Box>

    </Paper>
  );
}

export default ConstituentChart;
