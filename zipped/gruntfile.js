	
var _              = require('lodash');
   	lintFiles = {
        // Linting files for client side javascript code.
        client: {
            files: {
                src: [
                	'gruntfile.js',
                	'src/*.js',
                	'src/client/**/*.js'    
                ]
            }
        },    	
        // Linting files for server side or shared javascript code.
        server: {
            files: {
                src: [
                    'gruntfile.js',
                	'src/*.js',
                	'src/server/**/*.js'  
                ]
            }
        },


    },
configureGrunt = function(grunt) {
	grunt.initConfig({

	pkg: grunt.file.readJSON('package.json'),

	// Allows us to refer to the values of properties within our package.json (Refer:http://gruntjs.com/sample-gruntfile)
	// ### grunt-contrib-jshint
	// Linting rules, run as part of `grunt validate`. See [grunt validate](#validate) and its subtasks for
	// More information.
	jshint : (function () {
		return _.merge({
				client: {
					options: {
						config: 'src/client/.jshintrc' // Add globals in the .client_jshintrc file if you are using frameworks like angularjs,emberjs,backbonejs
					}
				},
				server: {
					options:{
						config: '.jshintrc'
					}
				}
		}, lintFiles);	
	})(),

	// ### grunt-jscs
	// Code style rules, run as part of `grunt validate`. See [grunt validate](#validate) and its subtasks for
	// more information.
	//for more information and detailed explanation about jscs options check : http://jshint.com/docs/options/
	 jscs : (function () {
	 	var jscsConfig = _.merge({
        client: {
            options: {
             config: '.jscsrc'
			 },
				},
		server: {
			//	main: index.js,  // main is optional specify your server side javascript nodejs files
			options:{
			config: '.jscsrc'
			}
		}
	   }, lintFiles);

        // You can add more configurations over here
        // JSCS depends on Esprima which doesn't yet support ES6 module
        // syntax.  As such we cannot run JSCS on the client code yet.
        // Related JSCS issue: https://github.com/jscs-dev/node-jscs/issues/561
        // @TODO(hswolff): remove this once JSCS supports ES6.
        delete jscsConfig.client;

        return jscsConfig;
     })(),    

            // ### grunt-contrib-copy
            // Copy files into their correct locations as part of building assets, or creating release zips
            copy: {
                dev: {
                    files: [{
                        cwd: 'bower_components/jquery/',
                        src: 'jquery.js',
                        dest: 'src/built/public/',
                        expand: true
                    }, {
                        cwd: 'bower_components/bootstrap/dist/js',
                        src: 'bootstrap.js',
                        dest: 'src/built/public/',
                        expand: true
                    }]
                },
                prod: {
                    files: [{
                        cwd: 'bower_components/jquery/',
                        src: 'jquery.js',
                        dest: 'src/built/public/',
                        expand: true
                    }, {
                        cwd: 'bower_components/bootstrap/dist/js/',
                        src: 'bootstrap.js',
                        dest: 'src/built/public/',
                        expand: true
                    }]
                },

            }, 
            // ### grunt-contrib-concat
            // concatenate multiple JS files into a single file ready for use
            concat: {
                dev: {
                    nonull: true,
                    dest: 'src/built/scripts/vendor-dev.js',
                    src: [
                        'bower_components/jquery/jquery.js',
                        'bower_components/bootstrap/dist/js/bootstrap.js'
                    ]
                },

                prod: {
                    nonull: true,
                    dest: 'src/built/scripts/vendor.js',
                    src: [

                        'bower_components/jquery/jquery.js',
                        'bower_components/bootstrap/dist/js/bootstrap.js'

                    ]
                }
            },
             // ### grunt-contrib-uglify
            // Minify concatenated javascript files ready for production
            uglify: {
                prod: {
                    options: {
                        sourceMap: true
                    },
                    files: {
                        'src/built/public/jquery.min.js': 'src/built/public/jquery.js', 
                        'src/built/public/bootstap.min.js': 'src/built/public/bootstrap.js', 
						'src/built/scripts/vendor.min.js': 'src/built/scripts/vendor.js'                                              
                    }
                }

            },
                     

});

// Originated with issue #547 grunt/grunt.
// Load all grunt tasks
// Find all of the task which start with `grunt-` and load them, rather than explicitly declaring them all
// require('matchdep').filterDev(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);
// Matchdep is a plugin - Install through node package manager

Object.keys(require('./package.json').devDependencies).forEach(function(devDep) {
  if(devDep.substring(0,6) == "grunt-") {
    grunt.loadNpmTasks(devDep);
  }
});

 // Check documentation http://gruntjs.com/api/grunt.task
grunt.registerTask('default', ['jshint','jscs','copy','concat','uglify']);

};
// Export the configuration
module.exports = configureGrunt;