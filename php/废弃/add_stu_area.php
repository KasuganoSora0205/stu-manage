<?php
    header('Content-Type:text/html; charset=UTF-8');
?>
<div class='add-stu'>
<form id='add'>
    <div class='form-group'>
        <label for='add_stu_num' class='control-label'>学号:</label>
        <div class='msg-input'>
            <input type='text' class='form-control' name='stu_num' id='add_stu_num' placeholder='请输入10位学号'>
        </div>
    </div>
    <div class='form-group has-num'>
        <div class='alert-warning'>
            提示：请输入正确的学号！
        </div>
    </div>
    <div class='form-group'>
        <label for='add_name' class='control-label'>姓名:</label>
        <div class='msg-input'>
            <input type='text' class='form-control' name='name' id='add_name' placeholder='请输入姓名'>
        </div>
    </div>
    <div class='form-group'>
        <label for='add_sex' class='control-label'>性别:</label>
        <div class='msg-input'>
            <label class='radio-inline'>
                <input type='radio' name='sex' value='男'> 男
            </label>
            <label class='radio-inline'>
                <input type='radio' name='sex' value='女'> 女
            </label>
        </div>
    </div>
    <div class='form-group'>
        <label for='add_mail' class='control-label'>邮箱:</label>
        <div class='msg-input'>
            <input type='text' name='mail' class='form-control' id='add_mail' placeholder='请输入邮箱'>
        </div>
    </div>
    <div class='form-group'>
        <label for='add_age' class='control-label'>年龄:</label>
        <div class='msg-input'>
            <input type='text' name='age' class='form-control' id='add_age' placeholder='请输入年龄'>
        </div>
    </div>
    <div class='form-group'>
        <label for='add_tel' class='control-label'>联系电话:</label>
        <div class='msg-input'>
            <input type='text' name='tel' class='form-control' id='add_tel' placeholder='请输入联系电话'>
        </div>
    </div>
    <div class='form-group'>
        <label for='add_address' class='control-label'>住址:</label>
        <div class='msg-input'>
            <input type='text' name='address' class='form-control' id='add_address' placeholder='请输入住址'>
        </div>
    </div>
    <div class='form-group'>
        <div class='btn-group'>
            <input class='btn-default' id='submit_new' type='button' value='提交'>
            <input class='btn-default reset' type='button' value='重置'>
        </div>
    </div>
    <div class='success'>提交成功！</div>
</form>
</div>