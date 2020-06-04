# 辽宁省国际工程咨询中心

文件传输平台

vue + elementUI + node + mysql

*注意：为了不暴露自己常用的数据库密码，上传时删除了node后端的db.js文件
下载运行需要在sever/db文件夹中，创建db.js进行数据库配置*

db.js内容如下：  
```
module.exports = {  
    mysql: {  
        host: 'localhost',  
        user: '你的用户名',  
        password: '你的密码',  
        port: '3306',  
        database: '你要连接的数据库名称'  
    }  
}
```
