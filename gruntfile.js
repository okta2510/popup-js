module.exports = function(grunt) {


	const sass = require('node-sass');
	const Fiber = require('fibers');
	require('load-grunt-tasks')(grunt);
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here

    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Gruntfile.js', 'assets/**/*.js']
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
      },
      build: {
        files: {
          'assets/js/main.min.js': 'assets/js/main.js'
        }
      }
    },

		sass: {
			options: {
				implementation: sass,
				sourceMap: true,
				compress:true,
				fiber: Fiber,
				banner:'oktaviardi.com'
			},
			dist: {
				files: {
					'assets/css/main.css': 'assets/sass/main.scss'
				},
			}
		},


    // configure watch to auto update ----------------
    watch: {
      // for stylesheets, watch css and less files
      // only run less and cssmin
      stylesheets: {
      files: ['assets/sass/*.scss','assets/img/**','assets/js/main.js'],
      tasks: ['sass','cssmin','uglify','usebanner'] },

      // for scripts, run jshint and uglify
      scripts: {
        files: ['assets/js/main.js'], tasks: ['sass','cssmin','uglify','usebanner']
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
            src : [
                'assets/sass/*.scss',
                'assets/css/*.css',
                '*.html'
            ]
        },
        options: {
						port: 8200,
            watchTask: true,
            server: './'
        }
      }
    },

		usebanner: {
	    taskName: {
	      options: {
	        position: 'top',
	        banner: '/* \n ============###============\n author : oktaviardi pratama \n project : elevania \n website:oktaviardi.com \n contact : me@oktaviardi.com \n phone : 081210161816 \n updated : <%= grunt.template.today("yyyy-mm-dd") %> \n ============###============\n*/\n\n',
	        linebreak: true
	      },
	      files: {
	        src: [ 'assets/css/main.css' ,'assets/js/main.min.js' ]
	      }
	    }
  },

	cssmin: {
	  options: {
	    mergeIntoShorthands: false,
	    roundingPrecision: -1
	  },
	  target: {
	    files: {
	      'assets/css/main.css': ['assets/css/main.css']
	    }
	  }
	}


  });



    // ============= // CREATE TASKS ========== //
  grunt.registerTask('default', ['browserSync','watch']);
  grunt.registerTask('css', ['sass']);


  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-banner');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

};
