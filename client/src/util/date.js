export function getMonthName(monthNum) {
  let month;
  switch (monthNum) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
    default:
      month = "Month";
      break;
  }

  return month;
}

export function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(month, year) {
  return (new Date(year, month, 1).getDay() + 6) % 7;
}

export function setDate() {
  const today = new Date();
  const monthNum = today.getMonth();
  const day = new Date().getDate();
  const year = today.getFullYear();
  const month = getMonthName(monthNum);
  return `${month} ${day}, ${year}`;
}

export function setDay() {
  const today = new Date().getDay();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var dayName = days[today];
  return `${dayName}`;
}

export function setCurrentDay(day) {
  const selectedDay = day % 7;
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var dayName = days[selectedDay];
  return `${dayName}`;
}
