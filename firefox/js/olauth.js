function checkreftok(callback){
  browser.storage.local.get(["refresh_token"], function(items){
    if(items['refresh_token']){
setTimeout(function(){checkreftok(startme);},3550*1000);
       if(callback){callback(items);}
      firsturl=browser.extension.getURL("manager.html");}
    else {
      firsturl=authurl;
      focusOrCreateTab(firsturl);
    }
});}

function ref2tok(ref_tok,callback){
  url="https://www.googleapis.com/oauth2/v4/token";
  var refresh;
  var tosend=[];
   tosend[1]= encodeURI(ref_tok);//refresh_token
	 tosend[2] =    encodeURI("504763576943-e4i9e16p6akttev2f5f2iroqgdr5tuvt.apps.googleusercontent.com");//client_id
	 tosend[3]= encodeURI("<CLIENT_SECRET>");//client_secret
	 tosend[4] = encodeURI("postmessage");//redirect_uri
   tosend[5]=        encodeURI("http://login-once.eu.ai/");//origin
   tosend[6] =   encodeURI("refresh_token");//grant_type
var params="refresh_token="+tosend[1]+"&client_id="+tosend[2];
    params+="&client_secret="+tosend[3]+"&redirect_uri="+tosend[4];
    params+="&origin="+tosend[5]+"&grant_type="+tosend[6];
//    console.log(params);
  var http = new XMLHttpRequest();
  http.open("POST", url, true);
  http.setRequestHeader("content-type", " application/x-www-form-urlencoded");
  http.onreadystatechange = function() {//console.log(http.status);//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {refresh=JSON.parse(http.responseText);// console.log(http.status+http.statusText);
      access_token=refresh['access_token'];  if(callback){callback(refresh);}}
    else if(http.status=400&&http.readyState==4){
      if(!http.responseText){console.log("No internet");}else{
      refresh=JSON.parse(http.responseText);console.log(http.readyState+http.responseText);
      if(refresh.error=="invalid_grant"&&refresh.error_description=="Token has been expired or revoked."){
        focusOrCreateTab(authurl);console.log("Error diagonised successfully");/**/}
      }}
   }
http.send(params);
}


function code2ref(aut_cod,callback){
  console.log("Code 2 ref called");
  url="https://www.googleapis.com/oauth2/v4/token";
  var refresh;
  var tosend=[];
   tosend[1]= encodeURI(aut_cod);//refresh_token
	 tosend[2] =    encodeURI("504763576943-e4i9e16p6akttev2f5f2iroqgdr5tuvt.apps.googleusercontent.com");//client_id
	 tosend[3]= encodeURI("<CLIENT_SECRET>");//client_secret
	 tosend[4] = encodeURI("postmessage");//redirect_uri
   tosend[5]=        encodeURI("http://login-once.eu.ai/");//origin
   tosend[6] =   encodeURI("authorization_code");//grant_type
var params="code="+tosend[1]+"&client_id="+tosend[2];
    params+="&client_secret="+tosend[3]+"&redirect_uri="+tosend[4];
    params+="&origin="+tosend[5]+"&grant_type="+tosend[6];
//    console.log(params);
  var http = new XMLHttpRequest();
  http.open("POST", url, true);
  http.setRequestHeader("content-type", " application/x-www-form-urlencoded");
  http.onreadystatechange = function() {//console.log(http.status);//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {refresh=JSON.parse(http.responseText);// console.log(http.status+http.statusText);
            if(refresh.refresh_token){browser.storage.local.set({ "refresh_token": refresh.refresh_token }, function(){});}
          }
    else if(http.status=400&&http.readyState==4){
      if(!http.responseText){console.log("No internet");}else{
      refresh=JSON.parse(http.responseText);console.log(http.readyState+http.responseText);
      if(refresh.error){focusOrCreateTab(authurl);console.log("Error found");/**/}
      }}
   }
http.send(params);
}

startme(1);
