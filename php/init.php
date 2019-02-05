<?php
session_start();
header('Content-Type:application/json; charset=utf-8');
if($_SESSION!=NULL){
    $admin = $_SESSION['userinfo']['name'];
    $conn = mysqli_connect('127.0.0.1','root','','student_management',3306);
    $sql = "SET NAMES UTF8";
    mysqli_query($conn,$sql);
    $sql = "SELECT * FROM admin_users WHERE name='$admin'";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($result);
    $sql = "SELECT * FROM ".$admin."_msg WHERE isRead=FALSE";
    $result = mysqli_query($conn,$sql);
    $rows = mysqli_affected_rows($conn);
    $arr = array('avatar'=>$row['avatar'],'msgNum'=>$rows);
    echo(json_encode($arr));
}else{
    $arr = array('url'=>'http://127.0.0.1/student_item/view/login.html');
    echo(json_encode($arr));
}