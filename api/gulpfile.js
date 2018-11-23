
// ----- PULL IN MODULES

const gulp = require('gulp');
const serverlessGulp = require('serverless-gulp');
const { argv } = require('yargs');
const gulpV1APIDevConfig = require('./gulp/v1.api.dev.config');

// ----- CONFIG TASKS

gulp.task('1-api-f-d', () => gulp.src(gulpV1APIDevConfig.ReturnV1APIDevSrcYML())
	.pipe(serverlessGulp.exec('deploy', { function: argv.function, stage: argv.stage })));		

gulp.task('1-api-f-i', () => gulp.src(gulpV1APIDevConfig.ReturnV1APIDevSrcYML())
	.pipe(serverlessGulp.exec('invoke', { function: argv.function, stage: argv.stage })));

// watching results in circularity because deployment results in creating a deleting a file
/* gulp.task('1-api-f-w-d-i', () => {
	gulp.watch([gulpV1APIDevConfig.ReturnV1APIDevSrcFolder()], gulp.series('1-api-f-d'));
}); */
