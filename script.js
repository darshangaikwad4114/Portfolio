let alertShow = false;

setInterval(() => {
  document.title = alertShow ? "Welcome Buddy❤️" : "I'm Darshan";

  alertShow = !alertShow;
}, 1000);
