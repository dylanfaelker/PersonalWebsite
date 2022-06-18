import React from 'react'

const Timepoint = ({ point, length }) => {
    point.date = point.date.replaceAll('\\n', '\n');
    point.title = point.title.replaceAll('\\n', '\n');
    point.sub = point.sub.replaceAll('\\n', '\n');
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
                    {point.id === 1 ?
                    <div class="line-end"></div> :
                    <div class="line"></div>}
                </div>
                <div class="spacer"></div>
            </div> :
            <div class="career-point">
                <div class="spacer"></div>
                <div class="timeline">
                    <div class="doughnut"></div>
                    {point.id === 1 ?
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
