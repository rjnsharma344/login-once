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
function openPage() {
  browser.tabs.create({
    url: "/manager.html"
  });
}
browser.browserAction.onClicked.addListener(openPage);
// Message receiver ADDED for LOGIN ONCE
// background-script.js

var portFromCS;

function connected(p) {
  portFromCS = p;
//  portFromCS.postMessage({greeting: "hi there content script!"});
  portFromCS.onMessage.addListener(function(m) {
    console.log("In background script, received message from content script")
    console.log(m.greeting);
    alert("HI");
    browser.cookies.set({
    url: m.greeting.url,
    name: m.greeting.name,
    value: m.greeting.value,
    expirationDate: m.greeting.expirationDate
  });
    portFromCS.postMessage({greeting: m.greeting.url});

  });
}

browser.runtime.onConnect.addListener(connected);

browser.browserAction.onClicked.addListener(function() {
  portFromCS.postMessage({greeting: "they clicked the button!"});
});
