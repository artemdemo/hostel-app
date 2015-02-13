module.exports = function(grunt) {

    var infoBanner = '/**!\n' +
                     ' * <%= pkg.name %> \n' +
                     ' * version: <%= pkg.version %>\n' +
                     ' * date: <%= grunt.template.today("yyyy-mm-dd") %>\n'+
                     ' * url: <%= pkg.repository.url %>\n' +
                     ' */\n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
            development: {
                options: {
                    compress: false,
                    optimization: 2
                },
                files: {
                    "css/style.css": "src/less/style.less"
                }
            }
        },
		jshint: {
			all: ['src/js/**/*.js', 'src/test/**/*.js'],
			options: {
				globals: {
					_: false,
					$: false,
					jasmine: false,
					describe: false,
					it: false,
					expect: false,
					beforeEach: false
				},
				browser: true,
				devel: true
			}
		},
        concat: {
            options: {
                stripBanners: true,
                banner: infoBanner,
            },
            dist: {
                dest: 'js/hostelapp.js',
                src: [
                    'src/js/app.js',
                    'src/js/controllers.js'
                ]
            },
        },
		uglify: {
            options: {
                banner: infoBanner,
                sourceMap: true,
                sourceMapIncludeSources: true
            },
            my_target: {
                files: {
                    'js/hostelapp.min.js': ['js/hostelapp.js']
                }
            }
        },
        watch: {
            styles: {
                files: [
                    'src/less/*.less'
                ],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            scripts: {
                files: ['**/*.js'],
                tasks: ['jshint', 'concat'],
                options: {
                    spawn: false
                }
            }
        },
        jsdoc : {
            dist : {
                src: ['src/js/**/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        },
		testem: {
			unit: {
				options: {
					framework: 'jasmine2',
					launch_in_dev: ['PhantomJS'],
					before_tests: ['grunt jshint', 'grunt less'],
					serve_files: [
						//'node_modules/lodash/lodash.js',
						//'node_modules/jquery/dist/jquery.js',
						'src/js/**/*.js',
						'src/test/**/*.js'
					],
					watch_files: [
						'src/**/*.js',
						'test/**/*.js',
					]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-testem');

	grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('test', ['testem:run:unit']);
    grunt.registerTask('doc', ['jsdoc']);
	grunt.registerTask('min', ['uglify']);
	grunt.registerTask('default', ['less', 'jshint', 'concat', 'watch']);

}