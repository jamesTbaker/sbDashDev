
// ----- PULL IN MODULES

const dbQueries = require('./dbQueries');

// ----- DEFINE EMAIL FUNCTIONS

module.exports = {

	ReturnHealthFromDB: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// construct db params
			const params = {
				TableName: '_dev_health',
				Key: {
					_id: '0',
				},
			};
			// get a promise to retrieve all documents from the health document collection
			dbQueries.ReturnDBItems(params)
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),

	/**
	 * keep health separate from db health in anticipation that 
	 * other types of health may need checking
	 */
	ReturnHealth: (event, context, callback) => {
		// get a promise to retrieve db item
		module.exports.ReturnHealthFromDB()
			// if the promise is resolved with the docs
			.then((result) => {
				console.log('result');
				console.log(result);
				let responseBody = {
					error: false,
					healthy: false,
				};
				let response = {
					statusCode: 500,
					body: JSON.stringify(responseBody),
				};
				if (result.result.Item.healthy) {
					// create a response
					responseBody = {
						error: false,
						healthy: true,
					};
					response = {
						statusCode: 200,
						body: JSON.stringify({ error: false, healthy: true }),
					};
				}
				// send response
				callback(null, response);
			})
			// if the promise is rejected with an error, then reject this promise with an error
			.catch((error) => {
				// console.error(error);
				const response = {
					statusCode: error.statusCode || 500,
					body: JSON.stringify({ error: true, healthy: false }),
				};
				callback(null, response);
			});
	},
};
