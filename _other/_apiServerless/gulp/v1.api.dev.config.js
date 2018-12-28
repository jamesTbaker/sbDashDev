
module.exports = {
	ReturnV1APIDevSrcYML: () => ['./serverless.yml', '!node_modules/**/serverless.yml'],
	ReturnV1APIDevSrcFolder: () => '../api',
	/* ReturnV5SPSaveDevOptions: () => ({
		siteUrl: 'https://bmos.sharepoint.com/sites/hubdev',
		notification: true,
		folder: 'DevCode5',
		flatten: false,
	}), */
};
