var deleted_cookies=[];
chrome.cookies.onChanged.addListener(function(cookie){
  console.log(cookie);
  console.log(cookie.cookie.domain);
  if(cookie.removed){deleted_cookies[deleted_cookies.length]=cookie.cookie;}
  console.log(deleted_cookies);
});
