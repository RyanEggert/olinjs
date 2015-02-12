
// Setup our assertion library
var expect = require('chai').expect;

var index = require('../../routes/index');


// Sample tests
describe("A test suite", function() {
<<<<<<< HEAD
	// Syncronous
	it('should use expect syntax', function() {
		expect(true).to.be.true|expect(true).to.be.false;
=======
	beforeEach(function() { });
	afterEach(function() { });

	// Syncronous
	it('should pass', function() { 
		expect(true).to.be.true; 
>>>>>>> barebones app with testing and task running
	});

	// Async
	it('should work asyncronously', function(done) {
		setTimeout(function() {
			expect(true).to.be.true;
			done();
		}, 1000);
	});
});

describe("index", function() {
	it('should have an attribute ten equal to 10', function() {
		expect(index.ten).to.equal(10);
	});
<<<<<<< HEAD
});
=======
})
>>>>>>> barebones app with testing and task running
