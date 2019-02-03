<?php
    session_start();
    $aid = $_SESSION['userinfo']['aid'];
    $conn = mysqli_connect('127.0.0.1','root','','student_management',3306  );
    $sql = "SET NAMES UTF8";
    mysqli_query($conn,$sql);
    $sql = "SELECT * FROM admin_users WHERE aid=$aid";
    $result = mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($result);
    $sql = "SELECT * FROM $row[name]"."_msg";
    $result2 = mysqli_query($conn,$sql); 
?>
<div class="user-info-wrapper">
    <div class="title">
        <div class="avatar">
            <img src="<?php echo $row['avatar']?>" alt="">
        </div>
        <div class="userinfo">
            <span>管理员：<?php echo $row['name'];?></span>
            <span>职位：<?php echo $row['job'];?></span>
            <span>所属部门：<?php echo $row['department'];?> </span>
        </div>
        <?php 
            if($row['authority'] == 0){
                echo "<button class='btn-default add-admin-btn'>添加新管理员</button>
                <button class='btn-default admin-pwd-btn'>修改管理员密码</button>
                <div class='add-admin-area'></div>";
            }
        ?>
    </div>
    <div class="msg">
        <div class="msgCenter scroll">
            <p class="msg-title">
                消息记录
            </p>
            <ul>
                <?php
                    while($row2 = mysqli_fetch_assoc($result2)){
                        if($row2['isRead']){
                            $isRead = '已读';
                        }else{
                            $isRead = '未读';
                        }
                        echo "<li>
                                <div>
                                    <p>FROM $row2[fromWho]</p>
                                    <p>$row2[msg]</p>
                                </div>
                                <div>$row2[msgDate]</div>
                                <input type='hidden' name='msgID' value='$row2[msgID]'>
                                <button class='btn-default readed'>$isRead</button>
                                <button class='btn-default details'>详情</button>
                            </li>";
                    }
                ?>
            </ul>
        </div>
        <div class="log scroll">
            <p class="msg-title">
                操作记录
            </p>
            <ul>
                <?php
                    $sql = "SELECT * FROM log WHERE logAdmin='$row[name]'";
                    $result3 = mysqli_query($conn,$sql);
                    if($result3){
                        while($row = mysqli_fetch_assoc($result3)){
                            echo "<li>
                            <div>
                                <p>操作：$row[logMsg]</p>
                                <p>时间：$row[logDate]</p>
                            </div>
                        </li>";
                        }
                    }else{
                        echo $sql;
                    }
                ?>
                
            </ul>
        </div>
    </div>
</div>