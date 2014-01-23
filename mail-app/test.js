var nodemailer = require("nodemailer");

var transport = nodemailer.createTransport("sendmail", {
    path: "/usr/sbin/sendmail",
    args: ["-t", "-f", "t@4zzz.org.au"]
});

var mailOptions = {
    to: "damon.black@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
}

transport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
});
