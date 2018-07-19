import axios from 'axios';
import qs from 'qs';


export default class ApiClient {
	static GetAPIData(endpoint) {
		// return a new promise
		return new Promise((resolve, reject) => {
			// get a promise to retrieve the data
			axios.get(endpoint)
				// if the promise is resolved with the data, then resolve this promise with the data
				.then((result) => { console.log('result'); console.log(result); resolve(result); })
				// if the promise is rejected with an error
				.catch((returnedError) => {
					// reject this promise with an error
					reject({
						error: true,
						axiosError: returnedError,
					});
				});
		});
	}
	static PostAPIData(endpoint, jsonObject) {
		// return a new promise
		return new Promise((resolve, reject) => {
			const config = { 
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				}, 
			};
			// get a promise to post the data
			axios.post(endpoint, qs.stringify(jsonObject), config)
				// if the promise is resolved with a result, then resolve this promise with the result
				.then((result) => { resolve(result); })
				// if the promise is rejected with an error
				.catch((returnedError) => {
					// reject this promise with an error
					reject({
						error: true,
						axiosError: returnedError,
					});
				});
		});
	}
}
