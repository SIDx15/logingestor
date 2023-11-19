const express =require("express")
const app = express()
const mongoose=require("mongoose")
app.use(express.json());

//database connection
mongoose.connect("mongodb+srv://siddharthdas83109:sidmongo@cluster0.irkf8mm.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(!err)
    {
        console.log("connected to db")
    }else{
        console.log(err)
    }
}) 

// schema definition for mongodb
const sch={
    level: String,
    message: String,
    resourceId: String,
    timestamp: Date,
    traceId:  String,
    spanId:  String,
    commit: String,
    metadata: String    
}

// mongodb model based on schema
const monmodel = mongoose.model("testlogs",sch);

// middleware to deal with cors
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



//POST route to save logs
app.post("/",async(req,res)=>{
    console.log("in post function");
    let l=req.body.length;
    
    for(let i=0;i<l;i++)
    {
        const data=new monmodel({
            
            level: req.body[i].level,
            message: req.body[i].message,
            resourceId: req.body[i].resourceId,
            timestamp: req.body[i].timestamp,
            traceId: req.body[i].traceId,
            spanId: req.body[i].spanId,
            commit: req.body[i].commit,
            metadata: "parentResourceId :" + req.body[i].metadata.parentResourceId
            
        });
        
        let val=await data.save();
        
        res.json(val);

    }
    
})


// GET route to fetch all records
app.get('/fetch/all',function(req,res){
    monmodel.find(({}),function(err,val){
        res.send(val);
    })
})


// server running at port 3000
app.listen(3000,()=>{
    console.log("on port 3000")
})