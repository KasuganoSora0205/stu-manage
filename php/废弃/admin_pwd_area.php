<?php
header('Content-Type:text/html; charset=UTF-8');
?>
<div class='add-admin-wrapper'>
    <form id='admin-pwd' class='add-admin'>
        <button type='button' class='close btn-default' id='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
        <h3 class='admin-msg'>修改管理员密码</h3>
        <div class='form-group'>
            <label for='admin_aid' class='control-label'>管理员ID:</label>
            <div class='msg-input'>
                <input type='text' class='form-control' name='aid' id='admin_aid' placeholder='请输入要修改的管理员id'>
            </div>
        </div>
        <div class='form-group'>
            <label for='admin_pwd' class='control-label'>新密码:</label>
            <div class='msg-input'>
                <input type='text' name='pwd' class='form-control' id='admin_pwd' placeholder='密码最高16位,不可使用特殊字符'>
            </div>
        </div>
        <div class='form-group'>
            <div class='btn-group'>
                <input class='btn-default admin-pwd-change' id='submit' type='button' value='提交'>
            </div>
        </div>
    </form>
</div>