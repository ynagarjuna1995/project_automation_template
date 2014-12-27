module.exports = function(grunt){

grunt.initConfig({

	pkg: grunt.file.readJSON('package.json'),
	//  allows us to refer to the values of properties within our package.json (Refer:http://gruntjs.com/sample-gruntfile)

	// ### grunt-contrib-jshint
	// Linting rules, run as part of `grunt validate`. See [grunt validate](#validate) and its subtasks for
	// more information.
	jshint :{

				client: {
						src: ['gruntfile.js','src/js/client/**/.js'], // Specify Paths for js files for client side part in the array
						options: {
							config: 'src/client/.jshintrc' // Add globals in the .client_jshintrc file if you are using frameworks like angularjs,emberjs,backbonejs
						}
				},
				server: {
						src: ['src/js/server/**/.js'], //Specify paths for js files for server side (nodejs) in the array
						options:{
							config: '.jshintrc'
						}
				}
	},
	// ### grunt-jscs
	// Code style rules, run as part of `grunt validate`. See [grunt validate](#validate) and its subtasks for
	// more information.
	//for more information and detailed explanation about jscs options check : http://jshint.com/docs/options/
	 jscs :{

        client: {
            src: ['gruntfile.js', 'src/js/client/**/*.js'],
            options: {
             config: '.jscsrc'
					},
				},
				server: {
					//	main: index.js,  // main is optional specify your server side javascript nodejs files
						src: ['src/js/server/**/.js'],
						options:{
							config: '.jscsrc'
				  	}
				}
	}
        // You can add more configurations over here
});

Object.keys(require('./package.json').devDependencies).forEach(function(devDep) {
  if(devDep.substring(0,6) == "grunt-") {
    grunt.loadNpmTasks(devDep);
  }
});

//Originated with issue #547 grunt/grunt.
// Load all grunt tasks
// Find all of the task which start with `grunt-` and load them, rather than explicitly declaring them all
// require('matchdep').filterDev(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);
//matchdep is a plugin - Install through node package manager

 grunt.registerTask('default', ['jshint','jscs']);
 // Check documentation http://gruntjs.com/api/grunt.task
};
