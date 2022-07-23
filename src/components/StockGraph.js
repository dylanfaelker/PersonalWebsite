import ReactApexChart from 'react-apexcharts';
import './StockGraph.css';
import { useEffect, useState } from 'react';

function StockGraph(props) {
  const { portfolioType } = props;



  // Data being graphed
  const [series, setSeries] = useState([
    {
      data: [{x: '07/04/03', y:100000}],
      name: "S&P 500"
    },
    {
      data: [{x: '07/04/03', y:100000}],
      name: "Portfolio"
    },
  ]);

  // Main Data
  const [riskyData, setRiskyData] = useState();
  const [sp500Data, setSP500Data] = useState();
  const [riskyValue, setRiskyValue] = useState();
  const [SP500Value, setSP500Value] = useState();

  // Key stats
  const [riskyPercentChange, setRiskyPercentChange] = useState();
  const [riskyDollarChange, setRiskyDOllarChange] = useState();
  const [SP500PercentChange, setSP500PercentChange] = useState();
  const [SP500DollarChange, setSP500DollarChange] = useState();
  // Measures how much percent it outpreforms the market
  const [compareToSP500, setCompareToSP500] = useState();

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
      let numDates = Object.keys(jsondata).length;

      let array = new Array(numDates);
      let i = 0;
      for (let key in jsondata) {
        array[i] = {
          x: key,
          y: jsondata[key]['Total Value']
        };
        i++;
      }
      setRiskyData(array);

      let array2 = new Array(numDates);
      let j = 0;
      for (let key in jsondata) {
        array2[j] = {
          x: key,
          y: jsondata[key]['SP500']
        };
        j++;
      }
      setSP500Data(array2);

      setSeries([
        {
          data: array2,
          name: "S&P 500"
        },
        {
          data: array,
          name: "Risky Portfolio"
        },
      ]);
    });
  }, [])

  // Updates key stats when the series is updated
  useEffect(() => {
    setRiskyValue(series[1].data[series[1].data.length - 1].y);
    setRiskyPercentChange(((series[1].data[series[1].data.length - 1].y) / (series[1].data[0].y)) * 100 - 100);
    setRiskyDOllarChange((series[1].data[series[1].data.length - 1].y) - (series[1].data[0].y));
    setSP500Value(series[0].data[series[0].data.length - 1].y);
    setSP500PercentChange(((series[0].data[series[0].data.length - 1].y) / (series[0].data[0].y)) * 100 - 100);
    setSP500DollarChange((series[0].data[series[0].data.length - 1].y) - (series[0].data[0].y));
  }, [series])

  // Updates comparison value after risky and sp500 values have been changed
  useEffect(() => {
    setCompareToSP500(riskyPercentChange - SP500PercentChange);
  }, [riskyPercentChange, SP500PercentChange])



  const sp500Line = '#530C0C';
  const sp500Fill = '#2E534B';
  const portfolioLine = '#2E534B';
  const portfolioFill = '#7DCFB6';
  const textColor = '#2E534B';
  const divider = '#434648';
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
      },
      max: (max) => max + 1000,
      min: (min) => min - 5000,
      show: false,
      tickAmount: 5,
    },
  };



  const [timeLength, setTimeLength] = useState("max");
  function TimePicker() {
    const [open, setOpen] = useState(false);
    const options = [
      "5 days",
      "30 days",
      "6 months",
      "1 year",
      "max"
    ]

    return (
      <div className="time-picker-wrapper">
        <div className="time-picker" onClick={() => {
          setOpen(!open)
        }}>
          {!open ? timeLength : ""}
          {open && <div className="time-drop-down">
            {options.map((option) => (
              <div className="time-drop-down-option" onClick={() => {
                setTimeLength(option)
              }}>
                {option}
              </div>
            ))}
          </div>}
        </div>
      </div>
    )
  }

  // Creates an array of data for a certain time interval
  function getTimeIntervalData(timeInterval, data) {
    if (data === undefined) {
      return data
    }

    const d = new Date();
    let day = d.getDay();

    if (timeInterval === "5 days") {
      return data.slice(-5)
    } else if (timeInterval === "30 days") {
      if (day === 0) {
        return data.slice(-20)
      } else if (day === 1 || day === 6) {
        return data.slice(-21)
      } else {
        return data.slice(-22)
      }
    } else if (timeInterval === "6 months") {
      return data.slice(-130)
    } else if (timeInterval === "1 year") {
      return data.slice(-260)
    }
    return data
  }

  useEffect(() => {
    if (!riskyData || !sp500Data) {
      return
    }
    var newRisky = getTimeIntervalData(timeLength, riskyData);
    var newSP500 = getTimeIntervalData(timeLength, sp500Data);

    setSeries([
      {
        data: newSP500,
        name: "S&P 500"
      },
      {
        data: newRisky,
        name: "Portfolio"
      },
    ])
  }, [timeLength, riskyData, sp500Data])



  return (
    <div className="stock-graph-wrapper">
      <div className="graph-title-wrapper">
        <div className="graph-title">
          {portfolioType} Portfolio vs the Market
        </div>
        <TimePicker/>
      </div>

      <div className="stats-group-wrapper-wrapper">
        <div className="stats-group-wrapper">

          <GraphStat
            title="Risky Portfolio"
            mainVal={"$" + (riskyValue !== undefined ? +riskyValue.toFixed(2) : "")}
            secondaryVal={(riskyDollarChange >= 0 ? "+" : "") + (riskyDollarChange !== undefined ? +riskyDollarChange.toFixed(2) : "")}
            percentage={"" + (riskyPercentChange !== undefined ? +riskyPercentChange.toFixed(2) : "") + "%"}
            positive={riskyPercentChange >= 0 || riskyDollarChange >= 0}
          />
          <GraphStat
            title="S&P 500"
            mainVal={"$" + (SP500Value !== undefined ? +SP500Value.toFixed(2) : "")}
            secondaryVal={(SP500DollarChange >= 0 ? "+" : "") + (SP500DollarChange !== undefined ? +SP500DollarChange.toFixed(2) : "")}
            percentage={"" + (SP500PercentChange !== undefined ? +SP500PercentChange.toFixed(2) : "") + "%"}
            positive={SP500PercentChange >= 0 || SP500DollarChange >= 0}
          />

          <GraphStat
            title="Portfolio vs Market"
            mainVal={"" + (compareToSP500 !== undefined ? +compareToSP500.toFixed(2) : "") + "%"}
            positive={compareToSP500 >= 0}
          />

        </div>
      </div>

      <div className="graph-wrapper">
        <ReactApexChart
          className="graph"
          options={chartOptions}
          series={series}
          type={chartOptions.chart.type}
          height={chartOptions.chart.height}
        />
      </div>
    </div>
  );
}

