let alertShow = false;

setInterval(() => {
  document.title = alertShow ? "Welcome Buddy❤️" : "I'am Darshan";

  alertShow = !alertShow;
}, 1000);
