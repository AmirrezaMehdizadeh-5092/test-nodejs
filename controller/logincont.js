const nodemailer = require("nodemailer");
const BodyParser = require("body-parser");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

var user_is_login = false;
var subscribed = 0;

module.exports = {
    login: async function (req, res) {
        PPassword = req.body.password;
        EEmail = req.body.email;
        if (!PPassword || !EEmail) {
            // res.send("<script>alert('please fill blank');window.location.replace('http://localhost:1234/login');</script>");
        }
        else {
            const founduser = await User.findOne({ $or: [{ EEmail }] });
            if (founduser) {
                if (bcryptjs.compareSync(PPassword, founduser.passwordd) == true) {
                    user_is_login = true;
                    const token = jwt.sign({ _id: founduser._id, namee: founduser.namee }, 'shhhhh');
                    textt = 'hello . this is yout token secret in.\n\n' + token;
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'fortestprogramming@gmail.com',
                            pass: 'zmuoyhiidlhelefd'
                        }
                    });
                    var mailOptions = {
                        from: 'fortestprogramming@gmail.com',
                        to: founduser.emaill,
                        subject: 'your token',
                        text: textt
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('user is login.token was send to email');
                        }
                    });
                    res.redirect("/");
                }
                else {
                    res.send("<script>alert('password not correct');history.back();</script>");
                }
            }
            else if (!founduser) {
                res.send("<script>alert('the user not exist');window.location.replace('http://localhost:1234/login');</script>");
            }
        }
    },
    contact_subscribe: async function (req, res) 
    {
        contact_username = req.body.FullName;
        contact_email = req.body.Email;
        contact_msg = req.body.msg;
        subscribe = req.body.EnterYourEmail;
        if (!contact_username || !contact_email || !contact_msg) {
            //res.send("<script>alert('please fill blank ');window.location.replace('http://localhost:1234');window.scrollTo(0, 1500)</script>");
            //swal("Hello world!");
        }
        else {
            if (user_is_login == true) {
                const contact_founduser = await User.findOne({ $or: [{ contact_email }] });
                if (contact_email == contact_founduser.emaill) {
                    const NewUserMsg = new Con({
                        usernamecont: contact_username,
                        emailcont: contact_email,
                        messagecont: contact_msg
                    });
                    NewUserMsg.save(function (err, Con) {
                        if (err) {
                            console.log(err);
                            res.send("<script>alert('something is worng');history.back();</script>")
                        }
                        else {
                            res.send("<script>alert('your message recived ...');window.location.replace('http://localhost:1234')</script>");
                        }
                    });
                }
                else if (contact_email != contact_founduser.emaill) {
                    res.send("<script>alert('you dont have account.click ok to go to register page');window.location.replace('http://localhost:1234/register')</script>");
                }
            }
            else if (user_is_login == false) {
                res.send("<script>alert('must login for contact us...');window.location.replace('http://localhost:1234/login')</script>");
            }

        }
        if (!subscribe) {
            //res.send("<script>alert('you dont have account.click ok to go to register page');window.location.replace('http://localhost:1234/register')</script>");
        }
        else {
            if (user_is_login == true) {
                const subscribe_found = await User.findOne({ $or: [{ subscribe }] });
                if (subscribe == subscribe_found.emaill) {
                    subscribed++;
                    console.log("subscribe number is : " + subscribed);
                    const NewUserSub = new Sub({
                        emailll: subscribe
                    });
                    NewUserSub.save(function (err, User) {
                        if (err) {
                            res.send("<script>alert('something is worng');window.location.replace('http://localhost:1234');</script>")
                        }
                        else {
                            res.send("<script>alert('subscribe done ...');window.location.replace('http://localhost:1234')</script>");
                        }
                    });
                }
                else if (subscribe != subscribe_found.emaill) {
                    res.send("<script>alert('you dont have account.click ok to go to register page');window.location.replace('http://localhost:1234/register')</script>");
                }
            }
            else if (user_is_login == false) {
                res.send("<script>alert('must login for subscribe...');window.location.replace('http://localhost:1234/login');</script>");
            }
        }
    }
}