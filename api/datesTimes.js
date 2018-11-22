
// ----- PULL IN MODULES

const dbQueries = require('./dbQueries');
const moment = require('moment-timezone');
const momentHoliday = require('moment-holiday');

// ----- DEFINE & EXPORT FUNCTIONS

module.exports = {

	ReturnNowBostonDateTimeUTCFormat: () => moment.tz('America/New_York').format('YYYY-MM-DD HH:mm:ssZ'),

	ReturnCurrentLocalTimezoneOffset: () => moment.tz('America/New_York').format('Z'),

	ReturnTodayLocalUTCFormat: () => moment.tz('America/New_York').format('YYYY-MM-DD'),

	ReturnThisYearLocalFourDigits: () => moment.tz('America/New_York').format('YYYY'),

	ReturnStartOfTurkeyDayLocalUTCFormat: () => momentHoliday().holiday('Thanksgiving Day').format(),

	ReturnEndOfTurkeyDayLocalUTCFormat: () => moment(module.exports.ReturnStartOfTurkeyDayLocalUTCFormat()).add(23, 'hours').add(59, 'minutes').format(),

	ReturnDayAfterTurkeyDayLocalUTCFormat: () => moment(module.exports.ReturnStartOfTurkeyDayLocalUTCFormat()).add(24, 'hours').format(),

	ReturnPostsSettings: () =>
		// return a new promise
		new Promise(((resolve, reject) => {
			// construct db params
			const params = {
				TableName: '_dev_postsSettings',
				Key: {
					_id: '0',
				},
			};
			// get a promise to retrieve the items
			dbQueries.ReturnDBItems(params)
				// if the promise is resolved with the items, then resolve this promise with the items
				.then((postsSettings) => {
					console.log('postsSettings');
					console.log(postsSettings);
					resolve({
						error: postsSettings.error,
						postsSettings: postsSettings.items,
					});
				})
				// if the promise is rejected with an error, then reject this promise with an error
				.catch((error) => { reject(error); });
		})),

	ReturnCurrentPostSchedulingSeason: () => 
		// return a new promise
		new Promise(((resolve, reject) => {
			// get the current local time in UTC format
			const nowBoston = module.exports.ReturnNowBostonDateTimeUTCFormat();
			// get the current year to use in constructing times
			const thisYear = module.exports.ReturnThisYearLocalFourDigits();
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
						if (moment(nowBoston).isBetween(thisSeasonStartDateTime, thisSeasonEndDateTime)) {
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
			const nowBoston = module.exports.ReturnNowBostonDateTimeUTCFormat();
			// get the current date to use in constructing times
			const today = module.exports.ReturnTodayLocalUTCFormat();
			// get a promise to get post scheduling settings from db
			module.exports.ReturnPostsSettings()
				// if the promise is resolved with the settings
				.then((postsSettings) => {
					// get datetime for start and end of posting window
					const postingWindowStartDateTime = moment(`${today}T${postsSettings.postsSettings.scheduling.daily.dayStartTime}`).format();
					const postingWindowEndDateTime = moment(`${today}T${postsSettings.postsSettings.scheduling.daily.dayEndTime}`).format();
					// resolve with boolean: nowBoston is between posting window start and end datetimes
					resolve(moment(nowBoston).isBetween(postingWindowStartDateTime, postingWindowEndDateTime));
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
			const nowBoston = module.exports.ReturnNowBostonDateTimeUTCFormat();
			// get a promise to retrieve posts settings
			module.exports.ReturnPostsSettings()
				// if the promise is resolved with the docs, then resolve this promise with the docs
				.then((postsSettings) => {
					// construct db params
					const params = {
						TableName: '_dev_postsSettings',
						Key: {
							_id: postsSettings.postsSettings._id,
						},
						UpdateExpression: 'set lastPostDateTime = :t',
						ExpressionAttributeValues: {
							':r': nowBoston,
						},
						ReturnValues: 'UPDATED_NEW',
					};
					// get a promise to update the lastPostDateTime setting
					dbQueries.UpdateDBItems(params)
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
					// construct db params
					const params = {
						TableName: '_dev_postsQueue',
						KeyConditionExpression: '#season = :s and #posted <> :p',
						ExpressionAttributeNames: {
							'#season': 'season',
							'#posted': 'posted',
						},
						ExpressionAttributeValues: {
							':s': currentPostSchedulingSeason.name,
							':p': true,
						},
					};
					// get a promise to retrieve the data
					dbQueries.ReturnDBItems(params)
						// if the promise is resolved with the posts
						.then((posts) => {
							console.log('posts');
							console.log(posts);
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
									const thisYear = module.exports.ReturnThisYearLocalFourDigits();
									const dailyPostSchedulingSettings = 
										postsSettings.postsSettings.scheduling.daily;
									const nowBoston = module.exports.ReturnNowBostonDateTimeUTCFormat();
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
									if (moment(nowBoston).isAfter(nextPostDateTime)) {
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
