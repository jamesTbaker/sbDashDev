
// ----- PULL IN MODULES

// const dbQueries = require('./dbQueries');

// ----- DEFINE HTTP AUTHORIZATION FUNCTIONS

module.exports = {

	ReturnIsAuthorized: incomingRestAuth => 
		incomingRestAuth === process.env.httpRestAuthorizationToken,
		
};
