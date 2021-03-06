let gulp = require('gulp'),
	rollup = require('rollup'),
	getRollupConfig = require('./rollup.config'),
	chalk = require('chalk'),
	nodemon = require("gulp-nodemon"),
	livereload = require('gulp-livereload'),
	execSync = require("child_process").execSync;

let nodemonStream;

gulp.task("compile", bundleClient);

gulp.task("server:start", ["compile"], startNodemonServer);
gulp.task("server:restart", restartNodemonServer);


// WATCH
// =====
gulp.task("default", ["server:start", "watch"]);

gulp.task("watch", () => {
	gulp.watch(["client/**/*"], ["compile"]);
	gulp.watch(["server/**"], ["server:restart"]);
	
	// live reload
	livereload.listen();
	gulp.watch(["dist/**/*"], (file) => {
		livereload.changed(file)
	});
});

function bundleClient() {
	updateDocumentation();
	return rollup.rollup(getRollupConfig({external: ['underscore', 'react', 'react-dom', 'react-router-dom', 'doctrine-standalone', 'babel-standalone']}))
		.then(bundle => {
			bundle.write({
				format: 'iife',
				dest: 'dist/index.js',
				globals: {
					'underscore': '_',
					'react': 'React',
					'react-dom': 'ReactDOM',
					'react-router-dom':'ReactRouterDOM',
                    'doctrine-standalone': 'doctrine',
					'babel-standalone': 'Babel',
				},
				moduleName: 'UiZoo',
			});
		})
		.catch(err => {
			console.error(chalk.red(err.message));
			console.error(chalk.grey(err.formatted && err.formatted.replace('Error: ' + err.message + '\n', '')));
		});
}

function startNodemonServer() {
	nodemonStream = nodemon({
		script: './server/main.js',
		ext: 'js html',
		watch: false,
	})
}

function restartNodemonServer() {
	if (nodemonStream) {
		nodemonStream.emit('restart', 0);
	} else {
		startNodemonServer();
	}
}

function handleError(error) {
	console.error(chalk.red(error.message));
	console.error(chalk.grey(error.formatted && err.formatted.replace('Error: ' + error.message + '\n', '')));

	if (this && this.emit) {
		this.emit('end');
	}
}

function updateDocumentation() {
	try {
		execSync(`node documentationMapper.js "./client/Components/UI/*/index.js" "./client/Components/UI/(.+)/index.js" "./client/documentation.js"`);
	}
	catch (err) {
		console.error(err.message);
	}
}