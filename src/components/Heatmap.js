import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import fakeDates from '../utils/fakeDates'
import '../components/HeatmapStyles.css'
import ReactTooltip from 'react-tooltip';


function Heatmap({dayWiseReviews}) {
    dayWiseReviews = dayWiseReviews.map((item)=>{
        return {date:item.time,count:item.value}
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