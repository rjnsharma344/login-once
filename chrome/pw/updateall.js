// called when pass_word is changed
// add new sync items in 2 places here //bookmarks //cookies //password
var cook_id,book_id;
var updateall_calls;
function updateall_callcheck(){
  if(updateall_calls==0||updateall_calls<0){
    pass_change=0;
    console.log("Pass change procedure completed");
    console.log("pass_change "+pass_change);
    checkpass("access_token");}
  else{pass_change=1;console.log("Update all continues updateall_calls "+updateall_calls);}
}
function updateall(item) {
  updateall_calls=2;
  pass_change=1;// finish when all of any one type of update is complete
if(item.pass_word.oldValue&&(item.pass_word.newValue||item.pass_word.newValue=="")){
  //console.log("Old and new values are found");
  //console.log(item.pass_word.oldValue);
  //console.log(item.pass_word.newValue);
  if(pass.drive){//check for correct old value
  console.log("Old value exists here and in drive");
  try{
    var plain=decrypt(pass.drive,item.pass_word.oldValue);
    if(plain==item.pass_word.oldValue){
      //start uploading process i.e download and then upload
    console.log("Password is confirmed");console.log("Start downloading with oldValue and uploading with newValue");
//for password
    listbuilder(access_token,function (items){
      pass.file_id=items.files[0].id;
        updatefile(access_token,item.pass_word.newValue,pass.file_id,function (item) {
          console.log(item);console.log("New password set successfully");updateall_calls--;updateall_callcheck();
        },item.pass_word.newValue);
    },pass.file_name);
//for cookies
    listbuilder(access_token,function (items){
      cook_id=items.files[0].id;console.log("Cookies");
      downloadfile(access_token,cook_id,function(upload){
         updatefile(access_token,upload,cook_id,function(item){console.log("Cooks update finished");updateall_calls--;updateall_callcheck();},item.pass_word.newValue);
      },function(upload){
         updatefile(access_token,upload,cook_id,function(item){console.log("Cooks update finished");updateall_calls--;updateall_callcheck();},item.pass_word.newValue);
      },item.pass_word.oldValue);
    },cook.file_name);
    //change all and then put pass.local and pass.drive to be encrypted and decrypted values of pass
  }else{chrome.storage.sync.remove("local_pass",function(){
  focusOrCreateTab(chrome.extension.getURL("/pw/password.html"))}
);}}
  catch(e){
    console.log("Its not the old password");
      chrome.storage.sync.remove("local_pass",function(){
      focusOrCreateTab(chrome.extension.getURL("/pw/password.html"))}
    );}
}
}
else if(!item.pass_word.oldValue&&item.pass_word.newValue){
  if(pass.drive){//replacement for change in drive
  console.log("Only new value found and another value exists in drive");
  try{
    pass.local=item.pass_word.newValue;
    var plain=decrypt(pass.drive,item.pass_word.newValue);
    if(plain==pass.local){
      updateall_calls=0;updateall_callcheck();//change due to change in another device
    console.log("Password is confirmed");
    chrome.storage.sync.set({"local_pass":pass.local});
    chrome.storage.sync.set({"drive_pass":pass.drive});
  }else{chrome.storage.sync.remove("local_pass",function(){
  focusOrCreateTab(chrome.extension.getURL("/pw/password.html"))}
);}}
  catch(e){
      chrome.storage.sync.remove("local_pass",function(){
      focusOrCreateTab(chrome.extension.getURL("/pw/password.html"))}
    );}
}
else{//start updating by downloading and uploading new password require additions
  pass.local=item.pass_word.newValue;
  console.log(pass.local);
//for password
updatefile(access_token,pass.local,pass.file_id,function (item) {
  updateall_calls--;updateall_callcheck();
  console.log(item);console.log("New password is set to drive successfully");},pass.local);
//for cookies
    listbuilder(access_token,function (items){
      cook_id=items.files[0].id;console.log("Cookies");
      downloadfile(access_token,cook_id,function(upload){
         updatefile(access_token,upload,cook_id,function(item){
           updateall_calls--;updateall_callcheck();
           console.log("Cookies updated after pass is set");},item.pass_word.newValue);
      },function(upload){
         updatefile(access_token,upload,cook_id,function(item){
           updateall_calls--;updateall_callcheck();
           console.log("Cookies updated after pass is set");},item.pass_word.newValue);
      });
    },cook.file_name);
//followed by others
}//else ends
}//new password first time or replace for change in drive
password_context();
}//function ends


function deleteall(){
//for password
console.log("deleteall called from called");
//for cookies
      listbuilder(access_token,function (items){
        console.log(items);
      listbuilder(access_token,function (items){
        console.log(items);
        deletefile(access_token,items.files[0].id,function(item){
          console.log("pass_change"+pass_change);
          console.log(item);
          pass_change=0;
          chrome.storage.sync.remove("pass_word");
          checkpass("access_token");
        });
      },
      cook.file_name);
      deletefile(access_token,items.files[0].id,function(item){console.log("pass_change"+pass_change);
      console.log(item);
      pass_change=0;
      checkpass("access_token");
    });
    }
      ,pass.file_name);
//change all and then put pass.local and pass.drive to be encrypted and decrypted values of pass

}
