
/** for copying pasting cutting purposes */


router.get('/:id',(req,res)=>{
    let profile = null;
    const id = req.params.id;
    profile = StudentDetails.get(id);
    console.log(profile)
    if(!profile){
        res.status(404).json({
            status:'Student not found',
            message:'The profile doesnt exist'
        })
    }
    else {
        res.status(200).json({
            status:'OK',
            message: 'Student found',
            data:profile
        })

    }
    
})
router.put('/:id',(req,res)=>{
    let id = req.params.id;
    let profile = StudentDetails.get(id);
    
    if(!req.body.name)  {
        req.body.name=profile.name;
    }
    else{
    
    profile.name=req.body.name;
    }
    
    if(!req.body.branch)  {
        req.body.branch=profile.branch;
    }
    else{
    
    profile.branch=req.body.branch;
    }
    if(!req.body.roll)  {
        req.body.roll=profile.roll;

    }
    else{
    
    profile.roll=req.body.roll;
    }
    console.log(profile)
    res.status(200).json({
        status:'OK',
        message: 'Student updated',
        data:profile
    })
    StudentDetails.update(profile);
    

})












