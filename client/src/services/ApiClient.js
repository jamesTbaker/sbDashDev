import axios from 'axios';
import qs from 'qs';


export default class ApiClient {
	static GetAPIData(endpoint) {
		// return a new promise
		return new Promise((resolve, reject) => {
			// set axios config
			const axiosConfig = {
				headers: {
					restAuth: 'OyDFNm6rsM',
				},
			};
			// get a promise to retrieve the data
			axios.get(endpoint, axiosConfig)
				// if the promise is resolved with the data, then resolve this promise with the data
				.then((result) => {
					// console.log('axios result');
					// console.log(result);
					resolve(result);
				})
				// if the promise is rejected with an error
				.catch((returnedError) => {
					// console.log('axios error');
					// console.log(returnedError);
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
					restAuth: 'OyDFNm6rsM',
					'Content-Type': 'application/x-www-form-urlencoded',
				}, 
			};
			// get a promise to post the data
			axios.post(endpoint, qs.stringify(jsonObject), config)
				// if the promise is resolved with a result, then resolve this promise with the result
				.then((result) => { 
					// console.log('axios result');
					// console.log(result);
					resolve(result);
				})
				// if the promise is rejected with an error
				.catch((returnedError) => {
					// console.log('axios error');
					// console.log(returnedError);
					// reject this promise with an error
					reject({
						error: true,
						axiosError: returnedError,
					});
				});
		});
	}
}
