var firsturl;
// When clicked the extension icon
function focusOrCreateTab(url) {
  chrome.windows.getAll({"populate":true}, function(windows) {
    var existing_tab = null;
    for (var i in windows) {
      var tabs = windows[i].tabs;
      for (var j in tabs) {
        var tab = tabs[j];
        if (tab.url == url) {
          existing_tab = tab;
          break;
        }
      }
    }
    if (existing_tab) {
      chrome.tabs.update(existing_tab.id, {"selected":true});
    } else {
      chrome.tabs.create({"url":url, "selected":true});
    }
  });
}
// Extension click listner BUIlT IN
chrome.browserAction.onClicked.addListener(function(tab) {
  var manager_url = chrome.extension.getURL("manager.html");
if(!firsturl) firsturl=manager_url;
  focusOrCreateTab(firsturl);
});
// Message receive
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.execute=="deleteall"){
      console.log("Delete all requested");
      deleteall();
      //call to delete all function
      sendResponse({"received": 'successfully'});
    }
    if(request.execute == "checkreftok"){setTimeout(checkreftok,1000); sendResponse({answer: 'Timeoutset'});}
    if (request.authCode){
    var myCode=request.authCode.substr(5);
code2ref(myCode);
    sendResponse({respCode: 'Received'});}
    if(request.pass_change==0||request.pass_change==1){
      pass_change=request.pass_change;
      sendResponse({pass_change: 'Change'});}
  });
// Access or refresh token changed
chrome.storage.onChanged.addListener(function (objects,area){
  console.log("storage changed=>");console.log(objects);
  if(objects.pass_word){
    checkpass("1");
    updateall(objects);}
  if(objects.refresh_token){startme(1);}
  if(objects.access_token){
    access_token=objects.access_token.newValue;
  setTimeout(checkreftok,3550*1000);
  }
});


chrome.cookies.onChanged.addListener(function(info) {
  chrome.cookies.getAll({'storeId':'0'},function(cookies){
cook.local = cookies; });
  });