function GraphStat(props) {
  const { title, mainVal, secondaryVal, percentage, positive } = props;

  return(
    <div className="stat-wrapper">
      <div className="stat-title-wrapper">
        <div className="stat-title">{title}</div>
        {/* <Tooltip title="Predicted Ratio is calculated by using historical ratio, current trends and your goal targets.">
          <FuseSvgIcon className="ml-6" size={16} color="disabled">
            heroicons-solid:information-circle
          </FuseSvgIcon>
        </Tooltip> */}
      </div>
      <div className="stat-num-wrapper">
        <div className="stat-mainstat">{mainVal}</div>
        <div className="stat-substats-wrapper">
          <div className="stat-substats-top-wrapper">
            {positive ? 
              <svg xmlns="http://www.w3.org/2000/svg" className="stat-arrow" viewBox="0 0 20 20" fill="rgb(22, 163, 74)">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg> : 
              <svg xmlns="http://www.w3.org/2000/svg" className="stat-arrow" viewBox="0 0 20 20" fill="rgb(220, 38, 38)">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
              </svg>
            }
            {positive ?
              <div className="stat-substat stat-green">{percentage}</div> :
              <div className="stat-substat stat-red">{percentage}</div>
            }
          </div>
          <div>
            {positive ?
              <div className="stat-substat stat-green">{secondaryVal}</div> :
              <div className="stat-substat stat-red">{secondaryVal}</div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default StockGraph;
