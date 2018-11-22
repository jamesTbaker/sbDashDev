

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
	const params = {
		TableName: process.env.DYNAMODB_TABLE,
		Key: {
			id: event.pathParameters.id,
		},
	};

	// fetch todo from the database
	docClient.get(params, (error, result) => {
		// handle potential errors
		if (error) {
			console.error(error);
			callback(null, {
				statusCode: error.statusCode || 501,
				headers: { 'Content-Type': 'text/plain' },
				body: 'Couldn\'t fetch the todo item.',
			});
			return;
		}

		// create a response
		const response = {
			statusCode: 200,
			body: JSON.stringify(result.Item),
		};
		callback(null, response);
	});
};
