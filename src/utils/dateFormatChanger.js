
const formatChange = (ddmmyyyy) => {
    const arr = ddmmyyyy.split('/')
    const day = arr[0]
    const month = arr[1]
    const year = arr[2]
    const yyyymmdd = year+"-"+month+"-"+day 
    return yyyymmdd
}

export default formatChange