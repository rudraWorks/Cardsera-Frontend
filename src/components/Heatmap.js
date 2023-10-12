import React, { useState } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import '../components/HeatmapStyles.css'

const getCount = (value) => {
    if (value <= 10)
        return 1
    if (value <= 70)
        return 2
    if (value <= 100)
        return 3
    return 4
}

function Heatmap({ dayWiseReviews }) {
    const [data, setData] = useState(null)

    dayWiseReviews = dayWiseReviews.map((item) => {
        return { date: item.time, count: getCount(item.value), cards: item.value }
    })
    return (
        <>
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
                onClick={value => {
                    if (!value)
                        return setData(null)
                    setData({ date: value.date, cards: value.cards })
                }}
            />
            <i><small>      {data && removeLast((new Date(data.date).toUTCString()).toString())+"|" } {data?.cards} {data && "Cards reviewed"}
            </small></i>
        </>
    )
}

export const removeLast = (str) => {
    for(let i=0;i<12;++i)
        str = str.slice(0,-1)
    return str
}
export default Heatmap