var express = require('express');
var router = express.Router();
var posts_model = require('../models/posts')
/* GET home page. */
router.get('/', async (req,res)=> {
  let posts = await posts_model.get_all_posts()
  if(posts) {
    res.render('posts',{
      title:'Grocery List',
      posts: posts})
  } else {
    res.render('404')
  }
})
//Get Single Post
router.get('/post/:Id',async(req, res)=> {
  let Id = req.params.Id
  let result = await posts_model.get_post_by_id(Id)
  if(result) {
    res.render('post', result)
  } else {
    res.render('404')
  }
});
//Get Posts
router.get('/posts', async (req,res)=>{
  res.redirect('/')
})
module.exports = router;
