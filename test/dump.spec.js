var fs = require('fs');
var rmdir = require('rmdir');
var request = require('request');

var expect = require('chai').expect;
var sinon = require('sinon');

var dump = require('../src/dump');

describe('dump.js #integration', function () {
    var testFolder;

    beforeEach(function () {
        testFolder = __dirname + '/_freeze';
    });

    beforeEach(function (done) {
        fs.mkdir(testFolder, function () {
            done();
        });
    });

    afterEach(function (done) {
        rmdir(testFolder, function (err) {
            if (err) {
                console.log(err);
            }
            done();
        });
    });

    it ('should exist', function () {
        expect(dump).to.be.ok;
    });

    describe('when dumping to file system', function () {
        var dumpResults;

        beforeEach(function () {
            dump.initialize(fs, request);
        });

        describe ('dumping root url', function () {
            beforeEach (function (done) {
                dump.toFileSystem(testFolder, ['http://www.udacity.com/cs101x/index.html'], function (err, results) {
                    dumpResults = results;
                    done();
                });
            });

            it ('should index file created', function () {
                expect(fs.statSync(testFolder + '/index.html').isFile()).to.be.ok;
            });
        });
    });
});