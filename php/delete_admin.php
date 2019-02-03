<?php
session_start();
$aid = $_REQUEST['aid'];
$logDate = $_REQUEST['logDate'];
$thisAuthority = $_SESSION['userinfo']['authority'];
$thisName = $_SESSION['userinfo']['name'];
$conn = mysqli_connect('127.0.0.1','root','','student_management',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT * FROM admin_users WHERE aid=$aid";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$delAuthority = $row['authority'];
if($delAuthority == 0 || $delAuthority <= $thisAuthority){
    echo 0;
}else if($delAuthority > $thisAuthority){
    $sql = "DELETE FROM admin_users WHERE aid=$aid";
    $result1 = mysqli_query($conn,$sql);
    $sql = "DROP TABLE ".$row['name']."_msg";
    $result2 = mysqli_query($conn,$sql);
    if($result&&$result2){
        echo 1; 
        $sql = "INSERT INTO log VALUES(
            '$thisName',
            '删除了管理员帐号 $row[name]',
            '$logDate')";
        $re = mysqli_query($conn,$sql);
    }else{
        echo -1;
    }
}