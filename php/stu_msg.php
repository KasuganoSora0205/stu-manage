<?php
error_reporting(0);
header('Content-Type:text/json;charset=utf-8');
$conn = mysqli_connect('127.0.0.1','root','','student_management',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "SELECT * FROM student";
$result = mysqli_query($conn,$sql);
while($row = mysqli_fetch_assoc($result)){
    $stuMsg[] = $row;
}
echo json_encode($stuMsg);