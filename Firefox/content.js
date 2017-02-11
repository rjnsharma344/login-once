console.log("Content script loaded");
// listen.js
window.addEventListener('message', function(event) {
  console.log(event.data);    // Message from page script
  console.log(event.origin);
}, false);
var len = window.wrappedJSObject.data_cook.length;
console.log(len);

console.log("C S echo");

//https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/connect
// content-script.js

var myPort = browser.runtime.connect({name:"port-from-cs"});
for (var i = 0; i < len; i++) {
myPort.postMessage({greeting: window.wrappedJSObject.data_cook[i]});
}
myPort.onMessage.addListener(function(m) {
  console.log("Received ");
  console.log(m.greeting);
});

document.body.addEventListener("click", function() {
  myPort.postMessage({greeting: "they clicked the page!"});
});

