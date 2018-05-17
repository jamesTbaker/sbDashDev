
// ----- PULL IN MODULES, GET EXPRESS ROUTER

const express = require('express');
const sbTumblr = require('../modules/sbTumblr');

const router = express.Router();

// ----- CONFIG EXPRESS ROUTER

// GET ---

router.get('/dash/:offset', (req, res, next) => {
	sbTumblr.ReturnDashboardPosts(req.params.offset)
		.then((result) => { res.json(result); })
		.catch((error) => { res.json(error); });
});

router.get('/info', (req, res, next) => {
	sbTumblr.ReturnBlogInfo()
		.then((result) => { res.json(result); })
		.catch((error) => { res.json(error); });
});

router.get('/avatar-url', (req, res, next) => {
	sbTumblr.ReturnBlogAvatarURL()
		.then((result) => { res.json(result); })
		.catch((error) => { res.json(error); });
});

// ----- EXPORT EXPRESS ROUTER

module.exports = router;
