const express = require("express");
const app = express();
const logger = require("morgan");
const connectdb = require("./connection/config");
require("dotenv").config();
const hbs = require("express-handlebars");
connectdb();


app.use(logger("dev"));
app.engine('hbs', hbs({extname: "hbs", defaultLayout: "main", layoutsDir: __dirname+"/views/layouts" }));
app.set('view engine', 'hbs')
app.use(express.static('public'));

app.get("/",(req,res,next)=>{
    res.render('index');
})

app.get('/favicon.ico', (req, res) => res.status(204));

app.use((req,res,next)=>{
    const error =  new Error("Api not found");
    error.status(404);
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message: error.message
        }
    })
})

const port = process.env.PORT || 7000;
app.listen(port,()=>console.log(`Server started at ${port}`))