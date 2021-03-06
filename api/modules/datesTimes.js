
// ----- PULL IN MODULES

const dbQueries = require('./dbQueries');
const utilities = require('./utilities');
const moment = require('moment');
const momentHoliday = require('moment-holiday');

// ----- DEFINE & EXPORT DATETIME FUNCTIONS

module.exports = {

	ReturnNowLocalDateTimeUTCFormat: () => utilities.ReturnFormattedDateTime({ incomingDateTimeString: 'nowLocal' }),

	ReturnCurrentLocalTimezoneOffset: () => moment(module.exports.ReturnNowLocalDateTimeUTCFormat()).format('Z'),

	ReturnTodayLocalUTCFormat: () => utilities.ReturnFormattedDateTime({ incomingDateTimeString: 'nowLocal', incomingReturnFormat: 'YYYY-MM-DD' }),

	ReturnThisYearFourDigits: () => utilities.ReturnFormattedDateTime({ incomingDateTimeString: 'nowLocal', incomingReturnFormat: 'YYYY' }),

	ReturnStartOfTurkeyDayLocalUTCFormat: () => momentHoliday().holiday('Thanksgiving Day').format(),

	ReturnEndOfTurkeyDayLocalUTCFormat: () => moment(module.exports.ReturnStartOfTurkeyDayLocalUTCFormat()).add(23, 'hours').add(59, 'minutes').format(),

	ReturnDayAfterTurkeyDayLocalUTCFormat: () => moment(module.exports.ReturnStartOfTurkeyDayLocalUTCFormat()).add(24, 'hours').format(),

	ReturnPostsSettings: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to retrieve all documents from the postsSettings document collection
			dbQueries.ReturnAllDocsFromCollection('postsSettings')
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((postsSettings) => {
					resolve({
						error: postsSettings.error,
						postsSettings: postsSettings.docs[0],
					});
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),

	ReturnAllPostSchedulingSeasons: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to get post scheduling settings from db
			module.exports.ReturnPostsSettings()
				// if the promise is resolved with the settings
				.then((postsSettings) => {
					// resolve this promise with the relevant data
					resolve(postsSettings.postsSettings.scheduling.seasonal);					
				})
				// if the promise is rejected with an error, reject this promise with the error
				.catch((error) => { reject(error); });
		})),

	ReturnCurrentPostSchedulingSeason: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get the current local time in UTC format
			const nowLocal = module.exports.ReturnNowLocalDateTimeUTCFormat();
			// get the current year to use in constructing times
			const thisYear = module.exports.ReturnThisYearFourDigits();
			// get the relevant datetimes for Thanksgiving this year
			// const startOfTurkeyDay = module.exports.ReturnStartOfTurkeyDayLocalUTCFormat();
			const endOfTurkeyDay = module.exports.ReturnEndOfTurkeyDayLocalUTCFormat();
			const dayAfterTurkeyDay = module.exports.ReturnDayAfterTurkeyDayLocalUTCFormat();
			// get a promise to get post scheduling settings from db
			module.exports.ReturnPostsSettings()
				// if the promise is resolved with the settings
				.then((postsSettings) => {
					// iterate over the seasonal settings
					postsSettings.postsSettings.scheduling.seasonal.forEach(({
						name, friendlyName, seasonStartDateTime, seasonEndDateTime,
					}, index) => {
						// get the season's start and end datetimes
						let thisSeasonStartDateTime = '';
						let thisSeasonEndDateTime = '';
						if (seasonStartDateTime === 'endOfTurkeyDay') {
							thisSeasonStartDateTime = endOfTurkeyDay;
						} else if (seasonStartDateTime === 'dayAfterTurkeyDay') {
							thisSeasonStartDateTime = dayAfterTurkeyDay;
						} else {
							thisSeasonStartDateTime = moment(`${thisYear}-${seasonStartDateTime}:00${module.exports.ReturnCurrentLocalTimezoneOffset()}`);
						}
						if (seasonEndDateTime === 'endOfTurkeyDay') {
							thisSeasonEndDateTime = endOfTurkeyDay;
						} else if (seasonEndDateTime === 'dayAfterTurkeyDay') {
							thisSeasonEndDateTime = dayAfterTurkeyDay;
						} else {
							thisSeasonEndDateTime = moment(`${thisYear}-${seasonEndDateTime}:00${module.exports.ReturnCurrentLocalTimezoneOffset()}`);
						}
						// if the current datetime is between this season's start and end datetime
						if (moment(nowLocal).isBetween(thisSeasonStartDateTime, thisSeasonEndDateTime)) {
							// resolve this promise with this season
							resolve({
								name, friendlyName, seasonStartDateTime, seasonEndDateTime,
							});
						}
					});
				})
				// if the promise is rejected with an error, reject this promise with the error
				.catch((error) => { reject(error); });
		})),

	ReturnNowIsInsidePostingWindow: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// get the current local time in UTC format
			const nowLocal = module.exports.ReturnNowLocalDateTimeUTCFormat();
			// get the current date to use in constructing times
			const today = module.exports.ReturnTodayLocalUTCFormat();
			// get a promise to get post scheduling settings from db
			module.exports.ReturnPostsSettings()
				// if the promise is resolved with the settings
				.then((postsSettings) => {
					// get datetime for start and end of posting window
					const postingWindowStartDateTime = moment(`${today}T${postsSettings.postsSettings.scheduling.daily.dayStartTime}`).format();
					const postingWindowEndDateTime = moment(`${today}T${postsSettings.postsSettings.scheduling.daily.dayEndTime}`).format();
					// resolve with boolean: nowLocal is between posting window start and end datetimes
					resolve(moment(nowLocal).isBetween(postingWindowStartDateTime, postingWindowEndDateTime));
				})
				// if the promise is rejected with an error
				.catch((error) => {
					// reject this promise with the error
					reject(error);
				});
		})),	
	
	UpdateTimeOfLastPosting: () => 
		// return a new promise
		new Promise(((resolve, reject) => {
			// get the current local time in UTC format
			const nowLocal = module.exports.ReturnNowLocalDateTimeUTCFormat();
			// get a promise to retrieve posts settings
			module.exports.ReturnPostsSettings()
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((postsSettings) => {
					// get a promise to update the lastPostDateTime setting
					dbQueries.UpdateSpecificFieldInSpecificDocInCollection('postsSettings', '_id', postsSettings.postsSettings._id, true, 'lastPostDateTime', nowLocal)
						// if the promise is resolved with the result, then resolve this promise with the result
						.then((result) => { resolve(result); })
						// if the promise is rejected with an error, then reject this promise with an error
						.catch((error) => { reject(error); });
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),

	ReturnQuantityOfPostsReadyThisSeason: () => 
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to return the current season
			module.exports.ReturnCurrentPostSchedulingSeason()
				// if the promise is resolved with the current season
				.then((currentPostSchedulingSeason) => {
					// get a promise to retrieve all posts for the current season that aren't marked as posted
					dbQueries.ReturnAllSpecifiedDocsFromCollection('postsQueue', { $and: [{ season: currentPostSchedulingSeason.name }, { posted: { $ne: true } }] }, {})
						// if the promise is resolved with the posts
						.then((posts) => {
							// resolve this promise with the quantity of the posts
							resolve(posts.docs.length); 
						})
						// if the promise is rejected with an error, then reject this promise with an error
						.catch((error) => { reject(error); });
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),	

	ReturnLongEnoughSinceLastPost: () => 
		// return a new promise
		new Promise(((resolve, reject) => {
			// get a promise to get post scheduling settings from db
			module.exports.ReturnPostsSettings()
				// if the promise is resolved with the settings
				.then((postsSettings) => {
					// get a promise to get post scheduling settings from db
					module.exports.ReturnCurrentPostSchedulingSeason()
						// if the promise is resolved with the settings
						.then((currentPostSchedulingSeasonResults) => {
							// get a promise to retrieve the quantity of posts ready for posting this season
							module.exports.ReturnQuantityOfPostsReadyThisSeason()
								// if the promise is resolved with the quantity
								.then((quantityOfPostsReadyThisSeason) => {
									// set up basic vars and do some calculations
									const today = module.exports.ReturnTodayLocalUTCFormat();
									const thisYear = module.exports.ReturnThisYearFourDigits();
									const dailyPostSchedulingSettings = 
										postsSettings.postsSettings.scheduling.daily;
									const nowLocal = module.exports.ReturnNowLocalDateTimeUTCFormat();
									const { lastPostDateTime } = postsSettings.postsSettings;
									const postingWindowStartDateTime = moment(`${today}T${dailyPostSchedulingSettings.dayStartTime}`);
									const postingWindowEndDateTime = moment(`${today}T${dailyPostSchedulingSettings.dayEndTime}`);
									const minutesInPostingWindow = postingWindowEndDateTime.diff(postingWindowStartDateTime, 'minutes');
									const endDateThisPostSchedulingSeason = `${thisYear}-${currentPostSchedulingSeasonResults.seasonEndDateTime}:00${module.exports.ReturnCurrentLocalTimezoneOffset()}`;
									const quantityDaysLeftInThisPostSchedulingSeason = 
										moment(endDateThisPostSchedulingSeason).diff(moment(today), 'days') + 1; // the +1 is today
									const quantityPostsReadyThisSeasonPerDaysLeftInThisSeason = 
										quantityOfPostsReadyThisSeason / quantityDaysLeftInThisPostSchedulingSeason;
									let quantityOfPostsPerDay = 
										dailyPostSchedulingSettings.minimumQuantityOfPostsPerDay;
									/**
									 * if the number of posts remaining for this season  relative to 
									 * the number of days remaining in the season is more than the 
									 * minimum number of posts per day
									 */
									if ((quantityPostsReadyThisSeasonPerDaysLeftInThisSeason != null) && 
										(quantityPostsReadyThisSeasonPerDaysLeftInThisSeason > 
											dailyPostSchedulingSettings.minimumQuantityOfPostsPerDay)) {
										// use the higher number of posts per day
										quantityOfPostsPerDay = quantityPostsReadyThisSeasonPerDaysLeftInThisSeason;
									}
									const minutesBetweenPosts = 
										Math.ceil(minutesInPostingWindow / quantityOfPostsPerDay);
									const nextPostDateTime = moment(lastPostDateTime).add(minutesBetweenPosts, 'minutes').format();
									// if it's later than nextPostDateTime
									if (moment(nowLocal).isAfter(nextPostDateTime)) {
										// resolve this promise with true
										resolve(true);
										// if it's NOT later than nextPostDateTime
									} else {
										// resolve this promise with false
										resolve(false);
									}
								})
								// if the promise is rejected with an error, 
								// 		then reject this promise with the error
								.catch((error) => { reject(error); });
						})
						// if the promise is rejected with an error, then reject this promise with the error
						.catch((error) => { reject(error); });
				})
				// if the promise is rejected with an error, then reject this promise with the error
				.catch((error) => { reject(error); });
		})),
};
