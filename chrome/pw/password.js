// listener functions
function changingthepass(){//for setting the pass for first time or changing the pass first time
  var input=document.getElementById('password').value;
  console.log("Change"+document.getElementById('password').value);
  console.log(drive_pass);
  if(old_pass_enter==0){
  try{
    var plain=AesCtr.decrypt(drive_pass,input,256);
    if(plain==input){
    console.log("Correct password");
    document.getElementById("snackbar").className="";
    document.getElementById('msg').innerText = old_pass_true;
    old_pass_enter=1;
    document.getElementById('password').value="";}
    else{old_pass_enter=0;
    document.getElementById("snackbar").className = "show";
    console.log("Wrong password");}
  }
  catch(e){
    old_pass_enter=0;
    document.getElementById("snackbar").className = "show";
    console.log("Wrong password");
  }}
if(old_pass_enter==1) {
  document.getElementById('pwSet').addEventListener('click',setpassandupdateall);
  //lister for new changes and after user clicks submit setpassandupdateall
  console.log("Old pass word was correct enter new one");
  }
}
function changedpass(){//for first time new pass or just entering a changed pass
  //check input == decrypt(drive_pass,input,256)
  var input=document.getElementById('password').value;
  //console.log("Change"+document.getElementById('password').value);
  //console.log(drive_pass);
  try{
    var plain=AesCtr.decrypt(drive_pass,input,256);
    if(plain==input){
    console.log("Correct password");
    document.getElementById("snackbar").className="";
    document.getElementById('msg').innerText = changed_pass_true;
    document.getElementById('pwSet').addEventListener('click',setpass);
  }
  else{
    document.getElementById("snackbar").className = "show";
    document.getElementById('pwSet').removeEventListener('click','setpass');
    document.getElementById('msg').innerText = changed_pass_text;
  }
  }
  catch(e){
    if(e.name=="URIError"&&e.message=="URI malformed"){console.log("Wrong password");}
    document.getElementById("snackbar").className = "show";
    document.getElementById('pwSet').removeEventListener('click','setpass');
    document.getElementById('msg').innerText = changed_pass_text;
}
}
function logpass(){
  console.log("Change"+document.getElementById('password').value);
}
// after set pass and set pass and update all close the tab

// listner functions
var pass_word="n",drive_pass="n",local_pass="n",calls=4;
var old_pass_enter=0;
function show(){
  if(calls==0){
    if(drive_pass!="n"&&local_pass!="n"&&drive_pass!=""){
      old_pass_enter=0;
      document.getElementById('password').addEventListener('input',changingthepass);
      console.log("For changing the password");
      //reset button show
      document.getElementById('forgot').style.display = 'block';
      document.getElementById('msg').innerText = old_pass_text;
    }
    else if((drive_pass==""&&local_pass=="")||(drive_pass==""&&local_pass!="")){
      console.log("For setting new password");
      old_pass_enter=1;
      document.getElementById('password').addEventListener('input',changingthepass);
      document.getElementById('msg').innerText = new_pass_text;
    }
    else if(drive_pass!="n"&&drive_pass!=""&&local_pass=="n"){//this is done
      console.log("For entering the changed password");
      //reset button show
      document.getElementById('forgot').style.display = 'block';
      document.getElementById('msg').innerText = changed_pass_text;
      document.getElementById('password').addEventListener('input',changedpass);
    }
console.log("drive_pass"+drive_pass);
console.log("local_pass"+local_pass);
    console.log("Finished");
  }
  else{console.log("Ongoing calls");}
}
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('forgot').style.display = 'none';
  document.getElementById('reset').addEventListener('click',function(){
    console.log("Reset button clicked");
    var forgot_url = chrome.extension.getURL("/pw/forgot.html");
    window.location.replace(forgot_url);
  });
  document.getElementById('pwSet').style.display = 'block';
  chrome.runtime.sendMessage({pass_change: 1}, function(response) {
  console.log("Success");
  console.log(response);
});
//  document.getElementById('password').addEventListener('input',logpass);
//  document.getElementById('pwSet').addEventListener('click',setpass);
calls--;show();
});
// two functions for setting pass redirect to success.html
function setpass(){

  document.getElementById('pwSet').removeEventListener('click',setpass);
  //for only new password
chrome.storage.sync.remove("pass_word");
  var pass_word=document.getElementById('password').value;
  chrome.storage.sync.set({"pass_word":pass_word});
  console.log("set password after removing old one");
  var success_url = chrome.extension.getURL("/pw/success.html");
  window.location.replace(success_url);

  //use when pass_word is updated somewhere else
}
function setpassandupdateall() {
  document.getElementById('pwSet').removeEventListener('click',setpassandupdateall);
  var pass_word=document.getElementById('password').value;
  chrome.storage.sync.set({"pass_word":pass_word});
  console.log("Set password without removing old one");
  var success_url = chrome.extension.getURL("/pw/success.html");
  window.location.replace(success_url);
// changing or setting password first time
}


window.addEventListener("beforeunload", function( event ) {
  console.log(event);
  //let that change in updateall function or deleteall function
  chrome.runtime.sendMessage({pass_change: 0}, function(response) {
  console.log("Success");
  console.log(response);
  });
});


chrome.storage.sync.get("pass_word",function(item){
  if(item['pass_word']||item['pass_word']==""){
    pass_word=item["pass_word"];
    console.log("pass_word is found");
  }
  else{
    console.log("pass_word not found");
  }calls--;show();
});
chrome.storage.sync.get("local_pass",function(item){
  if(item['local_pass']||item['local_pass']==""){
    local_pass=item['local_pass'];
    console.log("local_pass is found");
  }
  else{
    console.log("local_pass not found");
  }calls--;show();
});
chrome.storage.sync.get("drive_pass",function(item){
  if(item['drive_pass']||item['drive_pass']==""){
    drive_pass=item['drive_pass'];
    console.log("drive_pass is found");
  }
  else{
    console.log("drive_pass not found");
  }calls--;show();
});

var changed_pass_text="You have changed your password some where else.Enter the changed password.";
var changed_pass_true="Password matches with the one you have already entered. Confirm by clicking Submit";
var old_pass_text="Enter your old password here";
var new_pass_confirm="Please confirm again by clicking submit";
var old_pass_true="Correct. Please enter a new password";
var old_pass_false="The password you entered is wrong";
var new_pass_text="Enter the password you like.";
    new_pass_text+="You will be prompted to enter this password again in all other browsers you are already signed in and other new browsers";
    new_pass_text+=" If you forget this you will loss all your previously synced data in drive and need to start sync from first";
