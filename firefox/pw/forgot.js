// listener functions
function changingthepass(){//for setting the pass for first time or changing the pass first time
  var input=document.getElementById('password').value;
  console.log(input);
  if(forgot_pass_enter==0){
if(input=="FORGOT PASSWORD"){
  console.log("FORGOT PASSWORD entered correctly");
  forgot_pass_enter=1;
  document.getElementById('msg').innerText = forgot_pass_true;
}
else{
  forgot_pass_enter=0;
  console.log("FORGOT PASSWORD not entered correctly");
  document.getElementById('msg').innerText = forgot_pass_false;}
  }
if(forgot_pass_enter==1) {
  document.getElementById('pwSet').addEventListener('click',setpass);
  console.log("Please click submit to reset the password.");
  }
}
// after set pass and set pass and update all close the tab

// listner functions
var pass_word="n",drive_pass="n",local_pass="n",calls=3;
var forgot_pass_enter=0;
function show(){
  if(calls==0){
    if(drive_pass!="n"&&local_pass!="n"&&drive_pass!=""){
      forgot_pass_enter=0;
      document.getElementById('password').addEventListener('input',changingthepass);
      console.log("For resetting the password");
      document.getElementById('msg').innerText = forgot_pass_text;
    }
    else if((drive_pass==""&&local_pass=="")||(drive_pass==""&&local_pass!="")){
      console.log("For setting new password");
      forgot_pass_enter=1;
      document.getElementById('msg').innerText = forgot_pass_none;
      document.getElementById('form').style.display = 'none';
    }
    else if(drive_pass!="n"&&drive_pass!=""&&local_pass=="n"){//this is done
      console.log("For entering the changed password");
      document.getElementById('msg').innerText = forgot_pass_text;
      document.getElementById('password').addEventListener('input',changingthepass);
    }
console.log("drive_pass"+drive_pass);
console.log("local_pass"+local_pass);
    console.log("Finished");
  }
  else{console.log("Ongoing calls");}
}
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('pwSet').style.display = 'block';
  browser.runtime.sendMessage({pass_change: 1}, function(response) {
  console.log("Success");
  console.log(response);
});

});
// two functions for setting pass redirect to success.html
function setpass(){

  document.getElementById('pwSet').removeEventListener('click',setpass);
//  browser.storage.local.remove("pass_word");
  console.log("set password after removing old one");
  browser.runtime.sendMessage({"execute": "deleteall"}, function(response) {
  console.log("Success");
  console.log(response);
  var success_url = browser.extension.getURL("/pw/success.html");
  window.location.replace(success_url);
});
// call to some func which will delete back.pass.txt and back.logins.txt in the drive and then call checkpass

//use for real forgot password
}

window.addEventListener("beforeunload", function( event ) {
  console.log(event);
  browser.runtime.sendMessage({pass_change: 0}, function(response) {
  console.log("Success");
  console.log(response);
  });
});


browser.storage.local.get("pass_word",function(item){
  if(item['pass_word']||item['pass_word']==""){
    pass_word=item["pass_word"];
    console.log("pass_word is found");
  }
  else{
    console.log("pass_word not found");
  }calls--;show();
});
browser.storage.local.get("local_pass",function(item){
  if(item['local_pass']||item['local_pass']==""){
    local_pass=item['local_pass'];
    console.log("local_pass is found");
  }
  else{
    console.log("local_pass not found");
  }calls--;show();
});
browser.storage.local.get("drive_pass",function(item){
  if(item['drive_pass']||item['drive_pass']==""){
    drive_pass=item['drive_pass'];
    console.log("drive_pass is found");
  }
  else{
    console.log("drive_pass not found");
  }calls--;show();
});

var forgot_pass_none="No password is set";
var forgot_pass_text="Enter \"FORGOT PASSWORD\" in the above box if you have forgot your password";
var forgot_pass_true="Please click submit to reset the password";
var forgot_pass_false="You have not entered \"FORGOT PASSWORD\" correctly in the textbox";
