var assert    = require("assert");
var fs        = require("fs");
var sink      = require('stream-sink');
var csv       = require("fast-csv");
var csvNested = require("../");


describe("csv-nested", function() {

  // NOTE: Just a starting point
  it("basic test", function(done) {
    var inStream = fs.createReadStream(__dirname+"/basic/in.csv");
    var outData  = fs.readFileSync(__dirname+"/basic/out.json");

    var csvStream = csv();

    inStream
      .pipe(csvStream)
      .pipe(csvNested(2))
      .on("data", function(data) {
        var a = JSON.parse(data);
        var b = JSON.parse(outData.toString());
        assert.deepEqual(a, b);
      })
      .on("end", function() {
        done();
      })

  });

  it("duplicate error", function(done) {
    var inStream = fs.createReadStream(__dirname+"/duplicate-error/in.csv");

    var idx = 0;
    var errs = [
      "Duplicate header detected: 'group1|one'",
      "Duplicate header detected: 'group1|two'"
    ];

    inStream
      .pipe(csv())
      .pipe(csvNested(2))
      .on("error", function(err) {
        assert(err);
        assert.equal(err, errs[idx]);
        idx++;
        if(idx === 2) {
          done();
        }
      })
  });

});
