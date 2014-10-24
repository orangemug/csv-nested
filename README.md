# csv-nested
Gets nested object from a csv file.


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


## Tests
To run the tests

    npm test


## License
MIT
