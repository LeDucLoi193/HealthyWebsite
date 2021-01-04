const {getBlog} = require('../models/blog.model');

module.exports.viewListBlog = async function(req, res){
    const data = await getBlog();
    return res.status(200).json({
        data: data.data.values.slice(1),
        message: "blog"
    })
}

async function getBlogId(id){
    const data = await getBlog();

    for(const element of data.data.values){
        if(id === element[0]){
            return element;
        }
    }
}

module.exports.viewBlog = async function(req, res){
    let id = req.params.blogId;;
    const data = await getBlogId(id);
    return res.status(200).json({
        data: data
    })
}