<?php
header('Content-Type:text/html;charset=utf-8');
$conn = mysqli_connect('127.0.0.1','root','','student_management',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "SELECT * FROM student";
$result = mysqli_query($conn,$sql);
?>
<div class='list-wrapper scroll'>
    <table class='list-table' cellspacing='0' border='1'>
        <thead>
            <tr>
                <th width='90'>学号</th>
                <th width='80'>姓名</th>
                <th width='50'>性别</th>
                <th width='100'>邮箱</th>
                <th width='50'>年龄</th>
                <th width='80'>手机号</th>
                <th width='150'>住址</th>
                <th width='100'>操作</th>
            </tr>
        </thead>
        <tbody>
<?php 
while($row = mysqli_fetch_assoc($result)){
    echo "<tr>
    <td class='stu_num'>$row[stu_num]</td>
    <td>$row[name]</td>
    <td>$row[sex]</td>
    <td>$row[mail]</td>
    <td>$row[age]</td>
    <td>$row[tel]</td>
    <td>$row[address]</td>
    <td><input class='editBtn btn btn-default' type='button' value='编辑'>
    <input class='deleteBtn btn btn-default' type='button' value='删除'></tr>";
}
?>
        </tbody>
    </table>
    <div class='edit_area'></div>
</div>
