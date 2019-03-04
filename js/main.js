const init = {
    menuload: null,
    userInfo: null,
    userInfoAct: null,
    control: null,
    adminChange: null,
    controlCallBack: null,
    stuMsg: null,
    stuMsgEdit: null,
    delStu: null,
    addStu: null,
    addStuAct: null,
    logSelect: null,
    changePWD: null,
    readed: null,
    stuMsgReg: null,
}
//正则
const reg = {
    flag: false,
    num: /^\d{10}$/,
    name: /^[\u4E00-\u9FA5]{2,10}$/,
    mail: /@/,
    age: /^\d{2}$/,
    tel: /^1[3456789]\d{9}$/,
    msg: /[\'\"]/g,
    authority: /^[012]$/,
    special: /[`~!#$%^&*()\-+=<>?:"{}|,.\/;\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/img
}
//菜单
init.menuload = function (context, callback) {
    if ($(context).hasClass('active')) {
        return;
    }
    $('.menu button,.remind').removeClass('active');
    $(context).addClass('active');
    callback();
}
//个人中心
init.userInfo = function () {
    $.ajax({
        url: '../php/user_info.php',
        type: 'get',
        success(msg) {
            $('.content').html(`<div class="user-info-wrapper">
            <div class="title">
                <div class="avatar">
                    <img src="${msg.avatar}" alt="">
                </div>
                <div class="userinfo">
                    <span>管理员：${msg.name}</span>
                    <span>职位：${msg.job}</span>
                    <span>所属部门：${msg.department} </span>
                </div>
                ${msg.authority == 0 ? `<button class='btn-default add-admin-btn'>添加新管理员</button>
                <button class='btn-default admin-pwd-btn'>修改管理员密码</button>
                <div class='admin-area'></div>` : ''}
            </div>
            <div class="msg">
                <div class="msgCenter scroll">
                    <p class="msg-title">
                        消息记录
                    </p>
                    <ul>
                    ${msg.msg.map(item => `<li>
                    <div>
                        <p>FROM: ${item.fromWho}</p>
                        <p>MSG:${item.msg}</p>
                    </div>
                    <div>Date:${item.msgDate}</div>
                    <input type='hidden' name='msgID' value='${item.msgID}'>
                    <button class='btn-default readed'>${item.isRead == true ? '已读' : '未读'}</button>
                    <button class='btn-default details'>详情</button>
                </li>`).join('')}
                    </ul>
                </div>
                <div class="log scroll">
                    <p class="msg-title">
                        操作记录
                    </p>
                    <ul>
                    ${msg.log.map(item => `<li>
                    <div>
                        <p>操作：${item.logMsg}</p>
                        <p>时间：${item.logDate}</p>
                    </div>
                                        </li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>`)
            init.userInfoAct();
        }
    })
}
init.userInfoAct = function () {
    $('.add-admin-btn').click(function () {
        let addAdminList = [{
            name: 'name',
            id: 'admin-name',
            tips: '帐号：',
            placeholder: '账号名最高16位,不可使用特殊字符'
        }, {
            name: 'pwd',
            id: 'admin-pwd',
            tips: '密码：',
            placeholder: '密码最高16位,不可使用特殊字符'
        }, {
            name: 'email',
            id: 'admin-email',
            tips: '邮箱：',
            placeholder: '请输入邮箱地址'
        }, {
            name: 'authority',
            id: 'admin-authority',
            tips: '权限等级：',
            placeholder: '权限等级由0~2，0为最高权限'
        }, {
            name: 'job',
            id: 'admin-job',
            tips: '职位：',
            placeholder: '请输入该管理员的职位'
        }, {
            name: 'department',
            id: 'admin-department',
            tips: '部门：',
            placeholder: '请输入该管理员所属部门'
        },]
        $('.admin-area').html(`<div class='edit-area'>
        <form id='add-admin' class='add-admin'>
            <button type='button' class='close btn-default' id='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
            <h3 class='admin-msg'>新增管理员</h3>
            ${addAdminList.map(item => `<div class='form-group'>
            <label for='${item.id}' class='control-label'>${item.tips}</label>
            <div class='msg-input'>
                <input type='text' class='form-control' name='${item.name}' id='${item.id}' placeholder='${item.placeholder}'>
            </div>
            <img src='../static/right.png' title=''></img>            
        </div>`).join('')}
            <div class='form-group'>
                <div class='btn-group'>
                    <input class='btn-default' id='submit' type='button' value='提交'>
                </div>
            </div>
            <div class='success'>提交成功！</div>            
        </form>
    </div>`);
        $('.edit-area').fadeIn(function () {
            $('.close').on('click', function () {
                $('.edit-area').fadeOut();
            })
            $('.add-admin #submit').on('click', function () {
                if (!init.adminMsgReg()) {
                    return;
                }
                let data = `${$('#add-admin').serialize()}&logDate=${new Date().toLocaleString()}`;
                $.post('../php/add-admin.php', data, function () {
                    $('add-admin input:text').val('');
                    $('.edit-area').fadeOut();
                })
                $('.add-admin #submit').off('click');
            })
        });
    })
    $('.admin-pwd-btn').click(function () {
        init.changePWD();
    })
    $('.readed').click(function () {
        init.readed.call(this, () => {
            $(this).text('已读')
        });
    })
    $('.details').click(function () {
        $(this).parent().toggleClass('slidedown').siblings().removeClass('slidedown');
        $('.details').parent().hasClass('slidedown') ? $(this).text('简略') : $(this).text('详情');
        init.readed.call(this, () => {
            $(this).siblings('.readed').text('已读');
        })
    })

}
//密码变更
init.changePWD = () => {
    $('.admin-area').html(`<div class='edit-area'>
        <form id='admin-pwd' class='add-admin'>
            <button type='button' class='close btn-default' id='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
            <h3 class='admin-msg'>修改管理员密码</h3>
            <div class='form-group'>
                <label for='admin_aid' class='control-label'>管理员ID:</label>
                <div class='msg-input'>
                    <input type='text' class='form-control' name='aid' id='admin_aid' placeholder='请输入要修改的管理员id'>
                </div>
                <img src='../static/right.png' title=''></img>                
            </div>
            <div class='form-group'>
                <label for='admin_pwd' class='control-label'>新密码:</label>
                <div class='msg-input'>
                    <input type='text' name='pwd' class='form-control' id='admin_pwd' placeholder='密码最高16位,不可使用特殊字符'>
                </div>
                <img src='../static/right.png' title=''></img>
            </div>
            <div class='form-group'>
                <div class='btn-group'>
                    <input class='btn-default admin-pwd-change' id='submit' type='button' value='提交'>
                </div>
            </div>
            <div class='success'>提交成功！</div>
        </form>
    </div>`)
    $('.edit-area').fadeIn();
    $('.close').click(function () {
        $('.edit-area').fadeOut();
    })
    $('.admin-pwd-change').click(function () {
        let flag = (() => {
            let pwdReg = [{
                reg:/^[0-9]{1,3}$/,
                title:'请输入管理员ID'
            }, {
                reg: /^([0-9A-Za-z]{4,16})$/,
                title: '请输入数字、英文组成的4~16位密码,不可包含特殊字符'
            }]
            let flag = true;
            $('#admin-pwd input:text').each(function(index,item){
                if($(item).val().match(pwdReg[index]['reg'])){
                    $(item).parent().next().attr({
                        src:'../static/right.png',
                        title:''
                    }).fadeIn()
                }else{
                    $(item).parent().next().attr({
                        src:'../static/wrong.png',
                        title:pwdReg[index]['title']
                    }).fadeIn()
                    flag = false
                }
            })
            return flag;
        })();
        if(!flag){
            return;
        }
        $.ajax({
            type: 'post',
            data: `${$('#admin-pwd').serialize()}&logDate=${new Date().toLocaleString()}`,
            url: '../php/admin_pwd_change.php',
            success() {
                $('.edit-area').fadeOut();
            }
        })
    })

}
//权限控制
init.control = () => {
    $.ajax({
        type: 'get',
        url: '../php/control.php',
        success(msg) {
            $('.content').html(`
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
                    ${msg.map((item, index) => `<tr>
                    <td class='aid'>${item['aid']}</td>
                    <td>${item['name']}</td>
                    <td>${item['authority']}</td>
                    <td>${item['job']}</td>
                    <td>${item['department']}</td>
                    <td>${item['email']}</td>
                    <td class='lastlogintime'>${item['lastlogintime']}</td>
                    <td><input class='changebtn btn-default' data-index='${index}' data-aid='${item['aid']}' type='button' value='修改'>
                    <input class='del-admin btn-default' data-index='${index}' data-aid='${item['aid']}' type='button' value='删除'>
                    <input class='post-msg btn-default' data-index='${index}' data-aid='${item['aid']}' type='button' value='发送消息'></tr>`).join('')}
                    </tbody>
                </table>
                <div class='edit-area'></div>
            </div>`);
            $('.control-wrapper').on('click', '.changebtn', function () {
                init.adminChange.call(this, msg);
            })
            $('.control-wrapper').on('click', '.del-admin', function () {
                init.delAdmin.call(this, msg);
            })
            $('.control-wrapper').on('click', '.post-msg', function () {
                init.postMsg.call(this, msg);
            })
        }
    })
}
init.adminChange = function (msg) {
    let thisMsg = msg[$(this).attr('data-index')]
    $.ajax({
        type: 'get',
        data: {
            aid: $(this).attr('data-aid'),
            logDate: new Date().toLocaleString()
        },
        url: '../php/admin_change_area.php',
        success: (flag) => {
            $('.edit-area').html(`${flag == 1 ? `<div class='edit-area'>
            <form id='admin_msg' class='change'>
                <button type='button' class='close btn-default' id='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                <h3 class='change-msg'>修改管理员帐号</h3>
                <div class='form-group'>
                    <label for='aid' class='change-label'>管理员ID:</label>
                    <div class='msg-input'>
                        <input type='text' value='${thisMsg['aid']}' class='form-change' name='aid' id='aid' placeholder='管理员ID' readonly>
                    </div> 
                </div>
                <div class='form-group'>
                    <label for='change_name' class='change-label'>管理员:</label>
                    <div class='msg-input'>
                        <input type='text' value='${thisMsg['name']}' class='form-change' name='name' id='change_name' placeholder='管理员用户名'>
                    </div>
                </div>
                <div class='form-group'>
                    <label for='change_authority' class='change-label'>权限等级:</label>
                    <div class='msg-input'>
                        <input type='text' ${thisMsg['authority'] == 0 ? 'readonly' : ''} value='${thisMsg['authority']}' name='authority' class='form-change' id='change_authority' placeholder='权限等级0~2，从高到低'>
                    </div>
                </div>
                <div class='form-group'>
                    <label for='change_job' class='change-label'>工作职位:</label>
                    <div class='msg-input'>
                        <input type='text' value='${thisMsg['job']}' name='job' class='form-change' id='change_job' placeholder='工作职位'>
                    </div>
                </div>
                <div class='form-group'>
                    <label for='change_department' class='change-label'>所属部门:</label>
                    <div class='msg-input'>
                        <input type='text' value='${thisMsg['department']}' name='department' class='form-change' id='change_department' placeholder='所属部门'>
                    </div>
                </div>
                <div class='form-group'>
                    <label for='change_mail' class='change-label'>邮箱:</label>
                    <div class='msg-input'>
                        <input type='text' value='${thisMsg['email']}' name='email' class='form-change' id='change_email' placeholder='邮箱'>
                    </div>
                </div>
                <div class='form-group'>
                    <div class='btn-group'>
                        <input class='admin-change submit btn-default' type='button' value='提交'>
                    </div>
                </div>
            </form>
            </div>` : `<div class='edit-area'>
            <form id='admin_msg' class='change'>
                <button type='button' class='close btn-default' id='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                <h3 class='false-msg'>您的权限低于被修改的管理员帐号</h3>
            </form>
            </div>`}`)
            $('.edit-area').fadeIn();
            $('.close').click(function () {
                $('.edit-area').fadeOut();
            })
            $('.admin-change').click(function () {
                let data = `${$('#admin_msg').serialize()}&logDate=${new Date().toLocaleString()}`;
                $.post('../php/admin_change.php', data, function (data) {
                    if (data == 1) {
                        $('.edit-area').fadeOut(function () {
                            init.control();
                        });
                    } else if (data == -1) {
                        alert('无法修改超级管理员权限');
                    } else if (data == 2) {
                        alert('无法增加超级管理员');
                    } else if (data == 0) {
                        alert('修改失败');
                    } else if (data == 3) {

                    } else if (data == 4) {
                        alert('不能修改自身权限')
                    }
                })
            })
        }
    })
}
init.delAdmin = function (msg) {
    let flag = confirm('确定要删除该管理员吗？');
    if (flag == false) {
        return;
    }
    $.ajax({
        type: 'post',
        data: {
            aid: $(this).attr('data-aid'),
            logDate: new Date().toLocaleString()
        },
        url: '../php/delete_admin.php',
        success(flag) {
            if (flag == 1) {
                init.control();

            } else if (flag == -1 || flag == 0) {
                alert('删除失败');
                init.control();
            }
        }
    })
}
init.postMsg = function (msg) {
    let to = msg[$(this).attr('data-index')]['name'];
    $('.edit-area').html(`<div class='edit-area'>
    <form id='admin_msg' class='change'>
        <button type='button' class='close btn-default' id='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
        <textarea ></textarea>
        <div class='form-group'>
            <div class='btn-group'>
                <input class='post-submit btn-default' id='submit' type='button' value='提交'>
            </div>
        </div>
    </form>
    </div>`)
    $('.edit-area').fadeIn();
    $('.close').click(function () {
        $('.edit-area').fadeOut();
    })
    $('.post-submit').click(function () {
        let data = {
            msg: $('textarea').val().replace(reg.msg, `\\'`),
            to,
            msgDate: new Date().toLocaleString()
        }
        $.ajax({
            type: 'post',
            url: '../php/post_msg.php',
            data,
            success(msg) {
                if (msg >= 1) {
                    $('.edit-area').fadeOut()
                } else if (msg == -1) {
                    alert('请勿给自己发送消息');
                } else {
                    console.log(msg);
                }
            }
        })
    })
}
init.adminMsgReg = () => {
    let adminRegList = [{
        reg: /^([0-9A-Za-z]{4,16})$/,
        title: '请输入数字、英文组成的4~16位用户名,不可包含特殊字符'
    }, {
        reg: /^([0-9A-Za-z]{4,16})$/,
        title: '请输入数字、英文组成的4~16位密码,不可包含特殊字符'
    }, {
        reg: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g,
        msg: '请输入正确的邮箱地址'
    }, {
        reg: /^[12]$/,
        title: '请输入管理员权限,权限等级由0~2依次降低,0为超级管理员不可设置,请输入 1 或 2'
    }, {
        reg: /^([0-9A-Za-z\u4E00-\u9FA5]{2,16})$/,
        title: '请输入管理员的职位'
    }, {
        reg: /^([0-9A-Za-z\u4E00-\u9FA5]{2,16})$/,
        title: '请输入管理员所属部门'
    }];
    let flag = true;
    $('.add-admin input:text').each(function (index, item) {
        if ($(item).val().match(adminRegList[index]['reg'])) {
            $(item).parent().next().attr({
                'src': '../static/right.png',
                'title': ''
            }).fadeIn();
        } else {
            $(item).parent().next().attr({
                'src': '../static/wrong.png',
                'title': adminRegList[index]['title']
            }).fadeIn();
            flag = false;
        }
    })
    return flag;
}
//学生信息
init.stuMsg = function () {
    $.ajax({
        type: 'get',
        url: '../php/stu_msg.php',
        success(msg) {
            $('.content').html(`<div class='list-wrapper scroll'>
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
                        ${msg !== null ? msg.map((item, index) => `<tr>
                        <td class='stu_num'>${item['stu_num']}</td>
                        <td>${item['name']}</td>
                        <td>${item['sex']}</td>
                        <td>${item['mail']}</td>
                        <td>${item['age']}</td>
                        <td>${item['tel']}</td>
                        <td>${item['address']}</td>
                        <td><input class='editBtn btn btn-default' data-index='${index}' type='button' value='编辑'>
                        <input class='deleteBtn btn btn-default' data-index='${index}' type='button' value='删除'></tr>`).join('') : ''}
                    </tbody>
                </table>
                <div class='edit-area'></div>
            </div>`)
            init.stuMsgEdit(msg);
            init.delStu(msg);
        }
    })
}
init.stuMsgEdit = function (msg) {
    $('.list-wrapper').on('click', '.editBtn', function () {
        let thisStudent = msg[$(this).attr('data-index')];
        $('.edit-area').html(`<div class='edit-wrapper'>
        <form id='msg' class='edit'>
            <button type='button' class='close btn-default' id='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
            <h3 class='edit-msg'>编辑信息</h3>
            <div class='form-group'>
                <div class='btn-group'>
                    <input class='btn-default submit' id='submit' type='button' value='提交'>
                </div>
            </div>
            <div class='success'>提交成功！</div>
        </form>
    </div>`)
        let editTipsList = {
            'stu_num': '学号',
            'name': '姓名',
            'tel': '联系方式',
            'mail': '邮箱',
            'age': '年龄',
            'address': '地址',
        }
        let editMsgTemplete = '';
        for (let key in thisStudent) {
            if (key != 'sex') {
                editMsgTemplete += `<div class='form-group'>
                    <label for='edit_${key}' class='control-label'>${editTipsList[key]}:</label>
                    <div class='msg-input'>
                        <input type='text' class='form-control' value='${thisStudent[key]}' name='${key}' id='edit_${key}' placeholder='学号'>
                    </div>
                    <img src='../static/right.png' title=''></img>                    
                </div>`
            } else {
                editMsgTemplete += `<div class='form-group'>
                        <label for='edit_${key}' class='control-label'>性别:</label>
                        <div class='msg-input'>
                            <label class='radio-inline'>
                                <input type='radio' name='${key}' value='男' ${thisStudent[key] == '男' ? 'checked' : ''}> 男
                        </label>
                                <label class='radio-inline'>
                                    <input type='radio' name='${key}' value='女' ${thisStudent[key] == '女' ? 'checked' : ''}> 女
                        </label>
                        </div>
                    </div>`
            }
        }
        $('.edit-msg').after(editMsgTemplete);
        $('.edit-area').fadeIn();
        $(".close").click(() => {
            $('.edit-area').fadeOut();
        })
        $('.submit').click(() => {
            if (!init.stuMsgReg()) {
                return;
            }
            $.ajax({
                type: 'post',
                url: '../php/update.php',
                data: `edit_num=${thisStudent['stu_num']}&${$('#msg').serialize()}&logDate=${new Date().toLocaleString()}`,
                success(msg) {
                    if (msg === 'success') {
                        $('.success').show().text('提交成功');
                        setTimeout(function () {
                            $('.success').hide().text('');
                            $('.form-group img').hide();
                            $('.edit-area').fadeOut(init.stuMsg);
                        }, 2000)
                    } else {
                        $('.success').show().text('提交失败！')
                    }
                }
            })
        })
    })
}
init.delStu = function (msg) {
    $('.list-wrapper').on('click', '.deleteBtn', function () {
        let flag = confirm('确定要删除学生信息吗？');
        if (flag) {
            let data = msg[$(this).attr('data-index')].stu_num;
            $.post('../php/stu_del.php', { stu_num: data, logDate: new Date().toLocaleString() }, () => {
                $(this).parent().parent().remove();
            })
        }
    })
}
//添加学生
init.addStu = () => {
    let addStuList = [{
        name: 'stu_num',
        tips: '学号：',
        placeholder: '请输入10位学号'
    }, {
        name: 'name',
        tips: '姓名：',
        placeholder: '请输入学生姓名'
    }, {
        name: 'sex'
    }, {
        name: 'mail',
        tips: '邮箱：',
        placeholder: '请输入学生邮箱'
    }, {
        name: 'age',
        tips: '年龄：',
        placeholder: '请输入学生年龄'
    }, {
        name: 'tel',
        tips: '联系电话：',
        placeholder: '请输入联系电话'
    }, {
        name: 'address',
        tips: '住址：',
        placeholder: '请输入学生住址'
    }]
    $('.content').html(`<div class='add-stu'>
        <form id='add'>
            ${addStuList.map(item => {
        if (item.name !== 'sex') {
            return `<div class='form-group'>
                    <label for='add_${item['name']}' class='control-label'>${item['tips']}</label>
                    <div class='msg-input'>
                        <input type='text' class='form-control' name='${item['name']}' id='add_${item['name']}' placeholder='${item['placeholder']}'>
                    </div>
                    <img src='../static/right.png' title=''></img>
                </div>`
        } else {
            return `<div class='form-group'>
                    <label for='add_sex' class='control-label'>性别：</label>
                    <div class='msg-input'>
                        <label class='radio-inline'>
                            <input type='radio' name='sex' value='男' checked> 男
                        </label>
                        <label class='radio-inline'>
                            <input type='radio' name='sex' value='女'> 女
                        </label>
                    </div>
                </div>`
        }
    }).join('')}
            <div class='form-group'>
                <div class='btn-group'>
                    <input class='btn-default add-new-stu' type='button' value='提交'>
                </div>
            </div>
            <div class='success'>提交成功！</div>
        </form>
        </div>`);

    $('.add-new-stu').on('click', init.addStuAct)
}
init.addStuAct = () => {
    if (!init.stuMsgReg()) {
        return;
    }
    $.ajax({
        type: 'post',
        url: '../php/add_stu.php',
        data: `${$('#add').serialize()}&logDate=${new Date().toLocaleString()}`,
        success(data) {
            if (data == 1) {
                $('.add-stu input:text').val('');
                $('.success').show().text('提交成功');
                setTimeout(function () {
                    $('.success').hide().text('');
                    $('.form-group img').hide();
                }, 2000)
            } else {
                $('.success').show().text('提交失败！')
            }
        }

    })
}
//日志查看
init.logSelect = () => {
    $.ajax({
        type: 'get',
        url: '../php/log_select.php',
        success(data) {
            $('.content').html(`<div class='control-wrapper'>
            <table class='control-table' cellspacing='0' border='1'>
                <thead>
                    <tr>
                        <th width="100">管理员</th>
                        <th width="300">操作</th>
                        <th width="200">操作时间</th>
                    </tr>
                </thead>
                <tbody>
            ${data.map(item => `<tr>
                <td>${item['logAdmin']}</td>
                <td>${item['logMsg']}</td>
                <td>${item['logDate']}</td>`).join('')}
                </tbody>
            </table>
            <div class='control_change'></div>
        </div>`)
        }
    })
}
//信息读取
init.readed = function (callback) {
    $.ajax({
        type: 'post',
        url: '../php/readMsg.php',
        data: { msgID: $(this).siblings('[name=msgID]').val() },
        success: () => {
            callback()
        },
    })
}
//学生验证
init.stuMsgReg = function () {
    let regList = [{
        reg: /^\d{10}$/,
        msg: '请输入十位的学号！'
    },
    {
        reg: /^[\u4E00-\u9FA5]{2,10}$/,
        msg: '请输入正确的学生姓名'
    },
    {
        reg: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g,
        msg: '请输入正确的邮箱地址'
    },
    {
        reg: /^\d{2}$/,
        msg: '请输入正确的学生年龄'
    },
    {
        reg: /^1[3456789]\d{9}$/,
        msg: '请输入正确的手机号码'
    },
    {
        reg: /(省|市|区)/,
        msg: '请输入 省-市 或 直辖市-区的地址'
    }];
    let flag = true;
    $('form input:text').each(function (index, item) {
        if ($(item).val().match(regList[index]['reg'])) {
            $(item).parent().next().attr({
                'src': '../static/right.png',
                'title': ''
            }).fadeIn();
        } else {
            $(item).parent().next().attr({
                'src': '../static/wrong.png',
                'title': regList[index]['msg']
            }).fadeIn();
            flag = false;
        }
    })
    return flag;
}
//判断登录状态,初始化首页
$.get('../php/init.php', null, function (data) {
    if (data['url']) {
        alert('请先登录');
        location.href = data['url'];
    } else {
        $('.avatar img').attr('src', data['avatar']);
        if (data['msgNum'] > 0) {
            $('.remind').text(`您有${data['msgNum']}条待处理消息,请及时查看`);
        } else {
            $('.remind').text('无待处理消息')
        }
        init.userInfo();
    }
});
//个人中心
$('.user-info,.remind').click(function () {
    init.menuload(this, init.userInfo);
})
//学生信息
$('.stu-list').click(function () {
    init.menuload(this, init.stuMsg);
})
//添加学生信息
$('.add-btn').click(function () {
    init.menuload(this, init.addStu);
})
//菜单
$('.menu>.btn-default:first').click(function () {
    $(this).next().slideToggle();
})
$('.menu>button:not([class*=stu-manage])').click(function () {
    $('.menu div').slideUp();
})
//权限控制  管理员帐号
$('.control').click(function () {
    init.menuload(this, init.control)
})
//日志查看
$('.log-select').click(function () {
    init.menuload(this, init.logSelect);
})
//全屏
$('.fullscreen').click(function () {
    if(document.webkitIsFullScreen){
        document.webkitCancelFullScreen()
    }else{
        document.documentElement.webkitRequestFullScreen()
    }
})