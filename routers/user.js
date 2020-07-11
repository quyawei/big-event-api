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
    // 根据什么获取用户的详细信息？用户的id
    // 用户的id从哪里得到？token
    // req.user表示从token中获取的信息，该信息是登录成功后放入的
    // req.user属性名称是固定的吗？是的
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