const express= require("express");
const path= require("path");
const session = require("express-session");
const authRoutes= require("./routes/authRoutes")

const connectDB= require("./config/db");

const app= express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false
}));

app.use(authRoutes)


app.get("/", (req,res)=>{
  res.render("home");
});



module.exports= app;

