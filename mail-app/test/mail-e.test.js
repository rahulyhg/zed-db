var expect = require('chai').expect;
var emailtest = require("../mail-expired.js");

expect(emailtest.html_body).to.be.a('string');

