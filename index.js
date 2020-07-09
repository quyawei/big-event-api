const express = require('express')
const cors = require('cors')
const app = express()

// 处理客户端请求post参数
// for parsing application/json
app.use(express.json()) 
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) 

// 设置跨域
app.use(cors())

app.listen(8888, () => { 
    console.log('running....')
})

app.get('/data', (req,res) => {
    res.send('hello')
})