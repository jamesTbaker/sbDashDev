
// ----- PULL IN MODULES

// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require('aws-sdk'); 

// ----- CREATE CLIENT

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// ----- DB QUERY FUNCTIONS

module.exports = {

	ReturnDBItems: params =>
		// return a new promise
		new Promise((resolve, reject) => {
			// query db
			dynamoDB.get(params, (error, result) => {
				// if there was an error
				if (error) {
					// construct a custom error
					const errorToReport = {
						error: true,
						dynamoDBError: true,
						dynamoDBErrorDetails: error,
					};
					// add error to Twitter
					// errors.ProcessError(errorToReport);
					// reject this promise with the error
					reject(errorToReport);
					// if there was NOT an error
				} else {
					// resolve the promise and return the docs
					resolve({
						error: false,
						dynamoDBError: false,
						result,
					});
				}
			});
		}),	
};
