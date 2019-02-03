<?php
session_start();
$adminName = $_SESSION['userinfo']['name'];
$stu_num = $_REQUEST['stu_num'];
$logDate = $_REQUEST['logDate'];
$conn = mysqli_connect('127.0.0.1','root','','student_management',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "DELETE FROM student WHERE stu_num=$stu_num";
$result = mysqli_query($conn, $sql);
if($result){
    echo 'success';
    $sql = "INSERT INTO log VALUES(
        '$adminName',
        '删除了学号为 $stu_num 的学生信息',
        '$logDate')";
    $re = mysqli_query($conn,$sql);
}