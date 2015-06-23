var through = require('through2');
var gutil = require('gulp-util');

function fileMatches(file, regex) {
    if (file.isNull()) {
        return true;
    }

    if (file.isStream()) {
        throw new gutil.PluginError('Stream not supported');
    }

    var data = file.contents.toString();

    return regex.test(data);
}

module.exports = function (params) {
    return through.obj(function (file, enc, callback) {
        var shouldPass = true;

        if (!(params.pattern instanceof RegExp)) {
            params.pattern = /.*/;
        }

        //Only filter files matching the pattern
        if (params.pattern.test(file.path)) {
            if (params.include && params.exclude) {
                shouldPass = fileMatches(file, params.include) && !fileMatches(file, params.exclude);
            }
            else if (params.include) {
                shouldPass = fileMatches(file, params.include);
            }
            else if (params.exclude) {
                shouldPass = !fileMatches(file, params.exclude);
            }
        }

        if (shouldPass) {
            this.push(file);
        }
        return callback();
    });

};
