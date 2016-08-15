import gulp from 'gulp';
import gutil from 'gulp-util';
import runSequence from 'run-sequence';
import del from 'del';
import webpack from 'webpack';
import yargs from 'yargs';
import connect from 'gulp-connect';
import webpackConfig from './webpack.config';

let hash;

const args = yargs
    .options({
        pack: {
            alias: 'min',
            describe: 'uglify code',
            'boolean': true,
        },
    }).argv;

if (args.pack) {
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, mangle: false}));
}

const compiler = webpack(webpackConfig);

gulp.task('clean', (callback) => {
    del([
        'app/js/*.js',
        'app/js/*.js.map',
        `!app/js/bundle-${hash}.js`,
        `!app/js/bundle-${hash}.js.map`,
        'app/css/*.css',
        'app/css/*.css.map',
        `!app/css/styles-${hash}.css`,
        `!app/css/styles-${hash}.css.map`,
    ]).then(() => {
        callback();
    });
});

gulp.task('js', ['clean'], (callback) => {
    function report(resolve, err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }

        hash = stats.compilation.hash;

        gutil.log('[webpack]', stats.toString({
            chunks: false,
            colors: true,
        }));

        resolve();
    }

    Promise.all([
        new Promise((resolve) => {
            compiler.run(report.bind(null, resolve));
        }),
    ]).then(() => {
        runSequence('clean');
        callback();
    });
});


gulp.task('js-watch', ['clean'], () => {
    compiler.watch({
        aggregateTimeout: 300,
        poll: true,
    }, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }

        hash = stats.compilation.hash;
        runSequence('clean');

        gutil.log('[webpack]', stats.toString({
            chunks: false,
            colors: true,
        }));
    });
});

gulp.task('copy', () => {
    gulp
        .src(['./node_modules/onsenui/css/font_awesome/*/*'])
        .pipe(gulp.dest('./source/styles/font_awesome'));
    gulp
        .src(['./node_modules/onsenui/css/ionicons/*/*'])
        .pipe(gulp.dest('./source/styles/ionicons'));
    gulp
        .src(['./node_modules/onsenui/css/material-design-iconic-font/*/*'])
        .pipe(gulp.dest('./source/styles/material-design-iconic-font'));
    gulp
        .src([
            './node_modules/onsenui/css/onsen-css-components.css',
            './node_modules/onsenui/css/onsenui.css',
        ])
        .pipe(gulp.dest('./source/styles/onsen'));
});

gulp.task('server', () => {
    connect.server({
        root: './app',
        livereload: false,
    });
});

gulp.task('build', ['js']);
gulp.task('watch', ['clean', 'js-watch']);
