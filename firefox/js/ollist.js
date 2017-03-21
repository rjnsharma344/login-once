function listbuilder(acc_tok,callback,name){
  var url="https://www.googleapis.com/drive/v3/files";
//  if(!name){var name="back.logins.txt";}
  var params="?q="+encodeURI("name = '"+name+"'");
  var http = new XMLHttpRequest(); var response;
  http.open("GET", url+params, true);
  http.setRequestHeader("Authorization", " Bearer "+acc_tok);
  http.onreadystatechange = function() {if(http.readyState==4){response=JSON.parse(http.responseText);}
  if(http.status==401){console.log("Acces token expired");starme("1");}
  if(http.readyState == 4 && http.status == 200) {
    response=JSON.parse(http.responseText);
     console.log(JSON.stringify(response));
     if(response.files.length == 0){createfile(acc_tok,name,callback);}
     else if(response.files.length != 0){
       if(response.files.length==1){callback(response);}
       if(response.files.length>1){
         var i;for(i=0;i<response.files.length-1;i++){deletefile(acc_tok,response.files[i].id);response.files.splice(i,1);} //delete them
         response.files=response.files[response.files.length-1];callback(response);}
       }}
     else if(http.status!=200 && http.readyState ==4){if(JSON.parse(http.responseText).error){callback(1);}}
}
http.send(null);
}

function createfile(acc_tok,name,callback) {
  var url="https://www.googleapis.com/drive/v3/files";
  var parms= JSON.stringify({"name":name});
  var http = new XMLHttpRequest();
  var response;
  http.open("POST", url, true);
  http.setRequestHeader("Authorization", " Bearer "+acc_tok);
  http.setRequestHeader("Content-type", "application/json");
  http.onreadystatechange = function() {
  if(http.readyState == 4 && http.status == 200) {
    response=JSON.parse(http.responseText);
    console.log(http.responseText);
    if(response.id){
      console.log("File created successfully");
  listbuilder(acc_tok,callback,name);
    }
  } else if(http.readyState ==4 && http.status !=200){
    console.log(http.responseText);
  //  if(JSON.parse(http.responseText).error){callback(1);}
  }
}
  http.send(parms);
}

function deletefile(acc_tok,id,callback){
  var url="https://www.googleapis.com/drive/v3/files/";
  var http = new XMLHttpRequest();
  var response;

  http.open("delete", url+id, true);
  http.setRequestHeader("Authorization", " Bearer "+acc_tok);
  http.onreadystatechange = function() {
  if(http.readyState == 4 && http.status == 200) {
    response=JSON.parse(http.responseText);
  //  console.log(http.responseText);
if(callback){callback("File deleted successfully");}
      console.log("File deleted successfully");
  } else if(http.readyState ==4 && http.status !=200){
  //  console.log(http.responseText);
  }
}
  http.send(null);
}
