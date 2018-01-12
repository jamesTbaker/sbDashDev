
// ----- PULL IN MODULES

const dbQueries = require('./dbQueries');
const datesTimes = require('./datesTimes');
const sbTumblr = require('./sbTumblr');

// ----- DEFINE SETTINGS FUNCTIONS

module.exports = {

	UpdatePostPostedProperty: (post) => {
		// overwrite property of copy of the in-memory post
		const postToUse = post;
		postToUse.posted = true;
		// get a promise to overwrite the post in db, but don't wait for resolution
		dbQueries.OverwriteDocInCollection(postToUse._id, postToUse, 'posts');
	},

	IncreasePostErrorQuantity: (post) => {
		// copy / extract the actual post data for convenience
		const postDataToUse = post.docs[0];
		// get qty times this post has been involved in a posting error
		let postErrorQuantity = 0;
		if (typeof (postDataToUse.postErrorQuantity) !== 'undefined') {
			postErrorQuantity = { postErrorQuantity };
		}
		// incrment error quantity and store back to in-memory post
		postDataToUse.postErrorQuantity = postErrorQuantity + 1;
		// get a promise to overwrite the post in db, but don't wait for resolution
		dbQueries.OverwriteDocInCollection(postDataToUse._id, postDataToUse, 'posts');
	},

	DeletePost: (post) => {
		// get a promise to delete the post in db, but don't wait for resolution
		dbQueries.DeleteDocFromCollection(post._id, 'posts');
	},

	ReturnOneRandomInSeasonPost: () => 
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to get current post scheduling season info
			datesTimes.ReturnCurrentPostSchedulingSeason()
				// if the promise is resolved with the info
				.then((currentPostSchedulingSeasonInfo) => {
					// get a promise to get a post from the database
					dbQueries.ReturnOneRandomSampleFromSpecifiedDocsFromCollection('posts', { $and: [{ season: currentPostSchedulingSeasonInfo.name }, { posted: { $ne: true } }] })
						// if the promise is resolved with the post info, then resolve this promise with the post info
						.then((postInfo) => { resolve(postInfo) })
						// if the promise is rejected with an error, then reject this promise with an error
						.catch((error) => { reject(error); });
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})
	),

	Post: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve flag indicating it's been long enough since the last post
			const getLongEnoughSinceLastPost = datesTimes.ReturnLongEnoughSinceLastPost()
				// if the promise is rejected with an error, reject this promise with the error
				.catch((error) => { reject(error); });
			// get a promise to retrieve flag indicating it's inside the posting window
			const getNowIsInsidePostingWindow = datesTimes.ReturnNowIsInsidePostingWindow()
				// if the promise is rejected with an error, reject this promise with the error
				.catch((error) => { reject(error); });
			// when those promises have resolved
			Promise.all([getLongEnoughSinceLastPost, getNowIsInsidePostingWindow])
				.then((results) => {
					// extract results
					const [longEnoughSinceLastPost, nowIsInsidePostingWindow] = results;
					// if it's inside the posting window and it's been long enough since the last post
					if (longEnoughSinceLastPost && nowIsInsidePostingWindow) {
						// get a promise to retrieve a random but in-season post
						module.exports.ReturnOneRandomInSeasonPost()
							// if the promise is resolved with the post info
							.then((postInfo) => {
								// get a promise to try to post to Tumblr
								sbTumblr.PostToTumblr(postInfo)
									// if the promise is resolved with a success message
									.then((result) => {
										// mark the post as posted
										module.exports.UpdatePostPostedProperty(result.post.docs[0]);
										// update the last posted time
										datesTimes.UpdateTimeOfLastPosting();
										// resolve this promise with the PostToTumblr result
										resolve(result);
									})
									// if the promise is rejected with an error, then reject this promise with an error
									.catch((error) => {
										// get qty times this post has been involved in a posting error
										let postErrorQuantity = 0;
										if (typeof (error.post.docs[0].postErrorQuantity) !== 'undefined') {
											postErrorQuantity = { postErrorQuantity };
										}
										// if there have been 3+ errors (including this one)
										if (postErrorQuantity >= 2) {
											// delete the post
											module.exports.DeletePost(error.post.docs[0]);
											// if post's error qty < 2 (i.e., if there have been less than 3 errors)
										} else {
											// increase postErrorQuantity
											module.exports.IncreasePostErrorQuantity(error.post);
										}
										reject(error);
									});
							})
							// if the promise is rejected with an error, then reject this promise with an error
							.catch((error) => { reject(error); });
					} else {
						resolve({ error: false, message: 'Not inside posting window OR not long enough since last post' });
					}
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),
};
