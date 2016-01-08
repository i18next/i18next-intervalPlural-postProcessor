// plan to drop support for bower
//
// use:
// npm version patch && git push && npm publish


var gulp = require('gulp'),
    prompt = require('gulp-prompt'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    filter = require('gulp-filter'),
    tag_version = require('gulp-tag-version'),
    shell = require('gulp-shell'),
    argv = require('yargs').argv;

var pkg = require('./package.json');

function inc(version) {
  if (!version) return;

  var type, tag;

  if (version.indexOf('.') < 0) {
    if (version === 'major' || version === 'minor' || version === 'patch') {
      type = version;
    } else {
      tag = version;

      var parts = pkg.version.split('-');
      if (parts.length > 1) {
        var tagVersion = 0;
        var p = parts[1].split('.');
        if (p[0] === tag) tagVersion = parseInt(p[1], 10) + 1;
        version = parts[0] + '-' + tag  + '.' + tagVersion;
      } else {
        version = pkg.version + '-' + tag  + '.0';
      }
    }
  }

  function cb(obj) {
    var stream = new require('stream').Transform({objectMode: true});
    stream._transform = function(file, unused, callback) {
      obj();
      callback(null, file);
    };
    return stream;
  }

  // get all the files to bump version in
  return gulp.src(['./package.json', './bower.json'])
    // bump the version number in those files
    .pipe(type ? bump({type: type}) : bump({version: version}))
    // save it back to filesystem
    .pipe(gulp.dest('./'))

    // commit change
    .pipe(git.commit('bumps package version'))

    // read only one file to get the version number
    .pipe(filter('package.json'))
    // **tag it in the repository**
    .pipe(tag_version({prefix: ''}))

    // push tag
    .pipe(prompt.confirm({
        message: 'Push tag ' + version + ' to github?',
        default: false
    }))
    .pipe(cb(function() {
      git.push('origin','master', {args: ' --tags'}, function (err) {
        if (err) throw err;
      });
    }))

    // npm publish
    .pipe(prompt.confirm({
        message: 'publish ' + version + ' to npm?',
        default: false
    }))
    .pipe(shell([
      'npm publish --tag ' + (tag ? tag : 'latest')
    ]));
}

gulp.task('bump', function() { return inc(argv.v); });

gulp.task('publish', ['bump']);
