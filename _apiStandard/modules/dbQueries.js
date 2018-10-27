
// ----- PULL IN MODULES

const dbConnection = require('./dbConnection');
const errors = require('../modules/errors');
const { ObjectID } = require('mongodb');

// ----- DB QUERY WRAPPER FUNCTIONS

module.exports = {

	ReturnAllDocsFromCollection: collection => 
		// return a new promise
		new Promise(((resolve, reject) => {
			// use dbConnection object to query db
			dbConnection.get(collection).find({}, {}, (error, docs) => {
				// if there was an error
				if (error) {
					// construct a custom error
					const errorToReport = {
						error: true,
						mongoDBError: true,
						mongoDBErrorDetails: error,
					};
					// add error to Twitter
					errors.ProcessError(errorToReport);
					// reject this promise with the error
					reject(errorToReport);
					// if there was NOT an error
				} else {
					// resolve the promise and return the docs
					resolve({
						error: false,
						mongoDBError: false,
						docs,
					});
				}
			});
		})),	

	ReturnAllSpecifiedDocsFromCollection: (collection, query, projection) => 
		// return a new promise
		new Promise(((resolve, reject) => {
			// use dbConnection object to query db
			dbConnection.get(collection).find(query, projection, (error, docs) => {
				// if there was an error
				if (error) {
					// construct a custom error
					const errorToReport = {
						error: true,
						mongoDBError: true,
						mongoDBErrorDetails: error,
					};
					// add error to Twitter
					errors.ProcessError(errorToReport);
					// reject this promise with the error
					reject(errorToReport);
					// if there was NOT an error
				} else {
					// resolve the promise and return the docs
					resolve({
						error: false,
						mongoDBError: false,
						docs,
					});
				}
			});
		})),	

	ReturnFirstDocFromCollection: collection => 
		// return a new promise
		new Promise(((resolve, reject) => {
			// use dbConnection object to query db
			dbConnection.get(collection).findOne({}, {}, (error, docs) => {
				// if there was an error
				if (error) {
					// construct a custom error
					const errorToReport = {
						error: true,
						mongoDBError: true,
						mongoDBErrorDetails: error,
					};
					// add error to Twitter
					errors.ProcessError(errorToReport);
					// reject this promise with the error
					reject(errorToReport);
					// if there was NOT an error
				} else {
					// resolve the promise and return the docs
					resolve({
						error: false,
						mongoDBError: false,
						docs,
					});
				}
			});
		})),	

	ReturnOneSpecifiedDocFromCollection: (collection, query, projection) => 
		// return a new promise
		new Promise(((resolve, reject) => {
			// use dbConnection object to query db
			dbConnection.get(collection).findOne(query, projection, (error, docs) => {
				// if there was an error
				if (error) {
					// construct a custom error
					const errorToReport = {
						error: true,
						mongoDBError: true,
						mongoDBErrorDetails: error,
					};
					// add error to Twitter
					errors.ProcessError(errorToReport);
					// reject this promise with the error
					reject(errorToReport);
					// if there was NOT an error
				} else {
					// resolve the promise and return the docs
					resolve({
						error: false,
						mongoDBError: false,
						docs,
					});
				}
			});
		})),	

	ReturnOneRandomSampleFromSpecifiedDocsFromCollection: (collection, query) => 
		// return a new promise
		new Promise(((resolve, reject) => {
			// use dbConnection object to query db
			dbConnection.get(collection)
				.aggregate([{ $match: query }, { $sample: { size: 1 } }], (error, docs) => {
					// if there was an error
					if (error) {
						// construct a custom error
						const errorToReport = {
							error: true,
							mongoDBError: true,
							mongoDBErrorDetails: error,
						};
						// add error to Twitter
						errors.ProcessError(errorToReport);
						// reject this promise with the error
						reject(errorToReport);
						// if there was NOT an error
					} else {
						// resolve the promise and return the docs
						resolve({
							error: false,
							mongoDBError: false,
							docs,
						});
					}
				});
		})),	

	InsertDocIntoCollection: (doc, collection) => 
		// return a new promise
		new Promise(((resolve, reject) => {
			// use dbConnection object to query db
			dbConnection.get(collection).insert(doc, (error, result) => {
				// if there was an error
				if (error) {
					// construct a custom error
					const errorToReport = {
						error: true,
						mongoDBError: true,
						mongoDBErrorDetails: error,
					};
					// add error to Twitter
					errors.ProcessError(errorToReport);
					// reject this promise with the error
					reject(errorToReport);
					// if there was NOT an error
				} else {
					// resolve the promise and return the result
					resolve({
						error: false,
						mongoDBError: false,
						docs: result,
					});
				}
			});
		})),	

	OverwriteDocInCollection: (docID, doc, collection) => 
		// return a new promise
		new Promise(((resolve, reject) => {
			// use dbConnection object to query db
			dbConnection.get(collection).update({ _id: docID }, doc, (error, countsFromMonk) => {
				// if there was an error
				if (error) {
					// construct a custom error
					const errorToReport = {
						error: true,
						mongoDBError: true,
						mongoDBErrorDetails: error,
					};
					// add error to Twitter
					errors.ProcessError(errorToReport);
					// reject this promise with the error
					reject(errorToReport);
					// if there was NOT an error
				} else {
					// resolve the promise and return the counts of what happened
					const docCounts = {};
					if (typeof (countsFromMonk.n) !== 'undefined') { docCounts.matchedDocs = countsFromMonk.n; }
					if (typeof (countsFromMonk.nModified) !== 'undefined') { docCounts.modifiedDocs = countsFromMonk.nModified; }
					resolve({
						error: false,
						mongoDBError: false,
						docCounts,
					});
				}
			});
		})),


	UpdateSpecificFieldInSpecificDocInCollection: (
		collection,
		docsSelectionFieldName,
		docsSelectionFieldValue,
		docsSelectorIsDocID,
		changingFieldName,
		changingFieldNewValue,
	) =>
		// return a new promise
		new Promise((resolve, reject) => {
			// note: setObject MUST be constructed in the following way; 
			// 		attempts to "optimize" the next two lines result in errors
			const setObject = {};
			setObject[changingFieldName] = changingFieldNewValue;

			// note: setObject MUST be constructed in the following way; 
			// 		attempts to "optimize" the next two lines result in errors
			const selectionObject = {};
			if (docsSelectorIsDocID) {
				selectionObject[docsSelectionFieldName] = new ObjectID(docsSelectionFieldValue);
			} else {
				selectionObject[docsSelectionFieldName] = docsSelectionFieldValue;
			}
			// use dbConnection object to query db
			dbConnection.get(collection).findOneAndUpdate(selectionObject, { $set: setObject })
				// when the operation completes
				.then((updatedDoc) => {
					// if the result contains a doc ID, indicating that a doc was updated
					if (
						updatedDoc &&
						updatedDoc._id
					) {
						// resolve this promise with the updated doc
						resolve(updatedDoc);
					// if the result does not contain a doc ID, indicating that no doc was updated
					} else {
						// reject this promise with an error
						reject({
							error: true,
							updateError: true,
						});
					}
				});
		}),


	DeleteDocFromCollection: (docID, collection) => 
		// return a new promise
		new Promise(((resolve, reject) => {
			// use dbConnection object to query db
			dbConnection.get(collection).remove({ _id: docID }, (error, resultFromMonk) => {
				// if there was an error
				if (error) {
					// construct a custom error
					const errorToReport = {
						error: true,
						mongoDBError: true,
						mongoDBErrorDetails: error,
					};
					// add error to Twitter
					errors.ProcessError(errorToReport);
					// reject this promise with the error
					reject(errorToReport);
					// if there was NOT an error
				} else {
					// resolve the promise and return the counts of what happened
					const docCounts = {};
					if (typeof (resultFromMonk.result.n) !== 'undefined') { docCounts.matchedDocs = resultFromMonk.result.n; }
					if (typeof (resultFromMonk.result.ok) !== 'undefined') { docCounts.deletedDocs = resultFromMonk.result.ok; }
					resolve({
						error: false,
						mongoDBError: false,
						docCounts,
					});
				}
			});
		})),	

	DeleteAllDocsFromCollection: collection => 
		// return a new promise
		new Promise(((resolve, reject) => {
			// use dbConnection object to query db
			dbConnection.get(collection).remove({}, (error, resultFromMonk) => {
				// if there was an error
				if (error) {
					// construct a custom error
					const errorToReport = {
						error: true,
						mongoDBError: true,
						mongoDBErrorDetails: error,
					};
					// add error to Twitter
					errors.ProcessError(errorToReport);
					// reject this promise with the error
					reject(errorToReport);
					// if there was NOT an error
				} else {
					// resolve the promise and return the counts of what happened
					const docCounts = {};
					if (typeof (resultFromMonk.result.n) !== 'undefined') { docCounts.matchedDocs = resultFromMonk.result.n; }
					if (typeof (resultFromMonk.result.ok) !== 'undefined') { docCounts.deletedDocs = resultFromMonk.result.ok; }
					resolve({
						error: false,
						mongoDBError: false,
						docCounts,
					});
				}
			});
		}))
	,
};
