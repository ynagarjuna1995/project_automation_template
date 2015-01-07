	
var _              = require('lodash');
    path           = require('path'),
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
	// Allows us to refer to the values of properties within our package.json (Refer:http://gruntjs.com/sample-gruntfile)
	pkg: grunt.file.readJSON('package.json'),
            // ### grunt-contrib-watch
            // Watch files and livereload in the browser during development.
            // See the [grunt dev](#live%20reload) task for how this is used.
            watch: {
                shared: {
                	// **Note:** Shared folder contains Client Specfic 
                	// Assets,Libraries,Images,Settings etc.,
                	// Add specific path in the array to watch the changes
                    files: ['src/shared/**/*.js'],
                    tasks: ['concat:dev']
                },
                // LiveReload monitors changes in the file system. As soon as you save a file,and the browser is refreshed.
                // When you change a CSS file or an image, the browser is updated instantly without reloading the page.
                // Installing respective browser extensions is Optional
                // Check this for more info :
                // http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-
                livereload: {
                	// Add Specific pathin the array
                    files: [
                    	'src/css/**/*.css',
                    	'src/js/**/*.js',
                    	// IF you are not using any templating include source of html files
                    	// If you are using any tempating engine include source of html files
                    	// Including this will helps to reload the images 
                    	'src/**/*.html'  
                    ],
                    options: {
                        livereload: true
                    }
                },
               // express: {
               //     files:  ['core/server.js', 'core/server/**/*.js'],
               //     tasks:  ['express:dev'],
               //     options: {
                        // **Note:** Without this option specified express won't be reloaded
               //         nospawn: true
               //     }
               // } 
            },	

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
            // ### grunt-shell
            // Command line tools where it's easier to run a command directly than configure a grunt plugin
            shell: {
                // #### Run bower install
                // Used as part of `grunt init`. 
                bower: {
                    command: path.resolve(cwd + '/node_modules/.bin/bower --allow-root install'),
                    options: {
                        stdout: true,
                        stdin: false
                    }
                },

            },      

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


		//** Custom Tasks **

        // ### Init assets
        // `grunt init` - will run an initial asset build for you
        //
        // Grunt init runs `bower install` as well as the standard asset build tasks which occur when you run just
        // `grunt`. This fetches the latest client side dependencies, and moves them into their proper homes.
        //
        // This task is very important, and should always be run and when fetching down an updated code base just after
        // running `npm install`.
        //
        // `bower` does have some quirks, such as not running as root. If you have problems please try running
        // `grunt init --verbose` to see if there are any errors.
        grunt.registerTask('init', 'Prepare the project for development',
            ['shell:bower', 'default']);

        // ### Default asset build
        // `grunt` - default grunt task
        //
        // Compiles concatenates javascript files for the admin UI into a handful of files instead
        // of many files, and makes sure the bower dependencies are in the right place.
        grunt.registerTask('default', 'Build JS & templates for development',
            ['concat:dev', 'copy:dev']);

        // ### Live reload
        // `grunt dev` - build assets on the fly whilst developing
        //
        // If you want Ghost to live reload for you whilst you're developing, you can do this by running `grunt dev`.
        // This works hand-in-hand with the [livereload](http://livereload.com/) chrome extension.
        //
        // `grunt dev` manages starting an express server and restarting the server whenever core files change (which
        // require a server restart for the changes to take effect) and also manage reloading the browser whenever
        // frontend code changes.
        //
        // Note that the current implementation of watch only works with casper, not other themes.
        grunt.registerTask('dev', 'Dev Mode; watch files',
           ['default','watch']);        


};
// Export the configuration
module.exports = configureGrunt;