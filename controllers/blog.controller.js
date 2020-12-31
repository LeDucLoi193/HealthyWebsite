const getBlog = require('../models/blog.model');

module.exports.index = async function(req, res){
    //const data = await getBlog();
    console.log('ok');
    res.json({
        message: 'ok',
        data: 'data'
    });
    // res.send('welcome to blog');
}