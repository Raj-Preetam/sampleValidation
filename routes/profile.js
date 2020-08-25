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

/**
 * Get all posts made by an author
 */
router.get('/author/:id/posts', (req, res) => {
    const profile = AuthorDetails.get(req.params.id);
    if (!profile /* profile is null */) {
        res.status(404)
            .json({
                status: 'Not Found',
                message: 'Author not found'
            })
    }
    else {
        /**
         * Get posts made by the author
         */
        const authorPosts = GetPostsByAuthor(profile.id);

        res.status(200)
            .json({
                status: 'OK',
                message: 'Author Posts',
                data: authorPosts
            })
    }
})

const GetPostsMadeByAuthor = (authorId) => {
    /**
     * Get all posts in database
     */
    const allPosts = PostDetails.list();
    
    /**
     * An empty array to hold posts made by the author
     */
    const authorPosts = [];

    for (let i = 0; i < allPosts.length; i++) {
        if (authorId === allPosts[i].authorID) {
            /**
             * Post matches author. Add it to list
             */
            authorPosts.push(allPosts[i]);
        }
    }

    return authorPosts;
}

const GetPostsByAuthor = (authorId) => {
    /**
     * Get all posts in database
     */
    const allPosts = PostDetails.list();

    const authorPosts = allPosts.filter((post) => {
        /**
         * Filter posts based on author id
         * If post's author is same as the author given by the the `authorId`, add this to list
         */
        if(post.authorID === authorId){
            return true;
        }
        else{
            return false;
        }
    })

    return authorPosts;
}


module.exports = router;
