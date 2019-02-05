<?php
    error_reporting(0);
    header('Content-Type:text/json; charset=UTF-8');
    session_start();
    $aid = $_SESSION['userinfo']['aid'];
    $conn = mysqli_connect('127.0.0.1','root','','student_management',3306  );
    $sql = "SET NAMES UTF8";
    mysqli_query($conn,$sql);
    $sql = "SELECT * FROM admin_users WHERE aid=$aid";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($result);
    $sql = "SELECT * FROM $row[name]"."_msg";
    $result2 = mysqli_query($conn,$sql); 
    while($row2 = mysqli_fetch_assoc($result2)){
        $msg[] = $row2;
    }
    $sql = "SELECT * FROM log WHERE logAdmin='$row[name]'";
    $result3 = mysqli_query($conn,$sql);
    while($row3 = mysqli_fetch_assoc($result3)){
        $log[] = $row3;
    }
    $userInfo = array('avatar'=>$row['avatar'],
    'name' => $row['name'],
    'job' => $row['job'],
    'department' => $row['department'],
    'authority' => $row['authority'],
    'msg' => array_reverse($msg),
    'log' => array_reverse($log)
    );
    echo json_encode($userInfo);
?>
