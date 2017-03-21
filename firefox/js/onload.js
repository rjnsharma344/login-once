var refresh_token;
var access_token;
browser.cookies.getAll({}).then(function(cookies){cook.local = cookies;console.log(cookies);});
function startme(args){
//console.log("paused_playing:"+paused_playing);console.log("pass_change:"+pass_change);
  if(args==1){
    setTimeout(function(){startme("1");},1*30*1000);
  //  console.log("Calling checkreftok");
  //  checkreftok(startme); args=0;
  }
  if(pass_change!=1&&paused_playing!="paused"){
    if(args==1){
      if(access_token){checkpass("access_token");console.log("access_token is found calling checkpass(\"access_token\")");}
      else{checkpass("1");}
      if(!access_token){console.log("Calling checkreftok");
      checkreftok(startme);}
    }
if(args['refresh_token']){
  refresh_token=args['refresh_token'];  console.log("Refresh token Received successfully");
  ref2tok(args['refresh_token'],checkpass); console.log("Calling ref2tok()");}

if(args=="access_token"||args['access_token']){
//access_token is set in ref2tok
  console.log("Access token Received successfully");
  listbuilder(access_token,startme,cook.file_name);}
  if(args['kind']=="drive#fileList"&&args['files'][0].name==cook.file_name){
  console.log("back.logins.txt received");
  cook.file_id=args['files'][0].id;
  browser.cookies.getAll({}).then(function(cookies){
      cook.local = cookies;
      console.log(cookies);
      downloadfile(access_token,cook.file_id,scompareforset,startme,pass.key);});

}
if(args=="cooks down"||args=="down"){
  if(args=="cooks down"){console.log("startme Download and local update completed ");}
  if(args=="down"){console.log("startme Nothing in drive");}
browser.cookies.getAll({}).then(function(cookies){
    cook.local = cookies;
    console.log(cookies);
    updatefile(access_token,cook.local,cook.file_id,startme,pass.key);});
}
if(args=='updone'){
  console.log("Uploaded cookies successfully");
  }
}
else {if(pass_change==1){console.log("Password change is happening");}if(paused_playing=="paused"){console.log("Paused");}}
}
