# gulp-content-filter

[![Greenkeeper badge](https://badges.greenkeeper.io/EdtechFoundry/gulp-content-filter.svg)](https://greenkeeper.io/)
Gulp plugin to filter by file content

## Usage

```javascript

var gulp = require('gulp');
var contentFilter = require('gulp-content-filter');

//Only filter files matching this filename, this is optional
var contentFilterParams = {
    pattern: /\.spec\.js$/
};

//Only include files whos content matches this regex
contentFilterParams.include = new RegExp('//include me!\\s');

//Exclude files whos content matches this regex
contentFilterParams.exclude = new RegExp('//exclude me!\\s');

gulp.src('./**/*.js')
    .pipe(contentFilter(contentFilterParams)
    .pipe(allYourOtherPlugins());
    
```