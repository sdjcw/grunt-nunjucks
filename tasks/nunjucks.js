/*
 * grunt-nunjucks
 * https://github.com/jlongster/nunjucks-grunt
 *
 * Copyright (c) 2013 James Long
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    var nunjucks = require('nunjucks');
    var lib = require('nunjucks/src/lib');

    grunt.registerMultiTask('nunjucks', 'Render nunjucks', function () {
        var data =  this.data.options && this.data.options.data;
        this.files.forEach(function (f) {
            var src = f.src.filter(function (filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).forEach(function(filepath) {
                var filename = filepath;
                if (f.baseDir) {
                    if (f.baseDir.substr(-1) !== '/') {
                        // Append a trailing slash, if there isn't one.
                        f.baseDir += '/';
                    }
                    if (filepath.substr(0, f.baseDir.length) === f.baseDir) {
                        // Strip leading `baseDir` from filename.
                        filename = filepath.substr(f.baseDir.length);
                    }
                }
                var result = nunjucks.render(filepath, data);
                grunt.file.write(f.destDir + '/' + filename, result);
                grunt.log.writeln('File "' + f.destDir + '/' + filename + '" created.');
            });
        });
    });
};
