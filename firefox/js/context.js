var paused_playing; var paused_playing_text; var password_text;
function paused_playing_context(){
browser.storage.local.get("paused_playing",function (item){
  if(item['paused_playing']){
    console.log("Found paused_playing");
    paused_playing=item['paused_playing'];
    if(item['paused_playing']=="paused"){paused_playing_text="Resume";}
    if(item['paused_playing']=="playing"){paused_playing_text="Pause";}
}
  else{
    console.log("Not found paused_playing");
    browser.storage.local.set({"paused_playing":"playing"});
    paused_playing="playing";
    paused_playing_text="Pause";
  }
  context[0].title=paused_playing_text;
  updatecontext();
});
}
// for password 1. set 2. change 3. enter
function password_context(){
  if(pass.local&&pass.drive){
  try{
    var plain=decrypt(pass.drive,pass.local);
    if(plain==pass.local){
      pass_change=0;
    console.log("password_context Passwords are same");
    password_text="Change password";

    // same passwords //change password
    }
  else{
    console.log("password_context not same");// not same passwords
    password_text="Enter changed password";
  }
  }
  catch(e){console.log(e);
    console.log("password_context not same");
    password_text="Enter changed password";
    //passwords are not same
  }
}
else{
  if(!pass.drive&&!pass.local){
    pass_change=0;
    password_text="Set password";
    console.log("password_context no drive and password");
  }
  else if(!pass.drive){
    password_text="Enter changed password";
    console.log("password_context no drive password");
  }
  else if(!pass.local){
    password_text="Enter changed password";
    console.log("password_context no local password");
  }
  else{console.log("password_context No condition satisfied");}
  // no password
}
context[1].title=password_text;
updatecontext();
}


var context=[];
 context[0]=new Object();
 context[0].id="0";
 context[0].title="Sync";
 context[0].type="normal";
 context[0].onclickfunc=function(item){//for changing
   console.log("paused_playing was clicked <= from function in the context menu");
   if(paused_playing=="playing"){browser.storage.local.set({"paused_playing":"paused"},paused_playing_context);}
   if(paused_playing=="paused"){browser.storage.local.set({"paused_playing":"playing"},paused_playing_context);}
 }

 context[1]=new Object();
 context[1].id="1";
 context[1].title="Change Password";
 context[1].type="normal";
 context[1].onclickfunc=function(item){//for changing
   console.log("Change password was clicked <= from function in the context menu");
   var password_url = browser.extension.getURL("/pw/password.html");
   console.log("Focusing or creating password .html");
   browser.storage.local.set({"local_pass":pass.local},function(){
   browser.storage.local.set({"drive_pass":pass.drive},function(){focusOrCreateTab(password_url);}
   );
   });
 }

  context[2]=new Object();
  context[2].id="2";
  context[2].title="Export/Import";
  context[2].type="normal";
  context[2].onclickfunc=function(item){//for changing
    console.log("Export import was clicked <= from function in the context menu");
    var exim_url = browser.extension.getURL("/exim/exim.html");
    console.log("Focusing or creating password .html");
    focusOrCreateTab(exim_url);
}
context[2]=new Object();
context[2].id="2";
context[2].title="Export/Import";
context[2].type="normal";
context[2].onclickfunc=function(item){//for changing
  console.log("Export import was clicked <= from function in the context menu");
  var exim_url = browser.extension.getURL("/exim/exim.html");
  console.log("Focusing or creating password .html");
  focusOrCreateTab(exim_url);
}

function updatecontext(){
browser.contextMenus.removeAll();
context.forEach(function(item){
  browser.contextMenus.create({"type":item.type,"id":item.id,"title":item.title}, function(){console.log("Context menu created successfully");});
});
}


paused_playing_context();
updatecontext();

browser.contextMenus.onClicked.addListener(function(item){
  console.log(context[item.menuItemId].title+" was clicked");
  if(context[item.menuItemId].onclickfunc){context[item.menuItemId].onclickfunc();}
});
