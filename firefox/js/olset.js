var sallsetcooks,s_t,len,yes=0,no=0,cnt=0,exp=0;
function scompareforset(drive_cooks) {
var  local_cooks=cook.local;
cook.drive=drive_cooks;
console.log("Cookie Comparison started");
var i,j,csn,ll=local_cooks.length,dl=drive_cooks.length,odl=drive_cooks.length;
var matches=0;
for(i=0;i<ll;i++){
  for(j=0;j<dl;j++){
    if((local_cooks[i].domain==drive_cooks[j].domain&&local_cooks[i].expirationDate==drive_cooks[j].expirationDate&&local_cooks[i].name==drive_cooks[j].name&&local_cooks[i].value==drive_cooks[j].value)){
      matches++;
      drive_cooks.splice(j,1); dl--; j--;
    }else {drive_cooks[j].url="http://"+drive_cooks[j].domain+"/index.html";}
  }
}// new not in firefox starts
var deleted=0;
console.log("deleted_cookies");
console.log(deleted_cookies);
for(i in deleted_cookies){
  for(j in drive_cooks){
    if((deleted_cookies[i].domain==drive_cooks[j].domain&&deleted_cookies[i].expirationDate==drive_cooks[j].expirationDate&&deleted_cookies[i].name==drive_cooks[j].name&&deleted_cookies[i].value==drive_cooks[j].value)){
      deleted++;
      //console.log("A deleted cookie");
      drive_cooks.splice(j,1); j--;
    }else {drive_cooks[j].url="http://"+drive_cooks[j].domain+"/index.html";}
  }
}
deleted_cookies=[];
// new not in firefox ends

console.log("Matches "+matches+" Deleted:"+deleted+" Local "+ll+"In drive"+odl+" From array"+dl);
olsetcooks(drive_cooks);
}
function olsetcooks(set_cooksin) {
  console.log("Ol set cooks called");
sallsetcooks=set_cooksin;
yes=0,no=0,cnt=0,exp=0;
console.log("cnt:"+cnt);
len=sallsetcooks.length;
console.log("len:"+len);
setTimeout(olsetcook,100);
var d=new Date; s_t=d.getTime();
}

function olsetcook() {
  console.log("olsetcook called from olsetcook");
var set_cooks=sallsetcooks[cnt++];
//console.log("set_cooks:");console.log(set_cooks);
if(cnt<len){
  if(!set_cooks.url){set_cooks.url="http://"+set_cooks.domain+"/index.html";}
      browser.cookies.set({
      "name": set_cooks.name,
      "expirationDate": set_cooks.expirationDate,
      "url": set_cooks.url,
      "value": set_cooks.value
  }, function (result) {
    console.log(result);
      if(s_t>set_cooks.expirationDate){exp++;}
    if(result){yes++;/*console.log(JSON.stringify(result));/**/} else {no++;/*console.log(set_cooks.expirationDate);/**/}
    setTimeout(olsetcook,1);
  });}
  else {
    startme("cooks down");
    var d= new Date; t=d.getTime()-s_t;
    console.log("Finished at"+d.getTime()+" in "+t+" milliseconds"+"\nSuccess "+yes +"Failiures" +no+" Expired cookies"+exp);
  }
}
