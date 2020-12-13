var express = require('express');
var router = express.Router();
var posts_model = require('../models/posts');
/* GET home page. */
router.get('/', async (req,res)=> {
  let posts = await posts_model.get_all_posts()
  let total = await posts_model.total()
  if(posts) {
    res.render('posts',{
      title:'Grocery List',
      posts: posts,
      total: total})
  } else {
    res.render('404')
  }
})
//Get Single Post
router.get('/post/:Id',async(req, res)=> {
  let Id = req.params.Id
  let result = await posts_model.get_post_by_id(Id)
  if(result) {
    res.render('post',{
      title:'Grocery List',
      result: result})
  } else {
    res.render('404')
  }
});
//Get All Posts
router.get('/posts', async (req,res)=>{
  res.redirect('/')
})

//Get Post Submission Form
router.get('/post',(req,res) => {
  res.render('new-post',{title: "Add Post"})
})

//Post New Post
router.post('/post', async (req,res)=>{
  let Item_Name = req.body.Item_Name;
  let Quantity = req.body.Quantity;
  let Price = req.body.Price;
  let added = await posts_model.add_post( Item_Name, Quantity, Price )

  if (added) {
    res.redirect(`/post/${added.lastInsertRowid}`)
  } else {
    res.send({msg:"Something went wrong."})
  }
})

// Get Post Delete Form
router.get('/delete',(req,res) => {
    res.render('delete',{title: "DELETE POST"})
})
// Delete Post By Id
router.post('/delete', async (req,res)=>{
  let Id = req.body.Id;
  let test = await posts_model.get_post_by_id(Id)
  if(test) {
    let result = await posts_model.delete_post_by_id(Id)
    if (result) {
      console.log("The Item Is Deleted");
      res.redirect('/')
    } else {
      res.send({msg: "Something went wrong"})
    }
  }else{
  res.send({msg: "Something went wrong"})
  }

})
module.exports = router;

