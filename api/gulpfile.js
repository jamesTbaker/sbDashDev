

const gulp = require('gulp');
const serverlessGulp = require('serverless-gulp');
const { argv } = require('yargs');
const gulpV1APIDevConfig = require('./gulp/v1.api.dev.config');

gulp.task('api-deploy-function', () => { /*  */
	gulp.src(['./**/serverless.yml', '!node_modules/**/serverless.yml'], { read: false })
	// gulp.src(`${gulpV1APIDevConfig.ReturnV1APIDevSrcFolder()}/**`)
		.pipe(serverlessGulp.exec('deploy', { function: argv.function, stage: 'dev' }));
});
