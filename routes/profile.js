const express = require('express');
const {AuthorDetails,PostDetails} = require('../database');

const router = express.Router();


router.get('/author', (req,res)=>{
    const profiles = AuthorDetails.list();
    res.json({
        status: 'OK',
        message: 'All student Details',
        data: profiles
    })

})
 /** to create author name */
router.post('/author', (req,res)=>{
    const profile = req.body;
    const id = AuthorDetails.create(profile);
    res.status(200).json({
        status:'OK',
        message:'Author Profile Created',
        data:{
            id
        }
    })
})
/** to create post deetails */
router.post('/authordetails', (req,res)=>{
    const autID = req.body.authorID;
    const profile = AuthorDetails.get(autID); /** gets the particular author from author.json */
    /** if statement shows undefined if wrong author id is given */
    if(profile==null){
        res.status(404).json({
            "status": "not found",
            "message": "Please register author first"
        })
       
    }
    else{
        
        const autProfile = req.body;
        const id = PostDetails.create(autProfile);
        res.status(200).json({
        status:'OK',
        message:'Post Created',
        data:{
            id
        }
    })
    } 
})
router.get('/author/:id/post',(req,res)=>{
    let profile = null;
    const id = req.params.id;
    profile = AuthorDetails.get(id);

    const post = PostDetails.list();
    console.log(post.length);

    const Get = (id) => {
        let user = null;

    
       
        for(let i = 0; i < post.length; i++ ){
            
            if(id === post[i].authorID)
            {
                user = post[i];
                break;
            }
        }
    
        return user;
    }
    const Prof = Get(id);
    console.log(Prof);
    if(Prof!=null){
        res.status(200).json({
            status:'OK',
            message:'Author Authenticated',
            data:{
                Prof
            }
        })

    }
    else{
        res.status(404).json({
            status:'Not Found',
            message:'Author Authentication Failed',
           
        })

    }
    
    
})


module.exports = router;
