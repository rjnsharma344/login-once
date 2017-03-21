var firsturl;
// firefox
// When clicked the extension icon
function focusOrCreateTab(url) {
var existing_tab="";
  browser.windows.getAll({populate:true},function(windows){
    //console.log(windows);
    for(var i in windows){
      for(var j in windows[i].tabs){
    //console.log(windows[i].tabs[j]);
    if(windows[i].tabs[j].url==url){
      existing_tab=windows[i].tabs[j];
      console.log("tab found");break;
      }
    }
  }
  if(existing_tab){
    console.log("existing_tab exists");
    var updating = browser.tabs.update(existing_tab.id,{"active":true});
}
  else{
    console.log("not exist");
    browser.tabs.create({"url":url, "active":true});
  }
  });
}
// Extension click listner BUIlT IN
browser.browserAction.onClicked.addListener(function(tab) {
  var manager_url = browser.extension.getURL("manager.html");
if(!firsturl) firsturl=manager_url;
  focusOrCreateTab(firsturl);
});
// Message receive
browser.runtime.onMessage.addListener(
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
browser.storage.onChanged.addListener(function (objects,area){
  console.log("storage changed=>");console.log(objects);
  if(objects.pass_word){
    console.log("pass_word change dedected");
    checkpass("1");
    updateall(objects);}
  if(objects.refresh_token){startme(1);}
  if(objects.access_token){
    access_token=objects.access_token.newValue;
  setTimeout(checkreftok,3550*1000);
  }
});


browser.cookies.onChanged.addListener(function(info) {
  browser.cookies.getAll({'storeId':'0'},function(cookies){
cook.local = cookies; });
  });
