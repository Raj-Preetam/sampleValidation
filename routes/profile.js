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
    if(autID!=profile.id){
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
        message:'Author Profile Created',
        data:{
            id
        }
    })
    } 
})
router.get('/authordetails/:id',(req,res)=>{
    let profile = null;
    const id = req.params.id;
    profile = AuthorDetails.get(id);

    console.log(PostDetails.length) /** getting undefined */
    
    const Get = (id) => {
        let user = null;
    
       
        for(let i = 0; i < PostDetails.length; i++ ){
            
            if(id === PostDetails[i].authorID)
            {
                user = PostDetails[i];
                break;
            }
        }
    
        return user;
    }
    const Prof = Get(id);
   
    
})


module.exports = router;