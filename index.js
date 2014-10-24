var fs            = require("fs");
var through       = require("through");
var normalizeKeys = require("./lib/normalize-keys");

module.exports = function(numOfHeaderRows, opts) {
  opts = opts || {};
  var keyTransform = opts.keyTransform || normalizeKeys;

  return through(function write(data) {
    this.idx     = this.idx     || 0;
    this.rows    = this.rows    || [];
    this.headers = this.headers || [];

    var idx     = this.idx;
    var headers = this.headers;

    if(idx < numOfHeaderRows) {
      var i = data.length-1;
       for(i; i>=0; i--) {
         header = data[i];

         header = keyTransform(header);

         if(!header) continue;

         var prefix = "";
         var tmpIdx = i+1;

         while(tmpIdx--) {
           if(headers[tmpIdx]) {
             prefix = headers[tmpIdx];
             break;
           }
         }
         if(prefix) {
           headers[i] = prefix+"|"+header;
         } else {
           headers[i] = header;
         }
       }

    } else {
      // Start of apartments
      var out = {};
      data.forEach(function(item, idx) {
        var header = headers[idx];

        if(item === "") return;

        // If we find an empty header walk backwards till we find one.
        if(header === undefined) {
          var tmpIdx = idx;
          while(header === undefined && tmpIdx > -1) {
            header = headers[tmpIdx--];
          }
        }

        if(out[header] !== undefined && out[header] !== "") {
          out[header] += item;
        } else {
          out[header] = item;
        }
      });

      var outApt = {};
      for(var k in out) {
        var item = outApt;
        var parts = k.split("|");
        parts.forEach(function(part, idx) {
          if(parts.length -1 === idx) {
            item[part] = out[k];
          } else {
            item = item[part] = item[part] || {};
          }
        });
      }

      this.rows.push(outApt);
    }

    this.idx++;
  }, function() {
    this.queue(JSON.stringify(this.rows));
    this.queue(null);
  });
}

