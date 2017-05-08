/**
 * Created by wangxuquan on 2017/5/8.
 */
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
    }
};