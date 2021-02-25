import * as moment from "moment-timezone";

function isNightNow() {
  const hoursNow = moment().tz("Europe/Moscow").hours();

  return hoursNow >= 21 || hoursNow <= 8 ? true : false;
}

export default isNightNow;
