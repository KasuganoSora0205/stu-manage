<?php
session_start();
header('Content-Type:text/plain;charset=utf-8');
$aid = $_REQUEST['aid'];
$conn = mysqli_connect('127.0.0.1','root','','student_management',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT * FROM admin_users WHERE aid=$aid";
$result = mysqli_query($conn,$sql);
if($result){
    $row = mysqli_fetch_assoc($result);
    if($_SESSION['userinfo']['authority'] <= $row['authority']){
        echo 1;
    }
}else{
    echo $sql;
}
