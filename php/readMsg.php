<?php
session_start();
$msgID = (int)$_REQUEST['msgID'];
$adminName = $_SESSION['userinfo']['name'];
$conn = mysqli_connect('127.0.0.1','root','','student_management',3306);
$sql = "SEET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "UPDATE $adminName"."_msg SET isRead=TRUE WHERE msgID=$msgID";
$result = mysqli_query($conn,$sql);
if($result){
    echo 'success';
}else{
    echo $sql;
}