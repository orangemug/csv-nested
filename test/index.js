var assert    = require("assert");
var fs        = require("fs");
var sink      = require('stream-sink');
var csv       = require("fast-csv");
var csvNested = require("../");


describe("csv-nested", function() {

	// NOTE: Just a starting point
	it("basic test", function(done) {
		var inStream = fs.createReadStream(__dirname+"/basic/in/grouped.csv");
		var outData  = fs.readFileSync(__dirname+"/basic/out/grouped.json");

		var csvStream = csv();

		inStream
			.pipe(csvStream)
			.pipe(csvNested(2))
			.pipe(sink())
			.on("data", function(data) {
				var a = JSON.parse(data);
				var b = JSON.parse(outData.toString());
				assert.deepEqual(a, b);
				done();
			});

	});

	it("duplicate error", function(done) {
		var inStream = fs.createReadStream(__dirname+"/duplicate-error/in/grouped.csv");
		var csvStream = csv();

		inStream
			.pipe(csvStream)
			.pipe(csvNested(2))
			.pipe(sink())
			.on("error", function(err) {
        assert(err);
        assert.equal(err, "Duplicate header detected: 'group1'");
        done();
      })
  });

});
