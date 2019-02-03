<?php
session_start();
$aid = $_REQUEST['aid'];
$pwd = $_REQUEST['pwd'];
$logDate = $_REQUEST['logDate'];
$thisAuthority = $_SESSION['userinfo']['authority'];
if($thisAuthority === 0){
    $conn = mysqli_connect('127.0.0.1','root','','student_management',3306);
    $sql = "SET NAMES UTF8";
    mysqli_query($conn,$sql);
    $sql = "UPDATE admin_users SET pwd='$pwd' WHERE aid=$aid";
    $result = mysqli_query($conn,$sql);
    if($result){
        echo 1;
        $sql = "INSERT INTO log VALUES('admin','修改了ID为 $aid 的管理员密码','$logDate')";
        $re = mysqli_query($conn,$sql);
    }
}