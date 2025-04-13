let a = require('express');
const express = a();
const cors = require('cors');
express.use(cors());
const mongoose = require("mongoose");
const dbs = mongoose.connect('mongodb://localhost:27017/trymongo').then(() => {
});
const db = mongoose.model('db', { topic: String, content: String }, 'content_dbs');
const moreinfos = mongoose.model('moreinfos',{ topic: String, content: String },'moreinfos');
express.listen(3000,(error)=>{
    console.log('connected');

})
express.use(cors());
express.use(a.json());

express.get('/:slug', (req, res) => {

    const tpc = req.params.slug;
     let arr=tpc.split(':');
    if(arr[0]=='content' && arr.length>1){
        const fun2=async function () {
        const obj=await moreinfos.findOne({'topic':`${arr[1]}`});
        if(obj!=null){
        res.send(obj);
        }
         }
        fun2();
    }
    else{
    const fun=async function () {
    const obj=await db.findOne({'topic':`${tpc}`});
    if(obj!=null){
    res.send(obj);
    }
}
 fun();
}
}
)
express.get('/quiz/:slug',(req,res)=>{
    
console.log(req.params.slug);
const collectionName=req.params.slug;
const fun=async function(){
    const quiz =
    mongoose.models[`${collectionName}`] ||
    mongoose.model(`${collectionName}`, {
      question: String,
      answer: String
    }, `${collectionName}`); 
const data=await quiz.find({});
if(data!=null){
res.json(data);
}
else{
    res.status(404);
}
}
fun();
});

