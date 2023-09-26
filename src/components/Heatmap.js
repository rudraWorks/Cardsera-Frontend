import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import '../components/HeatmapStyles.css'
import ReactTooltip from 'react-tooltip';

const getCount = (value) => {
    if (value <= 10)
        return 1;
    if (value <= 70)
        return 2;
    if (value <= 100)
        return 3;
    if (value <= 200)
        return 4;
    return 5;
}

function Heatmap({ dayWiseReviews }) {
    dayWiseReviews = dayWiseReviews.map((item) => {
        return { date: item.time, count: getCount(item.value) }
    })
    return (
        <CalendarHeatmap
            startDate={new Date('2022-12-31')}
            endDate={new Date('2023-12-31')}
            values={dayWiseReviews}
            classForValue={value => {
                if (!value) {
                    return 'color-empty';
                }
                return `color-github-${value.count}`;
            }}
        />
    )
}

export default Heatmap