import { connectStorageEmulator } from 'firebase/storage';
import { memo, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './StockPieChart.css';


function StockPieChart(props) {
  const [awaitRender, setAwaitRender] = useState(true);

  const [series, setSeries] = useState([100000])
  const [labels, setLabels] = useState(["Portfolio"])
  const [totalValue, setTotalValue] = useState(100000)

  const pieDivider = "#434648"
  const colours = ['#7DCFB6', '#2E534B', '#600e0e', '#FD9072', '#cfbc5e', '#366BA8', '#42afb0', '#72306a', '#ab640d', '#bd0e0e']

  const chartOptions = {
    chart: {
      animations: {
        speed: 400,
        animateGradually: {
          enabled: false,
        },
      },
      fontFamily: 'inherit',
      foreColor: 'inherit',
      height: '100%',
      type: 'donut',
      sparkline: {
        enabled: true,
      },
    },
    colors: colours,
    labels,
    plotOptions: {
      pie: {
        customScale: 0.9,
        expandOnClick: false,
        donut: {
          size: '70%',
        },
      },
    },
    stroke: {
      width: 1,
      colors: [pieDivider],
    },
    series,
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
      active: {
        filter: {
          type: 'none',
        },
      },
    },
    tooltip: {
      enabled: true,
      fillSeriesColor: false,
      theme: 'dark',
      custom: ({ seriesIndex, w }) =>
        `<div class="tooltip-wrapper">
            <div class="tooltip-colour-circle" style="background-color: ${w.config.colors[seriesIndex]};"></div>
            <div class="tooltip-name">${w.config.labels[seriesIndex]}:</div>
            <div class="tooltip-value">${w.config.series[seriesIndex]}%</div>
        </div>`,
    },
  };

  useEffect(() => {
    fetch("./stocks.json", {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      return response.json();
    })
    .then(jsondata => {
      var arr  = Object.keys(jsondata);
      let recentDate = arr[arr.length - 1]
      let recentDay = jsondata[recentDate]

      var newTotalValue = recentDay['Total Value']
      setTotalValue(newTotalValue)

      delete recentDay['Total Value']
      delete recentDay['SP500']

      // Gets the closing price of a stock for a certain day
      function getClosingPrice(ticker, date) {

        //TODO make it so it actually returns the price and not number of shares
        //   Might need to create my own api to get it for a certain date
        return recentDay[ticker]

        // const query = ticker;
        // const queryOptions = { period1: date };

        // const year1 = date.slice(6, 8);
        // const month1 = date.slice(0, 2);
        // const day1 = date.slice(3, 5);

        //date for net said
        // var next = new Date(date);
        // next.setDate(next.getDate()+1);
        // console.log(next)


        // const prices = await yahooStockPrices.getHistoricalPrices(0, 6, 2020, 0, 8, 2020, ticker, '1d');
        // const response = await yahooFinance.quote({ symbol: "TSLA" });
        // const result = await yahooFinance.historical(query, queryOptions)
        // return result[0].close
      }

      // Creates a new series similar stucture to series variable but with the 
      //   main data as the value of the holdings for a stock instead of 
      //   number of shares
      var newSeries = []
      var newLabels = []
      var newTotalValue = 0;
      let i = 0
      for (var key of Object.keys(recentDay)) {
        if (recentDay[key] !== null) {
          newSeries[i] = getClosingPrice(key, recentDate)
          newLabels[i] = key
          newTotalValue += recentDay[key]
          i++
        }
      }
      setSeries(newSeries)
      setLabels(newLabels)
      setTotalValue(newTotalValue)
    });
  }, [])

  useEffect(() => {
    setAwaitRender(false);
  }, []);

  if (awaitRender) {
    return null;
  }
  return (
    <div className="stock-pie-chart-wrapper">
      {/* <div className="flex flex-col sm:flex-row items-start justify-between"> */}
        <div className="title">
          Current Holdings of the Portfolio
        </div>
      {/* </div> */}

      <div className="data-wrapper">
        <div className="pie-chart-wrapper">
          <ReactApexChart
            className="pie-chart"
            options={chartOptions}
            series={series}
            type={chartOptions.chart.type}
            height={chartOptions.chart.height}
          />
        </div>
        {/* <div className="mt-32"> */}
          <div className="captions-wrapper">
            {series.map((dataset, i) => (
              <div className="caption-wrapper" key={i}>
                <div className="caption-name-wrapper">
                  <div
                    className="caption-colour-circle"
                    style={{ backgroundColor: colours[i] }}
                  ></div>
                  <div className="caption-name">{labels[i]}</div>
                </div>
                <div className="caption-value">
                  ${dataset}
                </div>
                <div className="caption-percentage">
                  {((dataset / totalValue) * 100).toLocaleString('en-US')}%
                </div>
              </div>
            ))}
          </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default memo(StockPieChart);
