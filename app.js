const express = require('express');
const app= express();

app.get('/',(req,res)=>{
    res.send("Welcome to the home page baby, you are beautiful fool !");
});
const port = process.env.port || 3000
app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
});


