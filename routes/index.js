/**
 * Created by wangxuquan on 2017/5/4.
 */
const Router = require('koa-router');
const router = new Router();
const indexController = require('../controller/index');
const app    = require('../app');
const io = require('socket.io')(app);
router.get('/', indexController.index);
router.get('/socket.io',function () {
    io.on('connection', function (socket) {
        let i = 1;
        setInterval(()=>{
            socket.emit('news', i++);
        },10000);

        socket.on('my other event', (data)=> {
            console.log(data);
        });
    });
});

module.exports = router;