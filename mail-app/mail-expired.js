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

var week = moment().subtract('days', 7).format('DD/MM/YYYY');
var fortnight = moment().subtract('days', 14).format('DD/MM/YYYY');

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

var subject = "Renew your 4ZZZ Subscription!";

var text_body = 'Dear Valued Subscriber!\n\nWe have noticed that your subscription to 4ZZZ has recently lapsed and we would really appreciate your ongoing support to keep the station on-air! In return we will continue to keep you updated with local events and gigs and you will get and that warm fuzzy feeling, supporting a station that wholeheartedly gets behind new, local and Australian music!\n\nAs you know, subscribing to 4ZZZ gets you all sorts of benefits, including discounts at our sub-outlets and free or cheaper entry to zed gigs! It also allows you to make requests, volunteer at the station, enter in our giveaway competitions and receive our weekly Zedletter which has all the latest news on music and events.\n\nYou can re-subscribe online using our secure form here: http://www.4zzzfm.org.au/subscribe/index.cfm\n\nOr, you can also pop into the station at 264 Barry Parade, Fortitude Valley weekdays between 10am-4pm or on Saturdays between 12pm and 3pm for cash, eftpos or credit card payments.\n\nAlternatively, if you cannot make it in you can update your subscription over the phone by calling 07 3252 1555 or mailing a cheque or money order to:\n\n4ZZZ Subscriptions\nPO Box 509\nFortitude Valley QLD 4006.\n\nWe hope you will keep supporting the station!\n\nLove the 4ZZZ Family!\n\n4ZZZ Brisbane Community Radio\n\nE: reception@4zzz.org.au\nP: 07 3252 1555\nF: 07 3252 1950\nPO Box 509 Fortitude Valley QLD 4006\nListen online: www.4zzzfm.org.au';

var html_body = '<span style="display:none !important">Your Subscription has lapsed. Don&#39;t let it go!</span><p>Dear Valued Subscriber!</p><p>We’ve noticed that your subscription to 4ZZZ has recently lapsed and we’d really appreciate your ongoing support to keep the station on-air! In return we’ll continue to keep you updated with local events and gigs and you’ll get and that warm fuzzy feeling, supporting a station that wholeheartedly gets behind new, local and Australian music!</p><p>As you know, subscribing to 4ZZZ gets you all sorts of benefits, including discounts at our sub-outlets and free or cheaper entry to zed gigs! It also allows you to make requests, volunteer at the station, enter in our giveaway competitions and receive our weekly Zedletter which has all the latest news on music and events.</p><p>You can re-subscribe online using our secure form here: <a href="http://www.4zzzfm.org.au/subscribe/index.cfm">http://www.4zzzfm.org.au/subscribe/index.cfm</a></p><p>Or, you can also pop into the station at 264 Barry Parade, Fortitude Valley weekdays between 10am-4pm or on Saturdays between 12pm and 3pm for cash, eftpos or credit card payments.</p><p>Alternatively, if you can’t make it in you can update your subscription over the phone by calling 07 3252 1555 or mailing a cheque or money order to: </p><p>4ZZZ Subscriptions<br/>PO Box 509 <br/>Fortitude Valley QLD 4006.</p><p>We hope you will keep supporting the station!</p><p>Love the 4ZZZ Family!</p><p>4ZZZ Brisbane Community Radio<br/>E: <a href="mailto:reception@4zzz.org.au">reception@4zzz.org.au</a><br/>P: 07 3252 1555<br/>F: 07 3252 1950<br/>PO Box 509 Fortitude Valley QLD 4006<br/>Listen online: <a href="http://www.4zzzfm.org.au">www.4zzzfm.org.au</a></p>';

console.log(fortnight +' ' +week);
Subscriber.find({ expirydate: orm.between( fortnight, week ) }).order('sublastname').run(function (err, subs) {
//Subscriber.find({ subnumber: 55908 }).order('sublastname').run(function (err, subs) {
  console.log("Subs found: %d", subs.length);
  _.each(subs, function(sub){
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



