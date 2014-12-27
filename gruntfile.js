module.exports = function(grunt){

grunt.initConfig({
	 jscs: {
            
        client: {
            src: ['gruntfile.js', 'src/js/*.js'],
            options: {
             config: '.jscsrc'

            }
        }
        // You can add more configurations over here
      }
})

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

 grunt.registerTask('default', ['jscs']);
 // Check documentation http://gruntjs.com/api/grunt.task 
};