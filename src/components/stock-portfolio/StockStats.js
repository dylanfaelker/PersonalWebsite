import { Grid2, } from "@mui/material"
import { useEffect, useState } from "react"
import StockStat from "./StockStat"
import { useSelector } from "react-redux"

const StockStats = () => {

    const portfolioName = useSelector((state) => state.portfolio.portfolioName)
    const benchmarkName = useSelector((state) => state.portfolio.benchmarkName)
    const valueData = useSelector((state) => state.portfolio.valueData)

    const [portfolioValue, setPortfolioValue] = useState(valueData[valueData.length - 1].portfolio)
    const [portfolioPercentChange, setPortfolioPercentChange] = useState((valueData[valueData.length - 1].portfolio / valueData[0].portfolio) * 100 - 100)
    const [portfolioDollarChange, setPortfolioDOllarChange] = useState(valueData[valueData.length - 1].portfolio - valueData[0].portfolio)
    const [benchmarkValue, setBenchmarkValue] = useState(valueData[valueData.length - 1].benchmark)
    const [benchmarkPercentChange, setBenchmarkPercentChange] = useState((valueData[valueData.length - 1].benchmark / valueData[0].benchmark) * 100 - 100)
    const [benchmarkDollarChange, setBenchmarkDollarChange] = useState(valueData[valueData.length - 1].benchmark - valueData[0].benchmark)
    const [alpha, setAlpha] = useState(portfolioPercentChange - benchmarkPercentChange)
    useEffect(() => {
        const portValEnd = valueData[valueData.length - 1].portfolio
        const portValStart = valueData[0].portfolio
        const portDollarChange = portValEnd - portValStart
        const portPercentChange = (portValEnd / portValStart) * 100 - 100
        const benchValEnd = valueData[valueData.length - 1].benchmark
        const benchValStart = valueData[0].benchmark
        const benchDollarChange = benchValEnd - benchValStart
        const benchPercentChange = (benchValEnd / benchValStart) * 100 - 100
        const alpha = portPercentChange - benchPercentChange
        setPortfolioValue(portValEnd)
        setPortfolioPercentChange(portPercentChange)
        setPortfolioDOllarChange(portDollarChange)
        setBenchmarkValue(benchValEnd)
        setBenchmarkPercentChange(benchPercentChange)
        setBenchmarkDollarChange(benchDollarChange)
        setAlpha(alpha)
    }, [valueData])

    return (
        <Grid2 container columns={{ xs: 4, sm: 8, lg: 12 }} spacing={2}>
            <Grid2 size={4}>
                <StockStat 
                    title={'Portfolio Value (' + portfolioName + ')'}
                    units={'$'}
                    mainVal={portfolioValue.toFixed(2)} 
                    secondaryVal={portfolioDollarChange.toFixed(2)}
                    percentage={portfolioPercentChange.toFixed(2)}
                    positive={portfolioDollarChange >= 0}
                />
            </Grid2>
            <Grid2 size={4}>
                <StockStat 
                    title={'Benchmark Value (' + benchmarkName + ')'}
                    units={'$'}
                    mainVal={benchmarkValue.toFixed(2)} 
                    secondaryVal={benchmarkDollarChange.toFixed(2)}
                    percentage={benchmarkPercentChange.toFixed(2)}
                    positive={benchmarkDollarChange >= 0}
                />
            </Grid2>
            <Grid2 size={4}>
                <StockStat 
                    title='Alpha'
                    mainVal={alpha.toFixed(2)} 
                    secondaryVal={undefined}
                    percentage={undefined}
                    positive={alpha >= 0}
                />
            </Grid2>
        </Grid2>
    )
}

export default StockStats