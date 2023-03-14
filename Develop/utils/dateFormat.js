const dateFormat = (timestamp) => {
  const dateObj = new Date(timestamp);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();
  const milliseconds = dateObj.getMilliseconds();
  const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${milliseconds}`;
  return time;
}
module.exports = dateFormat;