import React from 'react'

const career = ({ career }) => {
    return (
        <div>
            {(career.id % 2 == 0) ?
            <div class="career-point">
                <div class='job'>
                    <p class='job-period text-right'>{career.date}</p>
                    <p class='job-title text-right'>{career.title}</p>
                    <p class='job-location text-right'>{career.location}</p>
                </div>
                <div class="timeline flex-column">
                    <div class="doughnut"></div>
                    <div class="line"></div>
                </div>
                <div class="spacer"></div>
            </div> :
            <div class="career-point">
                <div class="spacer"></div>
                <div class="timeline flex-column">
                    <div class="doughnut"></div>
                    <div class="line"></div>
                </div>
                <div class='job'>
                    <p class='job-period text-left'>{career.date}</p>
                    <p class='job-title text-left'>{career.title}</p>
                    <p class='job-location text-left'>{career.location}</p>
                </div>
            </div>}
        </div>

    )
}

export default career
