
// ----- PULL IN MODULES, GET EXPRESS ROUTER

const express = require('express');
const sbTumblr = require('../modules/sbTumblr');
const httpAuth = require('../modules/httpAuth');

const router = express.Router();

// ----- CONFIG EXPRESS ROUTER

// GET ---

router.get('/info', (req, res, next) => {
	if (httpAuth.ReturnIsAuthorized(req.header('restAuth'))) {
		sbTumblr.ReturnBlogInfo()
			.then((result) => { res.json(result); })
			.catch((error) => { res.json(error); });
	} else {
		res.json({
			error: true,
			authorizationError: true,
		});
	}
});

router.get('/avatar-url', (req, res, next) => {
	if (httpAuth.ReturnIsAuthorized(req.header('restAuth'))) {
		sbTumblr.ReturnBlogAvatarURL()
			.then((result) => { res.json(result); })
			.catch((error) => { res.json(error); });
	} else {
		res.json({
			error: true,
			authorizationError: true,
		});
	}
});

router.get('/dash/:offset', (req, res, next) => {
	if (httpAuth.ReturnIsAuthorized(req.header('restAuth'))) {
		sbTumblr.ReturnDashboardPosts(req.params.offset)
			.then((result) => { res.json(result); })
			.catch((error) => { res.json(error); });
	} else {
		res.json({
			error: true,
			authorizationError: true,
		});
	}
});

// ----- EXPORT EXPRESS ROUTER

module.exports = router;
