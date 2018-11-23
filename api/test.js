
// ----- PULL IN MODULES

const datesTimes = require('./datesTimes');

// ----- DEFINE & EXPORT FUNCTIONS

module.exports = {

	TestSync: (event, context, callback) => {
		// do
		const returnVar = datesTimes.ReturnCurrentPostSchedulingSeason();
		// console.log('using test m3');
		// set response
		const response = {
			statusCode: 200,
			body: JSON.stringify({
				error: false,
				returnVar,
			}),
		};
		// send response
		callback(null, response);
	},


	TestAsync: (event, context, callback) => {
		// get a promise to retrieve db data
		datesTimes.ReturnNowBostonDateTimeUTCFormat()
			// if the promise is resolved with the data
			.then((result) => {
				// create a default response
				let response = {
					statusCode: 500,
					body: JSON.stringify({
						error: false,
						healthy: false,
					}),
				};
				// if db indicates healthy
				if (result.data.Item.healthy) {
					// update response
					response = {
						statusCode: 200,
						body: JSON.stringify({
							error: false,
							healthy: true,
						}),
					};
				}
				// send response
				callback(null, response);
			})
			// if the promise is rejected with an error
			.catch((error) => {
				// create a response
				const response = {
					statusCode: error.statusCode || 500,
					body: JSON.stringify({
						error: true,
						healthy: false,
					}),
				};
				// send response
				callback(null, response);
			});
	},

};
