import React from 'react'
import Navbar from './components/Navbar'
import StockGraph from './components/StockGraph'
import { ReactComponent as GithubIcon } from './github.svg'

function PortfolioGenerator() {

  return (
    <div class="page">
      <div>
        <Navbar isToTop={false} />
        <div class="section">
          <StockGraph portfolioType="Risky"/>
        </div>
        <div class="section">
          <h2 >Requirements</h2>
          <ul>
            <li>Must always have 10 Stocks in portfolio</li>
            <li>Start with $100000 cash in the portfolio</li>
            <li>Stocks must be in the S&P 500</li>
            <li>All stock must make up a minimum of 5% of a portfolio</li>
            <li>All stock must make up a maximum of 35% of a portfolio</li>
            <li>Partial shares are allowed</li>
          </ul>
          <br></br>
          <p>* Note: These are changed from the original project guidelines</p>
        </div>
        <div class='section'>
          <h2>Strategy</h2>
          <p>
            From the S&P500, the riskiest stock is chosen using a combination of standard deviation and beta analysis.
            The rest of the stocks are then compared against the risky stock to determine which ones correlate the most.
            The top 9 of which are chosen to make up the portfolio along with the riskiest stock.
          </p>
          <br></br>
          <p>
            When deciding the distribution of cash, 35% is given to the riskiest stock and 5% is automatically given to the other 9.
            The top 3 most correlated are then tested on the best way to distribute the remaining 20% to optimise standard deviation.
          </p>
        </div>
        <div class="section">
          <a
            href="https://github.com/dylanfaelker/StockPortfolioCreater"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon class="github-link"/>
          </a>
        </div>
        <div className="section">
          <p>* Credit is given to Brashan Mohanakumar, Abirami Karthikeyan and Jingling Ye for their work on the project</p>
        </div>
      </div>
    </div>
  )
}

export default PortfolioGenerator