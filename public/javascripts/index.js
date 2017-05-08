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