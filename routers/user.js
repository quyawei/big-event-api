/*
    用户信息相关接口
*/
const express = require('express')
const router = express.Router()

// 路由配置
// 获取用户信息
router.get('/userinfo', (req, res) => { 
    res.send('userinfo')
})

// 更新用户信息
router.post('/userinfo', (req, res) => { 
    res.send('update userinfo')
})

// 重置密码
router.post('/updatepwd', (req, res) => { 
    res.send('updatepwd')
})

// 更换头像
router.post('/update/avatar', (req, res) => { 
    res.send('avatar')
})

module.exports = router