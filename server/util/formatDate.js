module.exports = {

   formatDate: function (date) {
    var hours = date.getHours(),
      minutes = date.getMinutes(),
         ampm = hours >= 12 ? 'pm' : 'am',
      DaysArr = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri'],
      MonthsArr = ['Januray', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        // Month = date.getMonth() +1;
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return `${DaysArr[date.getDay()]} ${MonthsArr[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${hours}:${minutes}${ampm}`;
  }
}
