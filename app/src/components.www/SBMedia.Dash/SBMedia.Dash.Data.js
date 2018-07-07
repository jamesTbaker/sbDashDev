
// ----- IMPORTS

import APIClient from '../../services/ApiClient';

// ----- DATA

module.exports = {
	ReturnDashboardPosts: offset => 
		// return a new promise
		new Promise((resolve, reject) => {
			// get a promise to retrieve the posts
			APIClient
				.GetAPIData(`http://192.168.0.15:3000/api/sbTumblr/dash/${offset}`)
				// if the promise is resolved with the posts
				.then((dashPosts) => {
					// resolve this promise with the posts
					resolve(dashPosts.dashPosts.posts);
				})
				// if the promise is rejected with an error
				.catch((dashError) => {
					// reject this promise with the error
					reject(dashError);
				});
		}),
};
