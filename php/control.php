<?php
header('Content-Type:text/html;charset=utf-8');
$conn = mysqli_connect('127.0.0.1','root','','student_management',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "SELECT * FROM admin_users";
$result = mysqli_query($conn,$sql);
?>
<div class='control-wrapper'>
    <table class='control-table' cellspacing='0' border='1'>
        <thead>
            <tr>
                <th width='50'>管理员ID</th>
                <th width='80'>帐号</th>
                <th width='50'>权限等级</th>
                <th width='80'>工作职位</th>
                <th width='80'>所属部门</th>
                <th width='100'>邮箱</th>
                <th width='100'>最后登录时间</th>
                <th width='150'>操作</th>
            </tr>
        </thead>
        <tbody>
<?php
while($row = mysqli_fetch_assoc($result)){
    echo "<tr>
    <td class='aid'>$row[aid]</td>
    <td>$row[name]</td>
    <td>$row[authority]</td>
    <td>$row[job]</td>
    <td>$row[department]</td>
    <td>$row[email]</td>
    <td class='lastlogintime'>$row[lastlogintime]</td>
    <td><input class='changebtn btn-default' type='button' value='修改'>
    <input class='del-admin btn-default' type='button' value='删除'>
    <input class='postMsg btn-default' type='button' value='发送消息'></tr>";
}
?>
        </tbody>
    </table>
    <div class='control_change'></div>
</div>
