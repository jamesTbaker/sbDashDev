
// ----- PULL IN MODULES, GET EXPRESS ROUTER

const express = require('express');
const health = require('../modules/health');
const httpAuth = require('../modules/httpAuth');

const router = express.Router();

// ----- CONFIG EXPRESS ROUTER

// GET ---

router.get('/check', (req, res, next) => {
	if (httpAuth.ReturnIsAuthorized(req.header('restAuth'))) {
		health.ReturnHealth()
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
