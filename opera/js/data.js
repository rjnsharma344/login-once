var cook = new Object();
 cook.file_name="back.logins.txt";
 cook.file_id;
 cook.local;
 cook.drive;
var pass = new Object();
  pass.file_name="back.pass.txt";
  pass.file_id;
  pass.local="";
  pass.drive;
  pass.key;
var pass_change=0;
var authurl="https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=postmessage&origin=http://login-once.eu.ai/&prompt=consent&response_type=code&client_id=504763576943-e4i9e16p6akttev2f5f2iroqgdr5tuvt.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/drive+https://www.googleapis.com/auth/drive.appdata&access_type=offline";
// new not in firefox
var deleted_cookies=[];
chrome.cookies.onChanged.addListener(function(cookie){if(cookie.removed){deleted_cookies[deleted_cookies.length]=cookie.cookie;}});
