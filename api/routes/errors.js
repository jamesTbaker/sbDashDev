
// ----- PULL IN MODULES, GET EXPRESS ROUTER

const express = require('express');
const errors = require('../modules/errors');
const httpAuth = require('../modules/httpAuth');

const router = express.Router();

// ----- CONFIG EXPRESS ROUTER

// GET ---

router.get('/process', (req, res, next) => {
	if (httpAuth.ReturnIsAuthorized(req.header('restAuth'))) {
		errors.ProcessError()
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
