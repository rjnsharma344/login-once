<!--
 *LOGIN ONCE https://github.com/rjnsharma344/login-once
 *@desc Receives cookie data as POST from form in manager.html
        Creates session and saves an username which is randomly generated string
        creates a file in the name of username and stores the data
 *@prev manager.html in chrome extension
 *@next cook.php and down/google-drive.html
 *@usage Receives cookie data and saves locally and allows user to save in drive
 *@lastedit MON 16 JAN 2017
-->
<?
echo '<title>Upload to drive :Login once</title><link rel="stylesheet" type="text/css" href="mystyle.css">';
if(isset($_POST['one'])){
$cook=$_POST['one'];

echo '<div id="onediv">Logins received successfully. Please backp it to drive so that you can download somewhere else';
echo '<br>';
function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

session_start();
$_SESSION['userName'] = generateRandomString();
$file_name=$_SESSION['userName'];
$myfile = fopen($file_name, "w") or die("Unable to open file!");
fwrite($myfile, $cook);
fclose($myfile);

echo '<script src="https://apis.google.com/js/platform.js" async defer></script>
<div style="float:left" class="g-savetodrive"
   data-src="http://login-once.eu5.org/l-o/cook.php"
   data-filename="back.logins.txt"
   data-sitename="Login_once">
</div><div style="float:right"><form action="http://login-once.eu5.org/l-o/down/google-drive.html">
    <button class="buttons button2" type="submit">Download from drive</input></form></div></div>';
}

?>
