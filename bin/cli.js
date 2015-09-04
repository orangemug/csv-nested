var fs        = require("fs");
var csv       = require("fast-csv");
var sink      = require('stream-sink');
var yargs     = require("yargs");
var csvNested = require("../");

var argv = yargs
  .usage("Parse nested csv.\nUsage: $0 [filepath]")
  .example("$0 ./path/to/file.csv", "Converts csv to object")
  .describe("num-headers", "number of headers")
  .describe("pretty", "pretty print JSON")
  .default("num-headers", 2)
  .demand(1)
  .argv

var inPath = process.cwd()+"/"+argv._[0];
var numHeaders = argv["num-headers"];
var pretty = argv["pretty"];

var inStream  = fs.createReadStream(inPath);
var csvStream = csv();

inStream
  .pipe(csvStream)
  .pipe(csvNested(numHeaders))
  .on("error", function(err) {
    console.error(err);
    process.exit(1);
  })
  .pipe(sink())
  .on("data", function(data) {
    if(pretty) {
      data = JSON.parse(data);
      console.log(
        JSON.stringify(data, null, "  ")
      );
    } else {
      console.log(data);
    }
    process.exit(0);
  });

