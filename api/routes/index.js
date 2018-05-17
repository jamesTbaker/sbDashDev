
// ----- PULL IN EXPRESS, GET EXPRESS ROUTER

const express = require('express');
const httpAuth = require('../modules/httpAuth');

const router = express.Router();

// ----- CONFIG EXPRESS ROUTER

// GET ---
router.get('/', (req, res, next) => {
	if (httpAuth.ReturnIsAuthorized(req.header('restAuth'))) {
		res.render('index', { title: 'Index' });
	} else {
		res.json({
			error: true,
			authorizationError: true,
		});
	}
});

// ----- EXPORT EXPRESS ROUTER

module.exports = router;
