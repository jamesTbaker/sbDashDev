
// ----- PULL IN MODULES

const gulp = require('gulp');
// const cached = require('gulp-cached');
const plumber = require('gulp-plumber');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
// const { argv } = require('yargs');
const webpackLocalDevConfig = require('./webpack/webpack.local.dev.config.js');
const gulpLocalDevConfig = require('./gulp/local.dev.config');

// ----- CONFIG TASKS

// LOCAL ---

// DEV

// build dist file
gulp.task('local-dev-build', () =>
	// for all files in the src folder
	gulp.src(`${gulpLocalDevConfig.ReturnLocalDevSrcFolder()}/**`)
		// replace the standard pipe method
		.pipe(plumber())
		// pipe them through webpack
		.pipe(webpackStream(webpackLocalDevConfig), webpack)
		// to the dist folder
		.pipe(gulp.dest(`${gulpLocalDevConfig.ReturnLocalDevDistFolder()}`)));

// when src changes, build dist 
gulp.task('local-dev-watch-build', () => {
	// watch the src folder; upon changes, build dist file and push dist to dev
	gulp.watch([`${gulpLocalDevConfig.ReturnLocalDevSrcFolder()}/**`], gulp.series('local-dev-build'));
});
