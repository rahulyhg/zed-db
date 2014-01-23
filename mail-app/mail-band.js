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

var now = moment().format('DD/MM/YYYY');

var Subscriber = db.define("tbl_subscribers", {
  subfirstname    : String,
  sublastname     : String,
  subnumber       : Number,
  subemail        : String,
  expirydate      : Date,
  paymentdate     : Date,
  subtypeid       : Number
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

var subject = "Submit Your Bio & Pic For Our Website!";

var text_body = 'Dear 4ZZZ Subscriber Musicians,\n\nThank you so much for subscribing!\n\nHopefully you have already received your receipt and subscriber cards in the mail. If not they should not be far off! If there are any problems (i.e not enough subscriber cards for all band members etc.) please just send us an email.\n\nIn the meantime, we are emailing you now to get your information onto our website http://www.4zzzfm.org.au/subscriber-musicians. Please submit the following:\n\nIMAGE: 600 x 400 pixels only. Max file size 256kb. Allowed extensions .png .gif .jpg & .jpeg\n\nBIO: 500 words max.\n\nInformation for Publication\nContact Person:\nPhone/or email:\nWeb address:\n\nPlease just reply to this email with the following along with your current bio and pic to reception@4zzz.org.au\n\nAny queries? Hit us back on this email and we will be able to help!\n\nLove the 4ZZZ Family!\n\n4ZZZ Brisbane Community Radio\nE: reception@4zzz.org.au\nP: 07 3252 1555\nF: 07 3252 1950\nPO Box 509 Fortitude Valley QLD 4006\nListen online: http://www.4zzzfm.org.au';


var html_body = '<span style="display:none !important">Thanks for subscribing!</span><p>Dear 4ZZZ Subscriber Musicians,</p><p>Thank you so much for subscribing!</p><p>Hopefully you&#39;ve already received your receipt and subscriber cards in the mail. If not they shouldn&#39;t be far off! If there are any problems (i.e not enough subscriber cards for all band members etc.) please just send us an email.</p><p>In the meantime, we&#39;re emailing you now to get your information onto our website <a href="http://www.4zzzfm.org.au/subscriber-musicians">http://www.4zzzfm.org.au/subscriber-musicians</a>. Please submit the following:</p><p><strong>IMAGE:</strong> 600 x 400 pixels only. Max file size 256kb. Allowed extensions .png .gif .jpg & .jpeg</p><p><strong>BIO:</strong> 500 words max.</p><p><strong>Information for Publication</strong><br/>Contact Person:<br/>Phone &amp;/or email:<br/>Web address:</p><p>Please just reply to this email with the following along with your current bio and pic to reception@4zzz.org.au</p><p>Any queries? Hit us back on this email and we&#39;ll be able to help!</p><p>Love the 4ZZZ Family!</p><p>4ZZZ Brisbane Community Radio<br/>E: <a href="mailto:reception@4zzz.org.au">reception@4zzz.org.au</a><br/>P: 07 3252 1555<br/>F: 07 3252 1950<br/>PO Box 509 Fortitude Valley QLD 4006<br/>Listen online: <a href="http://www.4zzzfm.org.au">www.4zzzfm.org.au</a></p>';

Subscriber.find({ paymentdate: now, subtypeid: 4 }).order('sublastname').run(function (err, subs) {
//Subscriber.find({ subnumber: 55908 }).order('sublastname').run(function (err, subs) {
  console.log("Subs found: %d", subs.length);
  _.each(subs, function(sub){
    console.log(sub.subemail);
      if (sub.subemail) {
      console.log("Sub: %s, Email: %s", sub.fullName(), sub.subemail);
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
