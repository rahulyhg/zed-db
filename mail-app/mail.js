var orm = require("orm");
var db  = orm.connect("pg://zeddbuser:P4u97Ar3@localhost/zeddb");

db.on("connect", function (err) {
      if (err) {
          console.log("Something is wrong with the connection", err);
          return;
      }

});

var _ = require('underscore');
var moment = require('moment');


var Suburb = db.define('suburbs', {
              suburb : { type: "text" },
              state : { type: "text" },
              postcode : { type: "number" }
      });

Suburb.get(12370, function (err, suburb) {
   console.log(suburb.suburb);
});


var User = db.define('users', {
              username : { type: "text" },
              password : { type: "text" },
              role_id : { type: "number" },
              rolename : { type: "text" }
      });

var now = moment().format('DD/MM/YYYY');
var week = moment().add('days', 7).format('DD/MM/YYYY');

User.find({username: 'zedadmin'}, function (err, sub) {
   if (err) {
     console.log(err);
  } else {
     console.log(sub[0].password);
  }
});

var Subscriber = db.define('tbl_subscribers', {
  subfirstname : { type: 'text' },
  sublastname : { type: 'text' },
  subemail : { type: 'text' },
  subnumber : { type: 'number' },
  expirydate: { type: 'date'}
}, 
{
  id: 'subnumber'
},
{
  methods: {
    fullName: function () {
      return this.subfirstname + ' ' + this.sublastname;
    }
  } 
});
console.log(now + week);

Subscriber.find({ expirydate: orm.between(now, week) }).order('sublastname').run(function (err, subs) {
  _.each(subs, function(sub){ 
    console.log(sub.sublastname + ' ' + sub.subnumber + ' ' + sub.expirydate);
  });
process.exit(code=0)
});

