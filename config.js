/**
 * Created by wangxuquan on 2017/5/8.
 */
const cacheManager = require('cache-manager');
const redisStore = require('cache-manager-redis');
module.exports = {
    mongo       : {
        "hostname": "127.0.0.1",
        "port"    : 27017,
        /*"username": "shounaer",
         "password": "shounaer_password",*/
        "name"    : "",
        "db"      : "mydb"
    },
    connection : function () {
        if(this.mongo.username && this.mongo.password){
            return "mongodb://" + this.mongo.username + ":" + this.mongo.password + "@" + this.mongo.hostname + ":" + this.mongo.port + "/" + this.mongo.db;
        }else{
            return "mongodb://" + this.mongo.hostname + ":" + this.mongo.port + "/" + this.mongo.db;
        }
    },
    /**
     * redis 缓存
     */
    redisCache : cacheManager.caching({
        store: redisStore,
        host: 'localhost', // default value
        port: 6379, // default value
        /*auth_pass: 'XXXXX',*/
        db: 0,
        ttl: 600    //缓存时间
    })
};