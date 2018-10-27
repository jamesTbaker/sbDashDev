
// ----- PULL IN MODULES

const uuid = require('uuid');
const aws = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

// ----- DEFINE MIGRATION FUNCTIONS

const s3 = new aws.S3();
const dynamoDb = new aws.DynamoDB.DocumentClient();

module.exports.insertAll = (event, context, callback) => {
	const s3Params = {
		Bucket: 'data-migration-dev-serverlessdeploymentbucket-1apyea0uk864d',
		Key: 'postsQueue.json',
	};
	s3.getObject(s3Params, (s3Error, data) => {
		if (s3Error) {
			console.error(s3Error, s3Error.stack);
			/* callback(null, {
				statusCode: s3Error.statusCode || 501,
				headers: { 'Content-Type': 'text/plain' },
				// body: 'DB Error: couldn\'t create the source.',
				body: `${JSON.stringify(s3Error)}\n\n\n${JSON.stringify(s3Error.stack)}`,
			});
			return; */
		}
		const fileContents = data.Body.toString();
		const sourceArray = JSON.parse(fileContents);
		console.log(sourceArray);
		/* const response = {
			statusCode: 200,
			body: fileContents,
		};
		callback(null, response); */
		const timestamp = new Date().getTime();
		sourceArray.forEach((source, index) => {
			// if (index < 1000) {
			// if (index >= 1000 && index < 2000) {
			// if (index >= 2000 && index < 3000) {
			if (index >= 3000 && index < 4000) {
				// const data = JSON.parse(event.body);
				const { tumblrReblogKey } = source;
				const { season } = source;
				let { tumblrID } = source;

				if (typeof (tumblrID) === 'object' && tumblrID.$numberLong) {
					tumblrID = Number(tumblrID.$numberLong);
				}
				tumblrID = tumblrID.toString();
				// console.log(tumblrReblogKey);
				// console.log(tumblrID);
				const params = {
					TableName: process.env.DYNAMODB_TABLE,
					Item: {
						_id: uuid.v1(),
						tumblrID,
						tumblrReblogKey,
						season,
						createdAt: timestamp,
						updatedAt: timestamp,
					},
				};

				// write the todo to the database
				dynamoDb.put(params, (dynamoError) => {
					// handle potential errors
					if (dynamoError) {
						console.error(dynamoError);
						callback(null, {
							statusCode: dynamoError.statusCode || 501,
							headers: { 'Content-Type': 'text/plain' },
							// body: 'DB Error: couldn\'t create the source.',
							body: JSON.stringify(dynamoError),
						});
					}
					// console.log(`success: ${tumblrName}`);
				});
			}
		});
	});
	console.log('all set');

	/* // create a response
	const response = {
		statusCode: 200,
		body: 'all set',
	};
	callback(null, response); */
};
