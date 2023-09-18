
const formatChange = (ddmmyyyy) => {
    const arr = ddmmyyyy.split('/')
    let day = arr[1]
    if(day.length===1)
        day="0"+day
    let month = arr[0]
    if(month.length===1)
        month="0"+month
    const year = arr[2]
    const yyyymmdd = year+"-"+month+"-"+day 
    return yyyymmdd
}

export default formatChange 