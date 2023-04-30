const nodemailer = require("nodemailer");
const BodyParser = require("body-parser");

module.exports = {
    forgetpasswordd: async function (req, res) 
    {
        UserEmail = req.body.email;
        if (!UserEmail) {
            // res.send("<script>alert('please enter email');window.location.replace('http://localhost:1234/login/forgetpassword');</script>");
        }
        else {
            const FoundEmailUser = await User.findOne({ $or: [{ UserEmail }] });
            if (FoundEmailUser) {
                if (FoundEmailUser.emaill == UserEmail) {
                    UserPass = FoundEmailUser.helppasswordd;
                    send_pass = 'your password :  ' + UserPass + '\n\nplese save this'
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'fortestprogramming@gmail.com',
                            pass: 'zmuoyhiidlhelefd'
                        }
                    });
                    var mailOptions = {
                        from: 'fortestprogramming@gmail.com',
                        to: UserEmail,
                        subject: 'recover password',
                        text: send_pass
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            res.send("<script>alert('password sent to your email');window.location.replace('http://localhost:1234/login');</script>");
                        }
                    });
                }
            }
            else if (!FoundEmailUser) {
                res.send("<script>window.alert('user not found.try again');history.back();</script>");
            }
        }
    }
}