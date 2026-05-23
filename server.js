const express=require('express');
const env=require('dotenv');
const app=express();
app.use(express.static("public"));
app.use(express.json());
app.set('view engine','ejs');

const PORT=env.PORT||4000;
app.listen(PORT,()=>{
    console.log(`Server Run On PORT ${PORT}`)
});

app.get('/',(req,res)=>{
    res.render('index');
});



