const init = {
    userInfo: null,
    menuload: null,
    controlCallBack: null
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
        $('.content').load('../php/user_info.php', null, init.userInfo);
    }
});
init.userInfo = function () {
    $('.add-admin-btn').click(function () {
        $('.add-admin-area').load('../php/add_admin_area.php', null, function () {
            $('.add-admin-wrapper').fadeIn(function () {
                $('.close').click(function () {
                    $('.add-admin-wrapper').fadeOut();
                })
                $('[name=authority]').keyup(function () {
                    if (!this.value.match(reg.authority)) {
                        this.value = '';
                    }
                })
                $('.add-admin input').keyup(function () {
                    if (this.value.match(reg.special)) {
                        this.value = this.value.replace(reg.special, '');
                    }
                })
                $('.add-admin #submit').click(function () {
                    let data = `${$('#add-admin').serialize()}&logDate=${new Date().toLocaleString()}`;
                    $.post('../php/add-admin.php', data, function () {
                        $('.add-admin-wrapper').fadeOut();
                    })
                })
            });
        });
    })
    $('.admin-pwd-btn').click(function () {
        $('.add-admin-area').load('../php/admin_pwd_area.php', null, function () {
            $('.add-admin-wrapper').fadeIn();
            $('.close').click(function () {
                $('.add-admin-wrapper').fadeOut();
            })
            $('.admin-pwd-change').click(function () {
                $.post('../php/admin_pwd_change.php', `${$('#admin-pwd').serialize()}&logDate=${new Date().toLocaleString()}`, () => {
                    $('.add-admin-wrapper').fadeOut();
                })
            })
        })
    })
    $('.readed').click(function () {
        $.post('../php/readMsg.php', { msgID: $(this).siblings('[name=msgID]').val() }, (data) => {
            $(this).text('已读');
        })
    })
    $('.details').click(function () {
        $(this).parent().toggleClass('slidedown').siblings().removeClass('slidedown');
        $('.details').parent().hasClass('slidedown') ? $(this).text('简略') : $(this).text('详情');
        $.post('../php/readMsg.php', { msgID: $(this).siblings('[name=msgID]').val() }, (data) => {
            $(this).siblings('.readed').text('已读');
        })
    })

}
init.menuload = function (context, url, callback) {
    $('.menu button').removeClass('active');
    $(context).addClass('active');
    $('.content').load(url, null, callback);
}
init.controlCallBack = function () {
    $('.changebtn').on('click', function () {
        $('.control_change').load('../php/admin_change_area.php', `aid=${+$(this).parent().siblings('.aid').text()}`, (data) => {
            $('.change-wrapper').fadeIn();
            let thisAdmin = $(this).parent().siblings('td:not([class=lastlogintime])');
            for (let i = 0; i < $('.form-change').length; i++) {
                $($('.form-change')[i]).val(thisAdmin[i].innerText);
            }
            $('.close').click(function () {
                $('.change-wrapper').fadeOut();
            })
            $('[name=authority]').keyup(function () {
                if (!this.value.match(reg.authority)) {
                    this.value = '';
                }
            })
            $('.change input').keyup(function () {
                if (this.value.match(reg.special)) {
                    this.value = this.value.replace(reg.special, '');
                }
            })
            $('.change .admin-change').click(function () {
                let data = `${$('#admin_msg').serialize()}&logDate=${new Date().toLocaleString()}`;
                $.post('../php/admin_change.php', data, function (data) {
                    if (data == 1) {
                        $('.change-wrapper').fadeOut(function () {
                            $('.content').load('../php/control.php', null, init.controlCallBack);
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
        })
    })
    $('.del-admin').on('click', function () {
        console.log('a');
        let flag = confirm('确定要删除该管理员帐号吗？')
        if (flag) {
            $.post('../php/delete_admin.php', { aid: $(this).parent().siblings('.aid').text(), logDate: new Date().toLocaleString() }, function (data) {
                if (data == 1) {
                    $('.content').load('../php/control.php', null, init.controlCallBack)
                } else if (data == 0) {
                    alert('删除失败，您的权限不足以执行该操作');
                } else {
                    alert('删除失败，出现未知错误');
                }
            });
        }

    })
    $('.postMsg').on('click', function () {
        let to = $(this).parent().parent().find('td:nth-child(2)').text();
        $('.control_change').load('../php/post_msg_area.php', null, () => {
            $('.change-wrapper').fadeIn();
            $('.close').click(function () {
                $('.change-wrapper').fadeOut();
            })
            $('.post-submit').click(function () {

                let data = {
                    msg: $('textarea').val().replace(reg.msg, `\\'`),
                    to: to,
                    msgDate: new Date().toLocaleString()
                }
                $.post('../php/post_msg.php', data, function (data) {
                    if (data >= 1) {
                        $('.change-wrapper').fadeOut()
                    } else if (data == -1) {
                        alert('请勿给自己发送消息');
                    } else {
                        console.log(data);
                    }
                })
            })
        })
    })
}
//正则
const reg = {
    flag: false,
    num: /^\d{10}$/,
    name: /^\D+$/,
    mail: /@/,
    age: /^\d{2}$/,
    tel: /^1[3456789]\d{9}$/,
    msg: /[\'\"]/g,
    authority: /^[012]$/,
    special: /[`~!#$%^&*()\-+=<>?:"{}|,.\/;\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/img
}
//个人中心
$('.user-info,.remind').click(function () {
    init.menuload(this, '../php/user_info.php', init.userInfo)
})
//学生信息
$('.stu-list').click(function () {
    init.menuload(this, '../php/stu_select.php');
})

//编辑学生信息
$('.content').on('click', '.editBtn', function () {
    $('.edit_area').load('../php/edit_area.php', null, () => {
        $('.edit-wrapper').fadeIn();
        $("#close").click(function () {
            $('.edit-wrapper').fadeOut();
        })
        $('#edit_stu_num').val($(this).parent().siblings(':first').text());
        $('#edit_name').val($(this).parent().siblings(':eq(1)').text());
        var sex = $(this).parent().siblings(':eq(2)').text()
        $('.edit input:radio').each(function () {
            if ($(this).val() === sex) {
                $(this).attr('checked', 'checked');
            }
        })
        $('#edit_mail').val($(this).parent().siblings(':eq(3)').text());
        $('#edit_age').val($(this).parent().siblings(':eq(4)').text());
        $('#edit_tel').val($(this).parent().siblings(':eq(5)').text());
        $('#edit_address').val($(this).parent().siblings(':eq(6)').text());

        var edit_num = $(this).parent().siblings('.stu_num').text();
        $('#submit').unbind('click');
        $('#submit').click(function () {
            if (reg.num.test($('.edit input[name=stu_num]').val()) &&
                reg.name.test($('.edit input[name=name]').val()) &&
                reg.mail.test($('.edit input[name=mail]').val()) &&
                reg.age.test($('.edit input[name=age]').val()) &&
                reg.tel.test($('.edit input[name=tel]').val())) {
                $.post('../php/update.php', `edit_num=${edit_num}&${$('#msg').serialize()}&logDate=${new Date().toLocaleString()}`, function () {
                    console.log($('#msg').serialize());
                    $('.edit-wrapper').fadeOut(500, () => {
                        $('.content').load('../php/stu_select.php')
                    });

                })
            } else {
                alert('格式错误 请修改')
            }
        })
    });

})
//删除学生信息
$('.content').on('click', '.deleteBtn', function () {
    var flag = confirm('确定要删除学生信息吗？');
    if (flag) {
        var data = $(this).parent().siblings('.stu_num').text();
        $.post('../php/stu_del.php', { stu_num: data, logDate: new Date().toLocaleString() }, () => {
            $(this).parent().parent().remove();
        })
    }
})
//添加学生信息
$('.add-btn').click(function () {
    init.menuload(this, '../php/add_stu_area.php', () => {
        //判断学号是否重复，格式是否正确
        $('#add input[name=stu_num]').focus(function () {
            $("#add .has-num").hide()
        })
        $('#add input[name=stu_num]').blur(function () {
            var data = $(this).val()
            if (!reg.num.test(data)) {
                $("#add .has-num").show().find('.alert').text('提示：请输入正确的学号！');
            } else {
                $('#add #submit_new').unbind('click');
                $.post('../php/has_num.php', { 'stu_num': data }, function (data) {
                    if (data) {
                        $("#add .has-num").show().find('.alert').text('提示：该学号已存在！');
                    } else {
                        $("#add .has-num").hide().find('.alert').text('');
                        $('#add #submit_new').click(function () {
                            if (reg.name.test($('#add input[name=name]').val()) &&
                                reg.mail.test($('#add input[name=mail]').val()) &&
                                reg.age.test($('#add input[name=age]').val()) &&
                                reg.tel.test($('#add input[name=tel]').val())) {
                                var data = $('#add').serialize();
                                $.post('../php/add_stu.php', `${data}&logDate=${new Date().toLocaleString()}`, function (data) {
                                    if (data == 1) {
                                        $('#add input:text').val('');
                                        $('#add input:radio').attr('checked', false);
                                        $('.success').show().text('提交成功');
                                        setTimeout(function () {
                                            $('.success').hide().text('');
                                        }, 2000)
                                    } else {
                                        $('.success').show().text('提交失败！')
                                    }
                                })
                            } else {
                                alert('格式错误，请修改学生信息');
                            }
                        })
                    }
                })
            }
        })
        //重置内容
        $('.reset').click(function () {
            $('input:text').val('');
            $('.has-num').hide();
            $('input:radio').attr('checked', false);
        })
    })
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
    init.menuload(this, '../php/control.php', init.controlCallBack)
})
//日志查看
$('.log-select').click(function () {
    init.menuload(this, '../php/log_select.php');
})
//全屏
$('.fullscreen').click(function () {
    var el = document.documentElement;
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
    };
    return;
})