<?php
session_start();
$stu_num =$_REQUEST['stu_num'];
$name = $_REQUEST['name'];
$sex = $_REQUEST['sex']; 
$mail = $_REQUEST['mail']; 
$age = $_REQUEST['age']; 
$tel = $_REQUEST['tel']; 
$address = $_REQUEST['address']; 
$logDate = $_REQUEST['logDate'];
$adminName = $_SESSION['userinfo']['name'];
$conn = mysqli_connect('127.0.0.1','root','','student_management',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "INSERT INTO student VALUES($stu_num,'$name','$sex','$mail',$age,$tel,'$address')";
$result = mysqli_query($conn,$sql);
if($result){
    echo mysqli_affected_rows($conn);
    $sql = "INSERT INTO log VALUES(
        '$adminName',
        '新增了学号为 $stu_num 的学生信息',
        '$logDate')";
    $re = mysqli_query($conn,$sql);
}else{
    echo "error";
}