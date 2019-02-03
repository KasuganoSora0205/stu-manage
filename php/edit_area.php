<?php
header('Content-Type:text/html; charset=UTF-8');
?>
<div class='edit-wrapper'>
    <form id='msg' class='edit'>
        <button type='button' class='close btn-default' id='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
        <h3 class='edit-msg'>编辑信息</h3>
        <div class='form-group'>
            <label for='edit_stu_num' class='control-label'>学号:</label>
            <div class='msg-input'>
                <input type='text' class='form-control' name='stu_num' id='edit_stu_num' placeholder='学号'>
            </div>
        </div>
        <div class='form-group'>
            <label for='edit_name' class='control-label'>姓名:</label>
            <div class='msg-input'>
                <input type='text' class='form-control' name='name' id='edit_name' placeholder='姓名'>
            </div>
        </div>
        <div class='form-group'>
            <label for='edit_sex' class='control-label'>性别:</label>
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
            <label for='edit_mail' class='control-label'>邮箱:</label>
            <div class='msg-input'>
                <input type='text' name='mail' class='form-control' id='edit_mail' placeholder='邮箱'>
            </div>
        </div>
        <div class='form-group'>
            <label for='edit_age' class='control-label'>年龄:</label>
            <div class='msg-input'>
                <input type='text' name='age' class='form-control' id='edit_age' placeholder='年龄'>
            </div>
        </div>
        <div class='form-group'>
            <label for='edit_tel' class='control-label'>联系电话:</label>
            <div class='msg-input'>
                <input type='text' name='tel' class='form-control' id='edit_tel' placeholder='联系电话'>
            </div>
        </div>
        <div class='form-group'>
            <label for='edit_address' class='control-label'>住址:</label>
            <div class='msg-input'>
                <input type='text' name='address' class='form-control' id='edit_address' placeholder='住址'>
            </div>
        </div>
        <div class='form-group'>
            <div class='btn-group'>
                <input class='btn-default' id='submit' type='button' value='提交'>
                <input class='btn-default reset' type='button' value='重置'>
            </div>
        </div>
    </form>
</div>