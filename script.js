let alertShow = false;

setInterval(() => {
  document.title = alertShow ? "Welcome Buddy❤️" : "Explore my website";

  alertShow = !alertShow;
}, 1000);
import "bootstrap";
