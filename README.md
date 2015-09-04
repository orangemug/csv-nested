# csv-nested
Gets nested object from a csv file.

[![circleci](https://circleci.com/gh/orangemug/csv-nested.png?style=shield)](https://circleci.com/gh/orangemug/csv-nested)
[![Dependency Status](https://david-dm.org/orangemug/csv-nested.svg)](https://david-dm.org/orangemug/csv-nested)
[![Dev Dependency Status](https://david-dm.org/orangemug/csv-nested/dev-status.svg)](https://david-dm.org/orangemug/csv-nested#info=devDependencies)


# Example
For instance given

    group1,,group2,
    one,two,one,two
    a,b,c,d
    e,f,e,h

Will produce the JSON

    [
      {
        "group1":{"one":"a","two":"b"},
        "group2":{"one":"c","two":"d"}
      },
      {
        "group1":{"one":"e","two":"f"},
        "group2":{"one":"e","two":"h"}
      }
    ]


## Usage
See [tests](test/index.js)

There is also a CLI, to install it

    npm install -g git+https://github.com/orangemug/gitook.git

And to use

    $ node csv-nested-parser
    Parse nested csv.
    Usage: node csv-nested-parser [filepath]

    Examples:
      csv-nested-parser ./path/to/file.csv    Converts csv to object


    Options:
      --num-headers  number of headers  [default: 2]
      --pretty       pretty print JSON


## Tests
To run the tests

    npm test


## License
[MIT](LICENSE)
