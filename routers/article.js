/*
    文章路由模块
*/
const express = require('express')
const path = require('path')
const db = require(path.join(__dirname, '../common/db.js'))
const router = express.Router()

// 查询文章列表数据
router.get('/list', async (req, res) => { 
    // 获取请求参数
    let param = req.query
    param.pagenum = parseInt(param.pagenum)
    param.pagesize = parseInt(param.pagesize)
    // -------------------------------------------------
    // 分类id查询条件
    // cate_id = 1
    // let cate_id_condition = ''
    // if (param.cate_id) { 
    //     // 客户端传递了分类id
    //     cate_id_condition = 'cate_id=' + param.cate_id
    // }
    // // 文章状态
    // let article_state_condition = ''
    // if (param.state) { 
    //     article_state_condition = 'state=' + param.state
    // }
    // // 查询条件关键字
    // let condition = 'where 1 = 1'
    // if (cate_id_condition) { 
    //     condition += 'and ' + cate_id_condition
    // }
    // if (article_state_condition) { 
    //     condition += 'and ' + article_state_condition
    // }
    // 操作数据库
    // limit 后的第一个参数表示从第几条开始查询
    // limit 后的第二个参数表示查询多少条数据
    // ---------------------------------------------------------------
    // 更加优雅的写法：动态拼接查询条件
    let condition = ''
    // param = {pagenum: 1,pagesize: 10, cate_id: 1, state: '草稿'}
    for (let key in param) { 
        if (key === 'cate_id' && param[key]) {
            condition += key + '=' + param[key] + ' and '
        } else if (key === 'state' && param[key]) { 
            condition += key + '="' + param[key] + '" and '
        }
    }
    // 去掉最后一个and
    condition = condition.substring(0,condition.lastIndexOf('and'))

    let sql = 'select * from article limit ?,?'
    // 查询列表总数
    let totalSql = 'select count(*) as total from article' 
    if (condition) { 
        sql = 'select * from article where ' + condition + ' limit ?,?'
        // 携带条件时查询总数
        totalSql = 'select count(*) as total from article where ' + condition
    }
    // 查询列表数据
    let ret = await db.operateData(sql,[condition,param.pagesize * (param.pagenum - 1),param.pagesize])
    // 查询列表总数
    let cret = await db.operateData(totalSql)
    
    if (ret && ret.length > 0) { 
        res.json({
            status: 0,
            message: '查询文章列表数据成功！',
            data: ret,
            total: cret[0].total
        })
    } else {
        res.json({
            status: 1,
            message: '查询文章列表数据失败！'
        })
    }
})

// 发布文章
router.post('/add', (req, res) => { 
    res.send('add')
})

// 删除文章
router.get('/delete/:id', (req, res) => { 
    res.send('delete')
})

// 根据id查询文章详情
router.get('/:id', (req, res) => { 
    res.send('id')
})

// 更新文章
router.post('/edit', (req, res) => { 
    res.send('edit')
})

module.exports = router