<?php
header('Content-Type:text/html;charset=utf-8');
$conn = mysqli_connect('127.0.0.1','root','','student_management',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT * FROM log";
$result = mysqli_query($conn,$sql);
?>
<div class='control-wrapper'>
    <table class='control-table' cellspacing='0' border='1'>
        <thead>
            <tr>
                <th width="100">管理员</th>
                <th width="300">操作</th>
                <th width="200">操作时间</th>
            </tr>
        </thead>
        <tbody>
<?php
while($row = mysqli_fetch_assoc($result)){
    echo "<tr>
    <td>$row[logAdmin]</td>
    <td>$row[logMsg]</td>
    <td>$row[logDate]</td>";
}
?>
        </tbody>
    </table>
    <div class='control_change'></div>
</div>
