
// ----- PULL IN MODULES

const dbQueries = require('./dbQueries');

// ----- DEFINE & EXPORT FUNCTIONS

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
			// get a promise to retrieve the data
			dbQueries.ReturnDBItems(params)
				// if the promise is resolved with the data, then resolve this promise with the data
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),

	/**
	 * keep health separate from db health in anticipation that 
	 * other types of health may need checking
	 */
	ReturnHealth: (event, context, callback) => {
		// get a promise to retrieve db data
		module.exports.ReturnHealthFromDB()
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
