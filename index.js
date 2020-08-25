const express = require('express');
const profileRoutes = require('./routes/profile');

const app = new express();

app.use(express.json());

app.get('/', (req,res)=>{
    res.json({
        status: 'OK',
        message: 'server running'
    })
})

app.use('/profiles', profileRoutes);
app.listen(9000, () =>{
    console.log('server running at http://localhost:9000');
})