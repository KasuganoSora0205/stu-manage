SET NAMES UTF8;
DROP DATABASE IF EXISTS student_management;
CREATE DATABASE student_management CHARSET=UTF8;
USE student_management;
CREATE TABLE student(
    stu_num INT(10),
    name VARCHAR(8),
    sex VARCHAR(2),
    mail VARCHAR(32),
    age INT(2),
    tel BIGINT,
    address VARCHAR(32)
);
INSERT INTO student VALUES(
    1505010106,
    '郭佳琪',
    '男',
    'eugen0822@outlook.com',
    23,
    15704612073,
    '哈尔滨理工大学西区'
);

CREATE TABLE admin_users(
    aid INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(16),
    avatar VARCHAR(64),
    pwd VARCHAR(16),
    authority INT(1),
    job VARCHAR(16),
    department VARCHAR(16),
    email VARCHAR(32),
    lastlogintime VARCHAR(32)
);
INSERT INTO admin_users VALUES(
    NULL,
    'admin',
    '../static/admin_avatar.jpg',
    'GJQ199676',
    0,
    '前端开发',
    '研发部',
    'eugen822@outlook.com',
    ''
);

CREATE TABLE admin_msg(
    msgID INT PRIMARY KEY AUTO_INCREMENT,
    msg VARCHAR(1000),
    fromWho VARCHAR(16),
    msgDate VARCHAR(32),
    isRead BOOLEAN
);
INSERT INTO admin_msg VALUES(
    NULL,
    '请及时提交项目代码,Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ad perspiciatis nobis maiores tempora sapiente molestiae nisi, maxime quaerat cumque at dolorum enim quo eveniet modi aut alias, doloremque quia.请及时提交项目代码,Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ad perspiciatis nobis maiores tempora sapiente molestiae nisi, maxime quaerat cumque at dolorum enim quo eveniet modi aut alias, doloremque qu请及时提交项目代码,Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ad perspiciatis nobis maiores tempora sapiente molestiae nisi, maxime quaerat cumque at dolorum enim quo eveniet modi aut alias, doloremque qu请及时提交项目代码,Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ad perspiciatis nobis maiores tempora sapiente molestiae nisi, maxime quaerat cumque at dolorum enim quo eveniet modi aut alias, doloremque qu请及时提交项目代码,Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ad perspiciatis nobis maiores tempora sapiente molestiae nisi, maxime quaerat cumque at dolorum enim quo eveniet modi aut alias, doloremque qu',
    'admin2',
    '2019/2/1 下午7:07:58',
    FALSE
);
INSERT INTO admin_msg VALUES(
    NULL,
    '请及时提交项目代码,Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ad perspiciatis nobis maiores tempora sapiente molestiae nisi, maxime quaerat cumque at dolorum enim quo eveniet modi aut alias, doloremque quia.',
    'admin2',
    '2019/2/1 下午7:07:58',
    FALSE
);

CREATE TABLE log(
    logAdmin VARCHAR(16),
    logMsg VARCHAR(64),
    logDate VARCHAR(32)
);
INSERT INTO log VALUES(
    'admin',
    '修改了学号为 1505010106 的学生信息',
    '2019/2/1 下午7:07:58'
);


