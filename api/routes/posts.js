
// ----- PULL IN MODULES, GET EXPRESS ROUTER

const express = require('express');
const posts = require('../modules/posts');
const httpAuth = require('../modules/httpAuth');

const router = express.Router();

// ----- CONFIG EXPRESS ROUTER

// GET ---

router.get('/get-post', (req, res, next) => {
	if (httpAuth.ReturnIsAuthorized(req.header('restAuth'))) {
		posts.ReturnOneRandomInSeasonPost()
			.then((result) => { res.json(result); })
			.catch((error) => { res.json(error); });
	} else {
		res.json({
			error: true,
			authorizationError: true,
		});
	}
});

router.get('/post', (req, res, next) => {
	if (httpAuth.ReturnIsAuthorized(req.header('restAuth'))) {
		posts.Post()
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
