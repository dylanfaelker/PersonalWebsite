import React, { useEffect } from 'react'
import { StockGraph } from '../components/stock-portfolio'
import { useDispatch } from 'react-redux'
import { setTitle } from '../redux/slice/globalSlice'

function PortfolioGenerator() {

  const dispatch = useDispatch()
  useEffect(() => {dispatch(setTitle("PORTFOLIO GENERATOR"))})

  return (
    <div class="page">
      <div class='main'>
        <div class="section">
          <StockGraph/>
        </div>
        <div class="section">
          <h2 >Requirements</h2>
          <ul>
            <li>Must always have 10 Stocks in portfolio</li>
            <li>Start with $100000 cash in the portfolio</li>
            <li>Stocks must be in the S&P 500</li>
            <li>All stock must have a weighting between 5-35% of the portfolio</li>
            <li>Partial shares are allowed</li>
          </ul>
        </div>
        <div class='section'>
          <h2>Strategy</h2>
          <div class='sub-section'>
            <h4>Risky</h4>
            <p>
              The riskiest stock is the stock with the highest beta stock chosen the 3 highest standard deviations stocks.
              The other 9 stocks are the most correlated to the riskiest stock.
            </p>
            <br></br>
            <p>
              When deciding the distribution of cash, 35% is given to the riskiest stock and 5% is automatically given to the other 9.
              The remaining 20% of weight is distributed to the top 3 most correlated stocks based on the most optimal stand deviation for the entire portfolio.
            </p>
            <br></br>
            <p>
              This calculation is run once at the beginning of every month.
              The portfolio is then held till the end of the month when the portfolio is regenerated.
            </p>
          </div>
          <div class='sub-section'>
            <h4>Safe</h4>
            <p>
              The algorithm behind this portfolio is largely the same as the Risky Portfolio.
              The only difference is instead of aiming for higher standard deviation, beta, and correlation, it is now aiming for lower standard deviation, beta, and correlation.
            </p>
            <br></br>
            <p>
              The safeest stock is the stock with the lowest beta stock chosen the 3 lowest standard deviations stocks.
              The other 9 stocks are the least correlated to the safest stock.
            </p>
            <br></br>
            <p>
              When deciding the distribution of cash, 10% weight is given to each stock for even diversification.
            </p>
            <br></br>
            <p>
              This calculation is run once at the beginning of every month.
              The portfolio is then held till the end of the month when the portfolio is regenerated.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioGenerator