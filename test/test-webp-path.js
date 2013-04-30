/*global describe, it, after */
'use strict';

var assert = require('assert');
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;

describe('webp-bin', function () {
    after(function () {
        fs.unlinkSync('test/test.webp');
    });

    it('should return WebP help', function (cb) {
        var binPath = require('../lib/webp-bin').path;

        exec(binPath, function (err, stdout, stderr) {
            assert(stdout.toString().indexOf('cwebp') !== -1);
            cb();
        });
    });

    it('should successfully proxy WebP', function (cb) {
        var binPath = path.join(__dirname, '../bin/webp-bin');

        exec('node ' + binPath, function (err, stdout, stderr) {
            assert(stdout.toString().indexOf('cwebp') !== -1);
            cb();
        });
    });

    it('should encode a .png', function (cb) {
        var binPath = path.join(__dirname, '../bin/webp-bin');
        var args = [
            path.join(__dirname, 'fixtures', 'test.png'),
            '-o', path.join(__dirname, 'test.webp')
        ];

        exec('node ' + binPath + ' ' + args.join(' '), function () {
            var actual = fs.statSync('test/test.webp').size;
            var original = fs.statSync('test/fixtures/test.png').size;
            assert(actual < original);
            cb();
        });
    });
});