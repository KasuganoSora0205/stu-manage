<?php
session_start();
header('Content-Type:text/html;charset=utf-8');
$aid = $_REQUEST['aid'];
$conn = mysqli_connect('127.0.0.1','root','','student_management',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT * FROM admin_users WHERE aid=$aid";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($_SESSION['userinfo']['authority'] <= $row['authority']){
    echo"<div class='change-wrapper'>
    <form id='admin_msg' class='change'>
        <button type='button' class='close btn-default' id='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
        <h3 class='change-msg'>修改管理员帐号</h3>
        <div class='form-group'>
            <label for='aid' class='change-label'>管理员ID:</label>
            <div class='msg-input'>
                <input type='text' class='form-change' name='aid' id='aid' placeholder='管理员ID' readonly>
            </div> 
        </div>
        <div class='form-group'>
            <label for='change_name' class='change-label'>管理员:</label>
            <div class='msg-input'>
                <input type='text' class='form-change' name='name' id='change_name' placeholder='管理员用户名'>
            </div>
        </div>
        <div class='form-group'>
            <label for='change_authority' class='change-label'>权限等级:</label>
            <div class='msg-input'>
                <input type='text' name='authority' class='form-change' id='change_authority' placeholder='权限等级0~2，从高到低'>
            </div>
        </div>
        <div class='form-group'>
            <label for='change_job' class='change-label'>工作职位:</label>
            <div class='msg-input'>
                <input type='text' name='job' class='form-change' id='change_job' placeholder='工作职位'>
            </div>
        </div>
        <div class='form-group'>
            <label for='change_department' class='change-label'>所属部门:</label>
            <div class='msg-input'>
                <input type='text' name='department' class='form-change' id='change_department' placeholder='所属部门'>
            </div>
        </div>
        <div class='form-group'>
            <label for='change_mail' class='change-label'>邮箱:</label>
            <div class='msg-input'>
                <input type='text' name='email' class='form-change' id='change_email' placeholder='邮箱'>
            </div>
        </div>
        <div class='form-group'>
            <div class='btn-group'>
                <input class='admin-change btn-default' id='submit' type='button' value='提交'>
            </div>
        </div>
    </form>
    </div>";
}else{
    echo "<div class='change-wrapper'>
    <form id='admin_msg' class='change'>
        <button type='button' class='close btn-default' id='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
        <h3 class='false-msg'>您的权限低于被修改的管理员帐号</h3>
    </form>
    
    </div>";
}