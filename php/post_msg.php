<?php
session_start();
$to = $_REQUEST['to'];
$msg = $_REQUEST['msg'];
$fromWho = $_SESSION['userinfo']['name'];
$msgDate = $_REQUEST['msgDate'];
if($to === $fromWho){
    echo -1;
}else{
    $conn = mysqli_connect('127.0.0.1','root','','student_management',3306);
    $sql = "SET NAMES UTF8";
    mysqli_query($conn,$sql);
    $sql = "INSERT INTO ".$to."_msg VALUES(NULL,'$msg','$fromWho','$msgDate',FALSE)";
    $result = mysqli_query($conn,$sql);
    if($result){
        echo mysqli_affected_rows($conn);
        $sql = "INSERT INTO log VALUES('$fromWho','向 $to 发送了信息','$msgDate')";
        $result2 = mysqli_query($conn,$sql);
        if(!$result2){
            echo $sql;
        }
    }else{
        echo $sql;
    }
}