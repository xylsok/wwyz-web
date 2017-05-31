// Generated on 2017-05-31 using generator-angular-fullstack 3.0.0-rc8
'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically, when needed
  require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        injector: 'grunt-asset-injector'
    });
    var appConfig = {
        client: require('./bower.json').appPath || 'client',
        dist: 'dist'
    };

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  var modRewrite = require('connect-modrewrite');

  // Define the configuration for all the tasks
  grunt.initConfig({
        yeoman: appConfig,
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            injectJS: {
                files: [
                    '<%= yeoman.client %>/{app,components}/**/*.js',
                    '!<%= yeoman.client %>/{app,components}/**/*.spec.js',
                    '!<%= yeoman.client %>/{app,components}/**/*.mock.js',
                    '!<%= yeoman.client %>/app/app.js'],
                tasks: ['injector:scripts']
            },
            injectCss: {
                files: [
                    '<%= yeoman.client %>/{app,components}/**/*.css'
                ],
                tasks: ['injector:css']
            },
            js: {
                files: ['<%= yeoman.client %>/{app,components}/**/*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            styles: {
                files: ['<%= yeoman.client %>/{app,components}/**/*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.client %>/**/*.html',
                    '.tmp/**/*.css',
                    '<%= yeoman.client %>/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: '0.0.0.0',
                livereload: 35791
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            modRewrite([
                                '^/api/(.*)$ http://wankewang.cn:8082/api/$1 [P]',
								'^/auth/(.*)$ http://123.56.76.155:8080/api/$1 [P]',
								'^/uc3/(.*)$ http://123.56.76.155:8307/$1 [P]',
                                '^[^\\.]*$ /index.html']),
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./client/bower_components')
                            ),
                            connect().use(
                                '/client/{app,components}/**/*.css',
                                connect.static('./client/{app,components}/**/*.css')
                            ),
                            connect.static(appConfig.client)
                        ];
                    }
                }
            }
        },
        injector: {
            options: {},
            scripts: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('/client/', '');
                        filePath = filePath.replace('/.tmp/', '');
                        return '<script src="' + filePath + '"></script>';
                    },
                    starttag: '<!-- injector:js -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    '<%= yeoman.client %>/index.html': [
                        ['{.tmp,<%= yeoman.client %>}/{app,components}/**/*.js',
                            '!{.tmp,<%= yeoman.client %>}/app/app.js',
                            '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.spec.js',
                            '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js']
                    ]
                }
            },
            css: {
                options: {
                    transform: function (filePath) {
                        filePath = filePath.replace('/client/', '');
                        filePath = filePath.replace('/.tmp/', '');
                        return '<link rel="stylesheet" href="' + filePath + '">';
                    },
                    starttag: '<!-- injector:css -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    '<%= yeoman.client %>/index.html': [
                        '<%= yeoman.client %>/{app,components}/**/*.css'
                    ]
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.client %>/{app,components}/**/*.js'
                ]
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server: '.tmp'
        },
        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            server: {
                options: {
                    map: true
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/',
                    src: '**/*.css',
                    dest: '.tmp/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/',
                    src: '**/*.css',
                    dest: '.tmp/'
                }]
            }
        },
        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['<%= yeoman.client %>/index.html'],
                ignorePath: /\.\.\//
            }
        },
        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/{app,components}/**/*.js',
                    '<%= yeoman.dist %>/**/*.css',
                    '<%= yeoman.dist %>/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.dist %>/assets/fonts/*'
                ]
            }
        },
        useminPrepare: {
            html: '<%= yeoman.client %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },
        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/**/*.html'],
            css: ['<%= yeoman.dist %>/**/*.css'],
            js: ['<%= yeoman.dist %>/{app,components}/**/*.js'],
            options: {
                assetsDirs: [
                    '<%= yeoman.dist %>',
                    '<%= yeoman.dist %>/assets/images',
                    '<%= yeoman.dist %>/assets/fonts'
                ],
                patterns: {
                    js: [[/(assets\/images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
                }
            }
        },
        //imagemin: {
        //    dist: {
        //        files: [{
        //            expand: true,
        //            cwd: '<%= yeoman.client %>/assets/images',
        //            src: '**/*.{png,jpg,jpeg,gif}',
        //            dest: '<%= yeoman.dist %>/assets/images'
        //        }]
        //    }
        //},
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', '{views}/**/*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/',
                    src: '*/**.js',
                    dest: '.tmp/concat/'
                }]
            }
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.client %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'bower_components/**/*',
                        '{app,components}/**/*.html',
                        'assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
                        'download/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/assets/images',
                    dest: '<%= yeoman.dist %>/assets/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: 'client/bower_components/bootstrap/dist',
                    src: 'fonts/*',
                    dest: '<%= yeoman.dist %>/'
                }, {
                    expand: true,
                    cwd: 'client/bower_components/font-awesome',
                    src: 'fonts/*',
                    dest: '<%= yeoman.dist %>/'
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.client %>/{app,components,bower_components}',
                dest: '.tmp/',
                src: '**/*.css'
            }
        },
        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles'
                //,
                //'imagemin'
            ]
        }
    });
    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }
        grunt.task.run([
            'clean:server',
            'wiredep',
            'concurrent:server',
            'injector',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });
    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });
    grunt.registerTask('local', [
        'clean:server',
        'wiredep',
        'concurrent:server',
        'injector',
        'autoprefixer',
        'connect:livereload',
        'watch'
    ]);
    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
    grunt.registerTask('default', [
        'build'
    ]);
};
