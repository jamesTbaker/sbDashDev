
// ----- PULL IN MODULES

const tumblr = require('tumblr.js');
const dbQueries = require('./dbQueries');
const screenSizes = require('./screenSizes');

// ----- DEFINE SETTINGS FUNCTIONS

module.exports = {

	ReturnTumblrSettings: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the settings document collection
			dbQueries.ReturnAllDocsFromCollection('tumblrSettings')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((tumblrSettings) => {
					resolve({ error: tumblrSettings.error, tumblr: tumblrSettings.docs[0] });
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),

	ReturnTumblrClient: tumblrSettings => 
		tumblr.createClient({
			consumer_key: tumblrSettings.tumblr.consumerKey,
			consumer_secret: tumblrSettings.tumblr.consumerSecret,
			token: tumblrSettings.tumblr.oauthToken,
			token_secret: tumblrSettings.tumblr.oauthTokenSecret,
		}),

	ReturnBlogInfo: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get promise to get tumblr settings
			module.exports.ReturnTumblrSettings()
				// if the promise is resolved with the settings
				.then((tumblrSettings) => {
					// create a Tumblr client
					const tumblrClient = module.exports.ReturnTumblrClient(tumblrSettings);
					// attempt to post
					tumblrClient
						.blogInfo(
							tumblrSettings.tumblr.blogName,
							(tumblrError, tumblrResponse) => {
								// if Tumblr didn't return an error, resolve this promise with the posts data
								if (!tumblrError) {
									resolve({ error: false, blogInfo: tumblrResponse });
								} else {
									reject({ error: true, tumblrError });
								}
							},
						);
				})
				// if the promise is rejected with an error, reject this promise with the error
				.catch((error) => { reject(error); });
		})),

	ReturnBlogAvatarURL: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get promise to get tumblr settings
			module.exports.ReturnTumblrSettings()
				// if the promise is resolved with the settings
				.then((tumblrSettings) => {
					// create a Tumblr client
					const tumblrClient = module.exports.ReturnTumblrClient(tumblrSettings);
					// attempt to post
					tumblrClient
						.blogAvatar(
							tumblrSettings.tumblr.blogName,
							{ size: '128' },
							(tumblrError, tumblrResponse) => {
								// if Tumblr didn't return an error, resolve this promise with the posts data
								if (!tumblrError) {
									resolve({ error: false, avatarURL: tumblrResponse.avatar_url });
								} else {
									reject({ error: true, tumblrError });
								}
							},
						// // eslint-disable-line comma-dangle
						);
				})
				// if the promise is rejected with an error, reject this promise with the error
				.catch((error) => { reject(error); });
		})),

	PostToTumblr: postInfo =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get promise to get tumblr settings
			module.exports.ReturnTumblrSettings()
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
								// if Tumblr resturned a response and it wasn't an error
								if (typeof (tumblrResponse) !== 'undefined'
									&& tumblrResponse == null) {
									// resolve this promise with a message
									resolve({ error: false, post: postInfo });
								// if Tumblr returned no response or response was an error
								} else {
									// reject this promise with a message
									const tumblrError = {
										error: true,
										tumblrError: tumblrResponse,
										post: postInfo,
									};
									reject(tumblrError);
								}
							},
						);
				})
				// if the promise is rejected with an error, reject this promise with the error
				.catch((error) => { reject(error); });
		})),

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

	ReturnDashboardPosts: offset =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get promise to get tumblr settings
			module.exports.ReturnTumblrSettings()
				// if the promise is resolved with the settings
				.then((tumblrSettings) => {
					// create a Tumblr client
					const tumblrClient = module.exports.ReturnTumblrClient(tumblrSettings);
					// attempt to post
					tumblrClient
						.userDashboard(
							{ offset, type: 'photo' },
							(tumblrError, tumblrResponse) => {
								// if Tumblr didn't return an error
								if (!tumblrError) {
									// extract needed posts data from response
									const posts = [];
									tumblrResponse.posts.forEach((returnedPost) => {
										if (returnedPost.blog_name !== 'skipbaker') {
											const post = {
												id: returnedPost.id,
												blog_name: returnedPost.blog_name,
												post_url: returnedPost.post_url,
												reblog_key: returnedPost.reblog_key,
												pics: {},
											};
											// get the smallest image that is larger than 
											// 		small screen width, the smallest that is larger
											// 		than medium screen width, and the largest image
											const postPics = returnedPost.photos[0].alt_sizes;
											postPics.reverse();
											postPics.forEach((postPic) => {
												if (
													!post.pics.minimum &&
													postPic.width > 499
												) {
													post.pics.minimum = postPic.url;
												}
												if (
													!post.pics.small &&
													postPic.width > screenSizes.ReturnSmallMax()
												) {
													post.pics.small = postPic.url;
												}
												if (
													!post.pics.medium &&
													postPic.width > screenSizes.ReturnMediumMax()
												) {
													post.pics.medium = postPic.url;
												}
												if (
													!post.pics.large &&
													postPic.width > screenSizes.ReturnLargeMin()
												) {
													post.pics.large = postPic.url;
												}
											});
											// if a minimum was found, but no small, medium, or large,
											// 		use minimum for others
											if (post.pics.minimum && !post.pics.small) {
												post.pics.small = post.pics.minimum;
											}
											if (post.pics.small && !post.pics.medium) {
												post.pics.medium = post.pics.small;
											}
											if (post.pics.medium && !post.pics.large) {
												post.pics.large = post.pics.medium;
											}
											// if at least a small image was found, add this post to posts
											if (post.pics.small) {
												posts.push(post);
											}
										}
									});
									// resolve this promist with the posts
									resolve({ error: false, posts });
								} else {
									reject({ error: true, tumblrError });
								}
							},
						);
				})
				// if the promise is rejected with an error, reject this promise with the error
				.catch((error) => { reject(error); });
		})),
};
