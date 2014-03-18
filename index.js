var hspCompiler = require('hashspace').compiler;
var through = require('through2');
var PluginError = require('gulp-util').PluginError;

module.exports = function() {

    function processHspFile(file, enc, cb){

        if(file.isStream()){
            this.emit('error', new PluginError('gulp-hsp', 'Streaming not supported'));
            return cb();
        }

        if(file.isBuffer()){
            try {
                var compileResult = hspCompiler.compile(String(file.contents), file.path);
                if (!compileResult.errors.length) {
                    file.contents = new Buffer(compileResult.code);
                    file.path = file.path + '.js';
                } else {
                    var err = compileResult.errors[0];
                    var errorMsg = 'Compilation error in "'+ file.path +'" at ' + err.line + ':' + err.column + ': ' + err.description;
                    this.emit('error', new PluginError('gulp-hsp', errorMsg));
                }
            } catch(e) {
                this.emit('error', e);
            }
        }

        this.push(file);
        cb();
    }

    return through.obj(processHspFile);
}
