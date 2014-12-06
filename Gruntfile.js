'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    clean: {
      src: ['assets/js/', 'assets/css/']
    },
    concat: {
      options: {
        separator: ';',
        stripBanners: true
      },
      dist: {
        src: ['source/scripts/shadowbox.js', 'source/scripts/app.js'],
        dest: 'assets/js/app.js'
      },
    },
    uglify: {
      options: {
        banner: ''
      },
      dist: {
        files: {
          'assets/js/app-min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'compressed',
          compass: true,
          sourcemap: 'none'
        },
        files: {                         // Dictionary of files
          'assets/css/main.css': 'source/sass/main.scss',       // 'destination': 'source'
          'assets/css/fonts.css': 'source/sass/fonts.scss'
        }
      }
    },
    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({browsers: 'last 1 version'}).postcss,
          require('csswring').postcss
        ]
      },
      dist: {
        src: 'assets/css/*.css'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');

  // Default task.
  grunt.registerTask('default', ['clean', 'sass', 'postcss', 'concat', 'uglify']);
};
