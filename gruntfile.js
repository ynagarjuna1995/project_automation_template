module.exports = function(grunt){


Object.keys(require('./package.json').devDependencies).forEach(function(devDep) {
  if(devDep.substring(0,6) == "grunt-") {
    grunt.loadNpmTasks(dep);
  }
});



	 // Load all grunt tasks
     // Find all of the task which start with `grunt-` and load them, rather than explicitly declaring them all
     // require('matchdep').filterDev(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);
     //matchdep is a plugin - Install through node package manager 
};