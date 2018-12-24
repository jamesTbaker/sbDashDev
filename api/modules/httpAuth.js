
// ----- PULL IN MODULES

// const dbQueries = require('./dbQueries');

// ----- DEFINE HTTP AUTHORIZATION FUNCTIONS

module.exports = {

	ReturnIsAuthorized: (incomingRestAuth, incomingOrigin) => incomingRestAuth === process.env.httpRestAuthorizationToken || incomingOrigin === 'http://192.168.0.15:4001',
};
