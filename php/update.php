<?php
session_start();
$adminName = $_SESSION['userinfo']['name'];
$logDate = $_REQUEST['logDate'];
$edit_num = $_REQUEST['edit_num'];
$stu_num =$_REQUEST['stu_num'];
$name = $_REQUEST['name'];
$sex = $_REQUEST['sex']; 
$mail = $_REQUEST['mail']; 
$age = $_REQUEST['age']; 
$tel = $_REQUEST['tel']; 
$address = $_REQUEST['address']; 
$conn = mysqli_connect('127.0.0.1','root','','student_management',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "UPDATE student SET stu_num=$stu_num,name='$name',sex='$sex',mail='$mail',age=$age,tel=$tel,address='$address' WHERE stu_num=$edit_num";
$result = mysqli_query($conn, $sql);
if($result){
    echo 'success';
    $sql = "INSERT INTO log VALUES(
        '$adminName',
        '修改了学号为 $stu_num 的学生信息',
        '$logDate')";
    $re = mysqli_query($conn,$sql);
}else{
    echo $sql;
}