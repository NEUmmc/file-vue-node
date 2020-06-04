var sqlMap = {
    admin: {
        select: 'select * from admin where username = ?'
    },
    file: {
        insert:'insert into file (name,time) values (?,?)',
        select:'select * from file'
    }
}

module.exports = sqlMap
