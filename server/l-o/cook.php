<!--
 *LOGIN ONCE https://github.com/rjnsharma344/login-once
 *@desc receives data from file named by username of the
        current user , produces an encrypted output and deltes
        the file 
 *@prev index.php
 *@next none
 *@usage Gives an encryped form of cookie data only to store in drive
 *@lastedit MON 16 JAN 2017
--><?
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
//func ends
session_start();
if(isset($_SESSION['userName'])) {
$my_file = $_SESSION['userName'];
$handle = fopen($my_file, 'r');
$data = fread($handle,filesize($my_file));
fclose($handle);
echo encrypt_decrypt('encrypt', $data);
unlink($my_file);
}
else echo 'No session is running';
?>
