gulp-hsp-compiler
=================

## Usage

In your `gulpfile.js`:

```javascript
var gulp = require('gulp');
var hsp = require('gulp-hsp-compiler');

gulp.task('default', function() {

    //compile & copy
    gulp.src('src/**/*.hsp')
        .pipe(hsp())
        .pipe(gulp.dest('dist'));

});
```