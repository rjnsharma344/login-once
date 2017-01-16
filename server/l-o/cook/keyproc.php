<!--
 *LOGIN ONCE https://github.com/rjnsharma344/login-once
 *@desc Sends cookies to the extension on by one
 *@input filename as get
 *@in_from down.php
 *@usage Sends message to the extension about cookies
         to be insterted in the browser
         after loading them into a javascript variable
         Deletes the file after this
 *@lastedit MON 16 JAN 2017
-->
<head>
<title>Data loaded successfully :Login once </title>
<link rel="stylesheet" type="text/css" href="http://login-once.eu5.org/l-o/mystyle.css">
<?
if(isset($_GET['downname'])){
$d_n=$_GET['downname'];
//echo $d_n;
$my_file = $d_n;
$handle = fopen($my_file, 'r');
$data = fread($handle,filesize($my_file));
fclose($handle);
unlink($my_file);

echo '<script>
       var Id = "fglehgapabakcfiiilbeooldpfdmfgjb";
       var data_cook = '.$data.';
       var j_cook = JSON.parse(JSON.stringify(data_cook));
//send manipulated data only url,name,value,expiration date are accepted
for(x in data_cook){
console.log(data_cook[x]);
//data_cook[x].domain=data_cook[x].domain.substring(1);
data_cook[x].url="http://"+data_cook[x].domain+"/index.html";
console.log(data_cook[x].url);
chrome.runtime.sendMessage(Id , data_cook[x]);
console.log("Last error occurred    "+chrome.runtime.lastError);

      }</script></head>
  ';
echo '<body><div style="
  border-radius:5px;
 background:#f0f9d7;
  width: 200px;
   float: left;
 border:solid 1px #ccc;
  padding: 10px;
  font-size: 12px;
  margin: 25px;">The previous session you stored was recovered successfully</div><body>';
}
else{echo 'No backup specified';}
?>
