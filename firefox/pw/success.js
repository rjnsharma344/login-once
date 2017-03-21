document.addEventListener('DOMContentLoaded', function() {
// for sending that password has been changed  Successfully
  browser.runtime.sendMessage({pass_change: 1}, function(response) {
  console.log("Success");
  console.log(response);
});
});
