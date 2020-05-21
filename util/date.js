const getMonthName = (monthNum) => {
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
};

const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month, year) => {
  return (new Date(year, month, 1).getDay() + 6) % 7;
};

const setDate = () => {
  const today = new Date();
  const monthNum = today.getMonth();
  const day = new Date().getDate();
  const year = today.getFullYear();
  const month = getMonthName(monthNum);
  return `${month} ${day}, ${year}`;
};

module.exports = { getMonthName, getDaysInMonth, getFirstDayOfMonth, setDate };
