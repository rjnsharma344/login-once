<!--
 *LOGIN ONCE https://github.com/rjnsharma344/login-once
 *@desc Last confirmation before loading all cookies
 *@usage uses encryyption mechanism provide by http://bit.ly/2iswvsW
         Receives cookie data in an encrypted form and converts it to
         original form and stores in a local file. It asks for confirmation
         and if user accepts it takes him to the last step of loading cookies
         by passing the filename alone to the next keyproc.php
 *@lastedit MON 16 JAN 2017
--><head>
<title>Confirm load your backup: Login once</title>
<link rel="stylesheet" type="text/css" href="http://login-once.eu5.org/l-o/mystyle.css">
</head>
<?
function encrypt_decrypt($action, $string) {
    $output = false;

    $encrypt_method = "AES-256-CBC";
    $secret_key = 'This is my secret key boss';
    $secret_iv = 'This is my secret iv';

    // hash
    $key = hash('sha256', $secret_key);

    // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
    $iv = substr(hash('sha256', $secret_iv), 0, 16);

    if( $action == 'encrypt' ) {
        $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
        $output = base64_encode($output);
    }
    else if( $action == 'decrypt' ){
        $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
    }

    return $output;
}
if(isset($_POST['cook'])){
$cook=encrypt_decrypt('decrypt', $_POST['cook']);

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
$downname=generateRandomString();


$file_name=$downname;
$myfile = fopen($file_name, "w") or die("Unable to open file!");
fwrite($myfile, $cook ,strlen($cook));

echo '<div style="
  border-radius:5px;
 background:#f0f9d7;
  width: 200px;
   float: left;
 border:solid 1px #ccc;
  padding: 10px;
  font-size: 12px;
  margin: 25px;">
      <form action="http://login-once.eu5.org/l-o/cook/keyproc.php" method="get">
      <input type="hidden" name="downname" value="'.$downname.'"><p style="font-size:16">Sure to load All data</p>
      <button class="buttons button2"type="submit" value="Submit">Yes</input>
      </form>
      </div>';
/*DEBUG COMMANDS
echo $downname;
echo '\n     COOK'.strlen($cook).'\n POST'.strlen($_POST['cook']);
echo '<hr>\n   Filesize';
echo filesize($downname);
*/
fclose($myfile);
}
else{echo 'Nothing received';}
?>
