var code = document.getElementById("response-form-encoded");
if(code.value){
  console.log(code.value);
  console.log("Code found");
//message send
  chrome.runtime.sendMessage({authCode: code.value}, function(response) {
//if(response.respCode == code.value.substr(7)){
  console.log("Success");
  console.log(response);
  window.location.replace('https://google.com');
  //}
});

}
