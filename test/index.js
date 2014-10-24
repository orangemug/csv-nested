var assert    = require("assert");
var fs        = require("fs");
var sink      = require('stream-sink');
var csv       = require("fast-csv");
var csvNested = require("../");


describe("csv-nested", function() {

	// NOTE: Just a starting point
	it("should work", function(done) {
		var inStream = fs.createReadStream(__dirname+"/in/grouped.csv");
		var outData  = fs.readFileSync(__dirname+"/out/grouped.json");

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

});
