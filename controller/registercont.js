const BodyParser = require("body-parser");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");
const checkemail = require("email-existence");
const crypto = require("crypto");
const User = require("../user_info");
const Recaptcha = require('express-recaptcha').RecaptchaV2;
let status = "not verified";

var random_verify_code = crypto.randomInt(10000, 100000);
const options = { hl: 'fa' }
const recaptcha = new Recaptcha('6LdJujMiAAAAAPLgUaRvCkEjkOTBV8ORGsc_gyv8', '6LdJujMiAAAAAOHEYFjkEQxc4LveBNlvo5_hadzZ', options)

module.exports = {
    register: async function (req, res) {
        Name = req.body.username;
        Email = req.body.email;
        Password = req.body.password;
        Verpassword = req.body.password2;
        HashPass = bcryptjs.hashSync(Password, 8);
        let recaptchares = await new Promise((resolve, reject) => {
            recaptcha.verify(req, (err, data) => {
                if (err) {
                    res.send("<script>alert('fill secreet check');history.back();</script>");
                    resolve(false)
                }
                else {
                    resolve(true)
                }
            })
        })
        if (!recaptchares) {
            return;
        }
        if (!Name || !Email || !Password || !Verpassword) {
            // res.send("<script>alert('please fill blank');window.location.replace('http://localhost:1234/register');</script>")
        }
        else {
            if (Verpassword != Password) {
                res.send("<script>alert('passwords not same');history.back();</script>")
            }
            else {
                checkemail.check(Email, function (error, responsee) {
                    if (responsee == false) {
                        res.send("<script>alert('this email dosent exits');history.back();</script>")
                    }
                    else {
                        const NewUser = new User({
                            namee: Name,
                            passwordd: HashPass,
                            helppasswordd: Password,
                            emaill: Email,
                            statuss: status,
                            VerifyCode: random_verify_code
                        });
                        NewUser.save(function (err, User) {
                            if (err) {
                                res.send("<script>alert('user already register');history.back();</script>")
                            }
                            else {
                                res.send("<script>alert('register sucsesfully');window.location.replace('http://localhost:1234/register/verify');</script>")
                                textt = 'welcome to my site. your verify code is : ' + random_verify_code;
                                var transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: 'fortestprogramming@gmail.com',
                                        pass: 'zmuoyhiidlhelefd'
                                    }
                                });
                                var mailOptions = {
                                    from: 'fortestprogramming@gmail.com',
                                    to: Email,
                                    subject: 'register sucsessfuly',
                                    text: textt
                                };
                                transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('user is registerd.the email sent');
                                    }
                                });
                            }
                        });
                    }
                })

            }
        }
    },

    verify: async function (req, res) {
        vercode = req.body.vercode;
        const founduser = await User.findOne({ $or: [{ vercode }] });
        if (vercode == founduser.VerifyCode)
        {
            res.send("<script>alert('your account verifyed');window.location.replace('http://localhost:1234');</script>");
        }
        else {
           res.send("<script>alert('verify code not correct ... try again');history.back();</script>");
        }
    }
}