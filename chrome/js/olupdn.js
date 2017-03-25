function downloadfile(acc_tok,id,callback,nojsonindrive,key){
  var url="https://www.googleapis.com/drive/v3/files/"; //{fileid} ?alt=media
  var http = new XMLHttpRequest();
  console.log(id);
    console.log("Download Request started");
  http.open("get", url+id+"?alt=media", true);
  http.setRequestHeader("Authorization", " Bearer "+acc_tok);
  http.onreadystatechange = function() {
    if(http.status==401){console.log("Acces token expired");startme("1");}
// expire
  if(http.readyState == 4 && http.status == 200) {
    if(id==pass.file_id){console.log("Password file");pass.drive=http.responseText;nojsonindrive("down");}
    else{
  try{
    if(key){refresh=JSON.parse(decrypt(http.responseText,key));callback(refresh);}
    else{refresh=JSON.parse(http.responseText);callback(refresh);}
  }
  catch(e){
  //add an exception that is bad key for decryption and call checkpass
    if(e.name="SyntaxError"&&e.message=="Unexpected end of JSON input"){
      nojsonindrive("down");
      console.log("Error diagonosed");}
    else{nojsonindrive("down");}
}//try catch end
}// not a password file

}//ready state if
}//on onreadystatechange if
  http.send(null);
}

function updatefile(acc_tok,upload_data,id,callback,key) {
  var url="https://www.googleapis.com/upload/drive/v3/files/"; //{fileid} use after creating a file
  var http = new XMLHttpRequest();
  console.log("Upload Request started");
  http.open("patch", url+id+"?uploadType=media", true);
  http.setRequestHeader("Authorization", " Bearer "+acc_tok);
  http.setRequestHeader("Content-type", "text/plain");
  http.onreadystatechange = function() {//Call a function when the state changes.
  if(http.readyState == 4 && http.status == 200) {
    refresh=http.responseText;
    console.log(refresh);
    if(JSON.parse(refresh).id){
      if(callback){callback("updone");}
//file uploaded successfully
    }
  } else{/*if(http.responseText){var restxt=JSON.parse(http.responseText); ;} console.log("No reply"); Errors parse later*/}
  }
  if(id==pass.file_id){
    console.log("Pass file id");
    http.send(encrypt(upload_data,key));
  }
  else{
    if(key){http.send(encrypt(JSON.stringify(upload_data),key));}
    else{http.send(JSON.stringify(upload_data));}}
}
