
// ----- PULL IN MODULES

const dbQueries = require('./dbQueries');

// ----- DEFINE EMAIL FUNCTIONS

module.exports = {


	ReturnHealthSettings: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the settings document collection
			dbQueries.ReturnAllDocsFromCollection('healthSettings')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((settings) => {
					resolve({ error: settings.error, healthSettings: settings.docs });
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),	

	ReturnHealthFromDB: () => 
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the health document collection
			dbQueries.ReturnAllDocsFromCollection('health')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),	

	/**
	 * keep health separate from db health in anticipation that 
	 * other types of health may need checking
	 */
	ReturnHealth: () => 
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the health document collection
			module.exports.ReturnHealthFromDB()
				// if the promise is resolved with the docs
				.then((result) => {
					// then resolve this promise with the healthy setting
					resolve({
						error: false,
						healthy: result.docs[0].healthy,
					});
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),
};
