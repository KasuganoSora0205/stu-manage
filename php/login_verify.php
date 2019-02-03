<?php
session_start();
header('Content-Type:text/plain');
$name = $_REQUEST['name'];
$pwd = $_REQUEST['pwd'];
$lastlogintime = $_REQUEST['lastlogintime'];
$conn = mysqli_connect('127.0.0.1','root','','student_management',3306);
$sql = 'SET NAMES UTF8';
mysqli_query($conn,$sql);
$sql = "SELECT * FROM admin_users WHERE name='$name'";
$result = mysqli_query($conn,$sql);
if($result){
    $row = mysqli_fetch_assoc($result);
    if($row['pwd'] === $pwd){
        echo 1;
        $_SESSION['userinfo'] = [
            'aid' => $row['aid'],
            'name' => $name,
            'pwd' => $pwd,
            'authority' => (int)$row['authority']
          ];
          $sql = "UPDATE admin_users SET lastlogintime='$lastlogintime' WHERE aid=$row[aid]";
          mysqli_query($conn,$sql);
          $sql = "INSERT INTO log VALUES(
            '$name',
            '登录了管理系统',
            '$lastlogintime')";
          $re = mysqli_query($conn,$sql);
    }else if($row === NULL){
        echo -1;
    }else{
        echo 0;
    }
}

