<?php
session_start();
$aid = $_REQUEST['aid'];
$name = $_REQUEST['name'];
$authority = $_REQUEST['authority'];
$email = $_REQUEST['email'];
$job = $_REQUEST['job'];
$department = $_REQUEST['department'];
$logDate = $_REQUEST['logDate'];
$thisAuthority = $_SESSION['userinfo']['authority'];
$thisName = $_SESSION['userinfo']['name'];
$conn = mysqli_connect('127.0.0.1','root','','student_management',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT * FROM admin_users WHERE aid=$aid";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
$oldAuthority = $row['authority'];

if($aid == $_SESSION['userinfo']['aid'] && $oldAuthority != $authority){
    echo "4";
}else if($oldAuthority == 0 && $authority != 0){
    echo -1;
}else if($thisAuthority <= $oldAuthority){
    $sql = "UPDATE admin_users SET name='$name',
    authority=$authority,
    job='$job',
    department='$department',
    email='$email' WHERE aid=$aid";
    $result = mysqli_query($conn,$sql);
    if($result){
        echo 1;
        $sql = "INSERT INTO log VALUES(
            '$thisName',
            '修改了管理员 $name 的信息',
            '$logDate')";
        $re = mysqli_query($conn,$sql);
        if(!$re){
            echo "$sql";
        }
    }else{
        echo 0;
    }
}else if($oldAuthority != 0 && $authority == 0){
    echo 2;
}else if($oldAuthority < $thisAuthority){
    echo 3;
}