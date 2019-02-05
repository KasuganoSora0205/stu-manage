let inputMsg = document.getElementsByTagName('input');
inputMsg[2].addEventListener('click',()=>{
    ajax('../php/login_verify.php',`name=${inputMsg[0].value}&pwd=${inputMsg[1].value}&lastlogintime=${new Date().toLocaleString()}`,(data)=>{
        if(data == -1){
            alert('用户名不存在')
        }else if(data == 0){
            alert('密码错误')
        }else{
            location.href = '../view/student_manager.html';
            
        }
    })
},false)
function ajax(url,data,fn){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                fn(xhr.responseText);
            }
        }
    }
    xhr.open('POST',url,true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(data);
}