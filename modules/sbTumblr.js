
// ----- PULL IN MODULES

const settings = require('./settings');
const tumblr = require('tumblr.js');

// ----- DEFINE SETTINGS FUNCTIONS

module.exports = {

	ReturnTumblrClient: (tumblrSettings) => tumblr.createClient({
		consumer_key: tumblrSettings.tumblr.consumerKey,
		consumer_secret: tumblrSettings.tumblr.consumerSecret,
		token: tumblrSettings.tumblr.oauthToken,
		token_secret: tumblrSettings.tumblr.oauthTokenSecret,
	}),

	ReturnTumblrReblogParameters: (tumblrSettings, postInfo) => {
		// copy / extract the actual post info for convenience
		const postDataToUse = postInfo.docs[0];
		// set up basic params
		const tumblrReblogParameters = {
			id: postDataToUse.tumblrID,
			reblog_key: postDataToUse.tumblrReblogKey,
		};
		if (typeof (postDataToUse.tags) !== 'undefined' && postDataToUse.tags !== '') {
			tumblrReblogParameters.tags = `${tumblrSettings.tumblr.defaultTags}, ${postDataToUse.tags}`;
		} else {
			tumblrReblogParameters.tags = tumblrSettings.tumblr.defaultTags;
		}
		if (typeof (postDataToUse.addedCaption) !== 'undefined' && postDataToUse.addedCaption !== '') {
			tumblrReblogParameters.comment = postDataToUse.addedCaption;
		}
		return tumblrReblogParameters;
	},

	PostToTumblr: (postInfo) =>
		// return a new promise
		new Promise(((resolve, reject) => {			
			// get promise to get tumblr settings
			settings.ReturnTumblrSettings()
				// if the promise is resolved with the settings
				.then((tumblrSettings) => {
					// create a Tumblr client
					const tumblrClient = module.exports.ReturnTumblrClient(tumblrSettings);
					// create an object of reblog parameters from postInfo
					const tumblrReblogParameters =
						module.exports.ReturnTumblrReblogParameters(tumblrSettings, postInfo);
					// attempt to post
					tumblrClient
						.reblogPost(
						tumblrSettings.tumblr.blogName,
						tumblrReblogParameters,
						(tumblrResponse) => {
							// if Tumblr didn't return an error, resolve this promise with a message
							if (typeof (tumblrResponse) !== 'undefined'
								&& tumblrResponse == null
								&& !(tumblrResponse instanceof Error)) {
								resolve({ error: false, post: postInfo });
								// if Tumblr returned an error, reject this promise with a message
							} else {
								const tumblrError = {
									error: true,
									tumblrError: tumblrResponse,
									post: postInfo,
								};
								reject(tumblrError);
							}
						} // eslint-disable-line comma-dangle
					);
				})
				// if the promise is rejected with an error, reject this promise with the error
				.catch((error) => { reject(error); });
		})
	),
};
