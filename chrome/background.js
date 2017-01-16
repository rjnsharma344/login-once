// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/*
 *LOGIN ONCE https://github.com/rjnsharma344/login-once
 *@desc Listen clicks on extension bar and messages from authorised server
 *@usage This code is used with some modification to original source
         to listen to the data sent by the server and create cookies with them
 *@lastedi MON 16 JAN 2017
*/

// Cookie changed listner BUILT IN
chrome.cookies.onChanged.addListener(function(info) {
  console.log("onChanged" + JSON.stringify(info));
});
// Tab changer BUILT IN
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
  focusOrCreateTab(manager_url);
});
// Message receiver ADDED for LOGIN ONCE
chrome.runtime.onMessageExternal.addListener(
  //listens for messages
  function(request, sender, sendResponse) {
  //sets cookies with data in the message
    chrome.cookies.set({
    "name": request.name,
    "expirationDate": request.expirationDate,
    "url": request.url,
    "value": request.value
}, function (cookie) {
        console.log(JSON.stringify(cookie));
        console.log(chrome.extension.lastError);
        console.log(chrome.runtime.lastError);
    });

  });
