const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));

app.use(function (req, res, next)  {
    res.locals.errors= [];
    next()
})

app.get("/", (req, res) => {
  res.render("homepage");
});

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/register", (req, res) =>{
const errors = []

if (typeof req.body.username !== "string") req.body.username="";
if (typeof req.body.password !== "string") req.body.password = "";

req.body.username= req.body.username.trim();

if (!req.body.username) errors.push("You must enter user name.");
if (req.body.username && req.body.username.length<3) errors.push("The user name must be more than 3 characters.")
if (req.body.username && req.body.username.length>10) errors.push("The user name can not exceed 10 characters.")
if (req.body.username && !req.body.username.match(/^[a-zA-Z0-9]+$/)) errors.push("The user name must contain only letters and numbers.")

if (!req.body.password) errors.push("You must enter password.");
if (req.body.password && req.body.password.length < 8)
  errors.push("The password must be more than 8 characters.");
if (req.body.password && req.body.password.length > 15)
  errors.push("The password can not exceed 15 characters.");

if (errors.length){
    return res.render("homepage", {errors})
} else {
         console.log(req.body)
    res.send("Thank you for registering!")
    }
})

app.listen(3000);
