/**
 * Created by wangxuquan on 2017/5/7.
 */
function download(e) {
    $.post('/users/download',{
        fileName : '/images/11.docx'
    },function (data) {
        window.location.href = data.downloadPath;
    });
}

/**
 * 注册
 * @param e
 */
function register(e) {
    const name = $('#name').val();
    const pwd = $('#pwd').val();
    $.post('/users/sign-up',{name : name,pwd : pwd},function (data) {
        if(data.code == '200')
            alert('注册成功');
    });
}