import React from 'react'

const Timepoint = ({ point, length }) => {
    return (
        <div>
            {(point.id % 2 === 0) ?
            <div class="career-point">
                <div class='job'>
                    <p class='job-period text-right'>{point.date}</p>
                    <p class='job-title text-right'>{point.title}</p>
                    <p class='job-location text-right'>{point.sub}</p>
                </div>
                <div class="timeline">
                    <div class="doughnut"></div>
                    {point.id === length ?
                    <div class="line-end"></div> :
                    <div class="line"></div>}
                </div>
                <div class="spacer"></div>
            </div> :
            <div class="career-point">
                <div class="spacer"></div>
                <div class="timeline">
                    <div class="doughnut"></div>
                    {point.id === length ?
                    <div class="line-end"></div> :
                    <div class="line"></div>}
                </div>
                <div class='job'>
                    <p class='job-period text-left'>{point.date}</p>
                    <p class='job-title text-left'>{point.title}</p>
                    <p class='job-location text-left'>{point.sub}</p>
                </div>
            </div>}
        </div>

    )
}

export default Timepoint
