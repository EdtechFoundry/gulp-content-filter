var chai = require('chai');
var File = require('vinyl');
var contentFilter = require('../');

describe('contentFilter()', function () {
    'use strict';

    describe('include', function () {
        it('should only include files that matches the regex', function (cb) {
            var contentFilterParams = {};

            //Only include files whos content matches this regex
            contentFilterParams.include = new RegExp('//include me!\\s');

            var stream = contentFilter(contentFilterParams);
            var buffer = [];

            stream.on('data', function (file) {
                buffer.push(file);
            });

            stream.on('end', function () {
                chai.expect(buffer.length).to.equal(1);
                cb();
            });

            stream.write(new File({path: 'file1.js', contents: new Buffer('//include me!\n')}));
            stream.write(new File({path: 'file2.js', contents: new Buffer('//exclude me!\n')}));

            stream.end();
        });
    });

    describe('exclude', function () {
        it('should exclude files that matches the regex', function (cb) {
            var contentFilterParams = {};

            //Exclude files whos content matches this regex
            contentFilterParams.exclude = new RegExp('//exclude me!\\s');

            var stream = contentFilter(contentFilterParams);
            var buffer = [];

            stream.on('data', function (file) {
                buffer.push(file);
            });

            stream.on('end', function () {
                chai.expect(buffer.length).to.equal(1);
                cb();
            });

            stream.write(new File({path: 'file1.js', contents: new Buffer('//include me!\n')}));
            stream.write(new File({path: 'file2.js', contents: new Buffer('//exclude me!\n')}));

            stream.end();
        });
    });

    describe('include + exclude', function () {
        it('should include files that passes both checks', function (cb) {
            var contentFilterParams = {};

            contentFilterParams.include = new RegExp('//include me!\\s');
            contentFilterParams.exclude = new RegExp('//exclude me!\\s');

            var stream = contentFilter(contentFilterParams);
            var buffer = [];

            stream.on('data', function (file) {
                buffer.push(file);
            });

            stream.on('end', function () {
                chai.expect(buffer.length).to.equal(2);
                cb();
            });

            stream.write(new File({path: 'file1.js', contents: new Buffer('//include me!\n')}));
            stream.write(new File({path: 'file2.js', contents: new Buffer('//exclude me!\n')}));
            stream.write(new File({path: 'file3.js', contents: new Buffer('//include me!\n')}));

            stream.end();
        });
    });
});