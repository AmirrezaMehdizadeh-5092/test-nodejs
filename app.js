// add package
const express = require("express")
const BodyParser = require("body-parser");
const path = require("path");
const mongose = require("mongoose");
const User = require("./user_info");
const Sub = require("./subscribe_info");
const Con = require("./contact_info");
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const forgetpasscont = require("./controller/forgetpasswordcont");
const logincont = require("./controller/logincont");
const registercont = require("./controller/registercont");

mongose.connect("mongodb://localhost/SITE");
const db = mongose.connection;
db.once("open", () => {
    console.log("database is connected");
})

const options = { hl: 'fa' }
const recaptcha = new Recaptcha('6LdJujMiAAAAAPLgUaRvCkEjkOTBV8ORGsc_gyv8', '6LdJujMiAAAAAOHEYFjkEQxc4LveBNlvo5_hadzZ', options)


// important variable
const app = express();
const port = 1234;

app.set('view engine', 'ejs');
app.set("views", "./views");

app.use(BodyParser.urlencoded([extended = true]));
app.use(express.static('public'))
app.use("/static1", express.static(path.join(__dirname, "public")));
app.use("/static2", express.static(path.join(__dirname, "public")));
app.use("/static3", express.static(path.join(__dirname, "public")));
app.use("/static4", express.static(path.join(__dirname, "public")));
app.use("/static5", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("home");
})

app.post("/", logincont.contact_subscribe);

app.get("/admin", (req, res) => {
    res.render("admin")
})

app.get("/register", (req, res) => {
    res.render("register", { recaptcha: recaptcha.render() });
})

app.post("/register", registercont.register );

app.get("/register/verify" , (req,res)=>{
    res.render("verregister");
})

app.post("/register/verify" , registercont.verify)

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", logincont.login )

app.get("/login/forgetpassword", (req, res) => {
    res.render("forgetpassword");
})

app.post("/login/forgetpassword", forgetpasscont.forgetpasswordd)

app.get("/*", (req, res) => {
    res.render("notfound")
});

app.listen(port,()=>{
    console.log("server is running");
});