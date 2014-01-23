var orm = require("orm");
var db  = orm.connect("pg://zeddbuser:P4u97Ar3@localhost/zeddb");


var orm = require("orm");
var db  = orm.connect("pg://damon:ughele@localhost/zed_db");

db.on("connect", function (err) {
      if (err) {
          console.log("Something is wrong with the connection", err);
          return;
      }

});

var _ = require('underscore');
var moment = require('moment');


//var Suburb = db.define('suburbs', {
//              suburb : { type: "text" },
//              state : { type: "text" },
//              postcode : { type: "number" }
//      });
//
//Suburb.get(1230, function (err, suburb) {
//   console.log(suburb.suburb);
//});


var Subscriber = db.define('tbl_subscribers', {
  subfirstname : { type: 'text' },
  sublastname : { type: 'text' },
  email : { type: 'text' },
  subnumber : { type: 'number' },
  expirydate: { type: 'date'}
}, {
  methods: {
    fullName: function () {
      return this.subfirstname + ' ' + this.sublastname;
    }
  }
});

var now = moment().format('DD/MM/YYYY');
var week = moment().add('days', 7).format('DD/MM/YYYY');

Subscriber.find({subnumber: 55908}, function (err, sub) {
   console.log(sub.email);
});

//Subscriber.find({ expirydate: orm.gte(now),  expirydate: orm.lte(week) }, 3, function (err, subs) {
//      _.each(subs, function(sub){ 
//              //var edate = moment().format(sub.expirydate).calendar()
//              console.log(sub.fullName() + ' ' + sub.subnumber + ' ' + sub.expirydate);
//      });
//});
