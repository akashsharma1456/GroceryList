var express = require('express');
var router = express.Router();
//var init_model = require('../models/init')
var posts_model = require('../models/posts')
router.get('/',(req, res) => {
   res.send( {
       msg: "You have reached the base of the api."
    })
});
// router.get('/init',async (req, res) => {
//     let result = await init_model.init_DB()
//     console.log(result);
//     if(result) {
//         res.send({msg: "Database has been set up!"})
//     } else {
//         res.send({msg: "Database encountered an error!"})
//     }
// })

//POST new post
router.post('/post',async (req,res) => {
    let Item_Name = req.body.Item_Name;
    let Quantity = req.body.Quantity;
    let Price = req.body.Price;
    let added = await posts_model.add_post( Item_Name, Quantity, Price )

    if (added) {
        res.send({mes: "Post added to database"})
    } else {
        res.send({msg: "Something went wrong"})
    }
})

//Get Post by Id
router.get('/post/:Id', async (req,res)=> {
    let Id = req.params.Id;
    let result = await posts_model.get_post_by_id(Id)
    if(result) {
        res.send(result)
    } else {
        res.send({msg: "Something went wrong"})
    }
})

// Get all Posts
router.get( '/posts', async (req,res) =>{
    let results = await posts_model.get_all_posts()
    if(results) {
        res.send(results)
    } else {
        res.send({msg: "Something went wrong."})
    }
})

// Delete Post by Id
router.delete('/post/delete/:Id',async(req,res) =>{
    let Id = req.params.Id;
    let test = await posts_model.get_post_by_id(Id)
    if(test){
        let result = await posts_model.delete_post_by_id(Id)
        if(result){
            console.log("The Item Is Deleted");
            let results = await posts_model.get_all_posts()
            res.send(results)
        } else {
            res.send({msg: "Something went wrong"})
        }
    }else{
        res.send({msg: "Something went wrong"})
    }
})
module.exports = router;