
module.exports = function(grunt) {
    var baseDir = 'tasks/views';
    var tmpls = baseDir + '/*';

    grunt.initConfig({
        nunjucks: {
            precompile: {
                baseDir: baseDir,
                src: tmpls,
                destDir: 'tasks/output'
            }
        },

        watch: {
            nunjucks: {
                files: tmpls,
                tasks: ['nunjucks']
            }
        }
    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
