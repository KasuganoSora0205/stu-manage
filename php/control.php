<?php
header('Content-Type:text/json;charset=utf-8');
$conn = mysqli_connect('127.0.0.1','root','','student_management',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "SELECT * FROM admin_users";
$result = mysqli_query($conn,$sql);
while($row = mysqli_fetch_assoc($result)){
    $adminList[] = $row;
}
echo json_encode($adminList);
?>

