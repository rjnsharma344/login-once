 browser.storage.local.remove("local_pass");
 browser.storage.local.remove("drive_pass");
 //browser.storage.local.remove("pass_word");

function checkpass(args){
  if(args=="1"){
    console.log("checking pass");
    browser.storage.local.get("pass_word",function(item){
      if(item['pass_word']||item['pass_word']==""){
        pass.local=item['pass_word'];
        console.log("pass_word found in checkpass assigning it to pass.local");}
      else{
        browser.storage.local.set({"pass_word":""});
        pass.local="";
        console.log("pass_word not found in checkpass and hence setting it to \"\"");}
  });
}
if(args['access_token']||args=="access_token"){
  listbuilder(access_token,checkpass,pass.file_name);
  console.log("Access token received in password.js");
}
if(args['kind']=="drive#fileList"&&args['files'][0].name==pass.file_name){
//  access=args;
  console.log("back.pass.txt received");
  pass.file_id=args['files'][0].id;
  console.log(args);
  downloadfile(access_token,pass.file_id,checkpass,checkpass);
}
if(args=="down"){//password is downloaded

  console.log("Encypted password or nothing received");
  console.log("Drive: "+pass.drive+" \tLocal: "+pass.local);
    try{
      var plain=decrypt(pass.drive,pass.local);
      if(plain==pass.local){
        pass.key=plain;
        if(pass_change==1){pass_change=0;console.log("pass_change to 0");}
        startme("access_token");
      console.log("Passwords are same");
      browser.storage.local.set({"local_pass":pass.local});
      browser.storage.local.set({"drive_pass":pass.drive});
      password_context();//updating password context
    }
    else{
      console.log("Passwords are not same");
      console.log(pass.drive);
      console.log(pass.local);
      browser.storage.local.get("pass_word",function(item){
        if(item['pass_word']){browser.storage.local.remove("pass_word");/*delte it */}
      });
      var password_url = browser.extension.getURL("/pw/password.html");
      console.log("Focus or create password .html");
      pass_change=1;console.log("pass_change to 1");
      browser.storage.local.remove("local_pass");
      browser.storage.local.set({"drive_pass":pass.drive},function(){focusOrCreateTab(password_url);});
      password_context();//updating password context
    }
    }
    catch(e){console.log(e);
      //if(e.name=="URIError"&&e.message=="URI malformed"){
      console.log("Passwords are not same");
      console.log(pass.drive);
      console.log(pass.local);
      browser.storage.local.get("pass_word",function(item){
        if(item['pass_word']){browser.storage.local.remove("pass_word");/*delte it */}
      });
      var password_url = browser.extension.getURL("/pw/password.html");
      console.log("Focus or create password .html");
      pass_change=1;
      browser.storage.local.remove("local_pass");
      browser.storage.local.set({"drive_pass":pass.drive},function(){focusOrCreateTab(password_url);});
      password_context();//updating password context
    //}
    }
}
}
checkpass("1");

function encrypt(data,key){
  if(!key){console.log("No Password is found during encryption");return data;}
  else{return(AesCtr.encrypt(data, key, 256));}
}
function decrypt(data,key){
  if(!key){console.log("No Password is found during decryption");return data;}
  else{return(AesCtr.decrypt(data, key, 256));}
}
