<?php
session_start();
$name = $_REQUEST['name'];
$pwd = $_REQUEST['pwd'];
$email = $_REQUEST['email'];
$authority = $_REQUEST['authority'];
$job = $_REQUEST['job'];
$department = $_REQUEST['department'];
$logDate = $_REQUEST['logDate'];
$adminName = $_SESSION['userinfo']['name'];
$conn = mysqli_connect('127.0.0.1','root','','student_management',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "INSERT INTO admin_users VALUES(
    NULL,
    '$name',
    '../static/admin_avatar.jpg',
    '$pwd',
    $authority,
    '$job',
    '$department',
    '$email',
    '')";
$result = mysqli_query($conn,$sql);
if($result){
    echo 1;
    $sql = "CREATE TABLE $name"."_msg(
        msgID INT PRIMARY KEY AUTO_INCREMENT,
        msg VARCHAR(1000),
        fromWho VARCHAR(16),
        msgDate VARCHAR(32),
        isRead BOOLEAN
    )";
    $result = mysqli_query($conn,$sql);
    $sql = "INSERT INTO log VALUES(
        '$adminName',
        '新增了帐号名为 $name 的管理员',
        '$logDate')";
    mysqli_query($conn,$sql);
}