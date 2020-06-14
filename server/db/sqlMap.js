var sqlMap = {
    admin: {
        select: 'select * from admin where username = ?'
    },
    file: {
        insert: 'insert into file (name,time,filetype,level1,level2,note) values (?,?,?,?,?,?)',
        select: 'select * from file',
        selectType: 'select * from filetype',
        selectLevel1: 'select * from level1',
        getLevel2: 'select * from level2 where parent_id= ?',
        select_name: 'select * from file where name like "?%"'
    }
}

module.exports = sqlMap
