
// ----- PULL IN MODULES, GET EXPRESS ROUTER

const express = require('express');
const datesTimes = require('../modules/datesTimes');
const httpAuth = require('../modules/httpAuth');

const router = express.Router();

// ----- CONFIG EXPRESS ROUTER

// GET ---

router.get('/current-post-scheduling-season', (req, res, next) => {
	if (httpAuth.ReturnIsAuthorized(req.header('restAuth'))) {
		datesTimes.ReturnCurrentPostSchedulingSeason()
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
