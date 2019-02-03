<?php
header('Content-Type:text/html; charset=UTF-8');
?>
<div class='add-admin-wrapper'>
    <form id='add-admin' class='add-admin'>
        <button type='button' class='close btn-default' id='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
        <h3 class='admin-msg'>新增管理员</h3>
        <div class='form-group'>
            <label for='admin_name' class='control-label'>帐号:</label>
            <div class='msg-input'>
                <input type='text' class='form-control' name='name' id='admin_name' placeholder='账号名最高16位,不可使用特殊字符'>
            </div>
        </div>
        <div class='form-group'>
            <label for='admin_pwd' class='control-label'>密码:</label>
            <div class='msg-input'>
                <input type='text' name='pwd' class='form-control' id='admin_pwd' placeholder='密码最高16位,不可使用特殊字符'>
            </div>
        </div>
        <div class='form-group'>
            <label for='admin_email' class='control-label'>邮箱:</label>
            <div class='msg-input'>
                <input type='text' name='email' class='form-control' id='admin_email' placeholder='请输入邮箱'>
            </div>
        </div>
        <div class='form-group'>
            <label for='admin_authority' class='control-label'>权限等级:</label>
            <div class='msg-input'>
                <input type='text' name='authority' class='form-control' id='admin_authority' placeholder='权限等级由0~3,0为最高权限'>
            </div>
        </div>
        <div class='form-group'>
            <label for='admin_job' class='control-label'>职位:</label>
            <div class='msg-input'>
                <input type='text' name='job' class='form-control' id='admin_job' placeholder='请输入工作职位'>
            </div>
        </div>
        <div class='form-group'>
            <label for='admin_department' class='control-label'>部门:</label>
            <div class='msg-input'>
                <input type='text' name='department' class='form-control' id='admin_department' placeholder='请输入所属部门'>
            </div>
        </div>
        <div class='form-group'>
            <div class='btn-group'>
                <input class='btn-default' id='submit' type='button' value='提交'>
            </div>
        </div>
    </form>
</div>