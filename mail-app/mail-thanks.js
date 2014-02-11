var orm = require('orm');
var nodemailer = require('nodemailer');
var db  = orm.connect('pg://zeddbuser:P4u97Ar3@localhost/zeddb');

db.on('connect', function (err) {
      if (err) {
          console.log('Something is wrong with the connection', err);
          return;
      }

});

var _ = require('underscore');
var moment = require('moment');

var week = moment().add('days', 7).format('DD/MM/YYYY');
var fortnight = moment().add('days', 14).format('DD/MM/YYYY');

var Subscriber = db.define("tbl_subscribers", {
  subfirstname    : String,
  sublastname     : String,
  subnumber       : Number,
  subemail        : String,
  expirydate      : Date
}, {
  id: 'subnumber',
  methods: {
    fullName: function () {
      return this.subfirstname + ' ' + this.sublastname;
    }
  }
});


var transport = nodemailer.createTransport("sendmail", {
    path: "/usr/sbin/sendmail",
    args: ["-t", "-f", "reception@4zzz.org.au", "-F4ZZZ"]
});

var subject = "Thanks for subscribing to 4ZZZ!";

var text_body = 'Dear 4ZZZ Subscriber,\n\nThank you so much for subscribing!\n\nHopefully you have already received your receipt and subscriber cards in the mail. If not they should not be far off!\n\nAny queries? Hit us back on this email and we will be able to help!\n\nLove the 4ZZZ Family!\n\n4ZZZ Brisbane Community Radio\nE: reception@4zzz.org.au</a>\nP: 07 3252 1555\nF: 07 3252 1950\nPO Box 509 Fortitude Valley QLD 4006\nListen online: http://www.4zzzfm.org.au';


var html_body = '<span style="display:none !important">Thanks for subscribing!</span><p>Dear 4ZZZ Subscriber, thank you so much for subscribing! Hopefully you&#39;ve already received your receipt and subscriber cards in the mail. If not they shouldn&#39;t be far off!</p><p>Any queries? Hit us back on this email and we&#39;ll be able to help!</p><p>Love the 4ZZZ Family!</p><p>4ZZZ Brisbane Community Radio<br/>E: <a href="mailto:reception@4zzz.org.au">reception@4zzz.org.au</a><br/>P: 07 3252 1555<br/>F: 07 3252 1950<br/>PO Box 509 Fortitude Valley QLD 4006<br/>Listen online: <a href="http://www.4zzzfm.org.au">www.4zzzfm.org.au</a></p>';

//Subscriber.find({ expirydate: orm.between( week, fortnight) }).order('sublastname').run(function (err, subs) {
Subscriber.find({ subnumber: 55908 }).order('sublastname').run(function (err, subs) {
  _.each(subs, function(sub){
      if (sub.subemail) {
        var mailOptions = {
          to: sub.subemail,
          subject: subject,
          text: text_body,
          html: html_body
        }
    transport.sendMail(mailOptions, function(error, response) {
        if(error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
            process.exit(code=0)
        }
    });
   }
  });
});
