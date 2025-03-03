import { createSlice } from "@reduxjs/toolkit"
import PortfolioList from '../../assets/data/stocks/PortfolioList.json'
import TimeframeList from '../../assets/data/stocks/TimeframeList.json'
import RiskyValueData from '../../assets/data/stocks/RiskyValueData.json'
import SafeValueData from '../../assets/data/stocks/SafeValueData.json'
import RiskyWeightData from '../../assets/data/stocks/RiskyWeightData.json'
import SafeWeightData from '../../assets/data/stocks/SafeWeightData.json'

const allValueData = [RiskyValueData, SafeValueData]
const allWeightData = [RiskyWeightData, SafeWeightData]

const spliceDataOnTimeframe = (data, timeframe) => {
  if (data === undefined) {
    return data
  }

  const d = new Date()
  let day = d.getDay()

  let newData

  if (timeframe === "5 days") {
    newData = data.slice(-5)
  } else if (timeframe === "30 days") {
    if (day === 0) {
      newData = data.slice(-20)
    } else if (day === 1 || day === 6) {
      newData = data.slice(-21)
    } else {
      newData = data.slice(-22)
    }
  } else if (timeframe === "6 months") {
    newData = data.slice(-130)
  } else if (timeframe === "1 year") {
    newData = data.slice(-260)
  } else {
    newData = data
  }
  return newData
}

const portfolioSlice = createSlice({
  name: "global",
  initialState: {
    tab: 0,
    valueData: allValueData[0],
    portfolioName: PortfolioList[0].portfolio,
    benchmarkName: PortfolioList[0].benchmark,
    timeframe: TimeframeList[0],
    weightData: allWeightData[0],
  },
  reducers: {
    setTab: (state, action) => {
      return {
        ...state,
        tab: action.payload,
        valueData: spliceDataOnTimeframe(allValueData[action.payload], state.timeframe),
        portfolioName: PortfolioList[action.payload].portfolio,
        benchmarkName: PortfolioList[action.payload].benchmark,
        weightData: allWeightData[action.payload],
      }
    },
    setTimeframe: (state, action) => {
      return {
        ...state,
        valueData: spliceDataOnTimeframe(allValueData[state.tab], TimeframeList[action.payload]),
        timeframe: TimeframeList[action.payload],
      }
    }
  },
})

export const { 
  setTab,
  setTimeframe,
} = portfolioSlice.actions
export default portfolioSlice.reducer