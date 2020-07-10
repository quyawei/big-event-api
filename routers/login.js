/*
    统一管理路由信息
*/
const express = require('express')
const path = require('path')
const utils = require('utility')
const db = require(path.join(__dirname,'../common/db.js'))
const router = express.Router()

router.post('/login', (req, res) => { 
    res.send('login')
})

// 注册用户接口
router.post('/reguser', async (req, res) => { 
    // 获取前端传递过来的参数
    let param = req.body
    // 对客户端传递过来的密码加密后在进行数据库的插入操作
    param.password = utils.md5(req.body.password)
    // 调用数据库相关方法进行数据添加操作
    let sql = 'insert into user set ?'
    let ret = await db.operateData(sql, param)
    // 如果ret非空，再去获取他的属性，防止报错
    // affectedRows属性作用表示此次操作影响了几行数据
    if (ret && ret.affectedRows > 0) {
        res.json({
            status: 0,
            message: '注册成功'
        })
    } else { 
        res.json({
            status: 1,
            message: '注册失败'
        })
    }
    
})

router.get('/test', async (req, res) => { 
    let sql = 'select * from user'
    let ret = await db.operateData(sql, null)
    res.json({
        status: 0,
        data: ret
    })
})

module.exports = router