'use strict';

function setGlobalInclude(dirPath) {
    global.base_dir = dirPath;
    global.abs_path = (path) => base_dir + path;

    global.include = function(file) {
        if (file.indexOf('/') === -1) return require(file);
        return require(abs_path('/' + file));
    }
}

module.exports = {
    setGlobalInclude
};