
// ----- PULL IN MODULES, GET EXPRESS ROUTER

const express = require('express');
const datesTimes = require('../modules/datesTimes');

const router = express.Router();

// ----- CONFIG EXPRESS ROUTER

// GET ---

router.get('/current-post-scheduling-season', (req, res, next) => {
	datesTimes.ReturnCurrentPostSchedulingSeason()
		.then((result) => { res.json(result); })
		.catch((error) => { res.json(error); });
});

// ----- EXPORT EXPRESS ROUTER

module.exports = router;
