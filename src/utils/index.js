const getTimeDifference = previousDate => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = Math.abs(Date.now() - new Date(previousDate).valueOf());

  if (elapsed < msPerMinute) {
    return Math.round(elapsed/1000) + ' seconds ago';   
  }

  else if (elapsed < msPerHour) {
    return Math.round(elapsed/msPerMinute) + ' minutes ago';   
  }

  else if (elapsed < msPerDay ) {
    return Math.round(elapsed/msPerHour ) + ' hours ago';   
  }

  else if (elapsed < msPerMonth) {
    return Math.round(elapsed/msPerDay) + ' days ago';   
  }

  else if (elapsed < msPerYear) {
    return Math.round(elapsed/msPerMonth) + ' months ago';   
  }

  else {
    return Math.round(elapsed/msPerYear ) + ' years ago';   
  }
};

const capitalizeString = string => string.charAt(0).toUpperCase() + string.slice(1);


export {
  capitalizeString,
  getTimeDifference
};
