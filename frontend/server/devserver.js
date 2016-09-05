var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./../webpack.dev.config');
var path = require('path');


// First we fire up Webpack and pass in the configuration we
// created
var bundleStart = null;
var compiler = webpack(config);

// We give notice in the terminal when it starts bundling and
// set the time it started
compiler.plugin('compile', function () {
	console.log('Bundling...');
	bundleStart = Date.now();
});

// We also give notice when it is done compiling, including the
// time it took. Nice to have
compiler.plugin('done', function () {
	console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
});

new WebpackDevServer(compiler, {
	publicPath: config.output.publicPath,
	hot: true,
	inline: true,
	historyApiFallback: true,
	contentBase: path.join(__dirname, '../build/'),
	quiet: false,
	noInfo: true,
	stats: {
		colors: true
	}
}).listen(3000, 'localhost', function (err, result) {
	if (err) console.log(err);
	console.log('Listening at localhost:3000');
});
