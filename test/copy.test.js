'use strict';

const path = require('path');
const test = require('tape');
const fs = require('fs-extra');
const copy = require('../lib/copy');

const log = require('../lib/utils').log;
log.setLevel('error');

const test_title = '[copy.js] ';

test(
  test_title +
  'copy theme directory to output directory',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/copy/copy-to-output-directory');
    process.chdir(TEST_PATH);
    copy({ theme: 'oceandeep', output: 'dist' });

    t.equal(fs.existsSync(path.resolve(process.cwd(), 'dist')), true);
    t.equal(fs.existsSync(path.resolve(process.cwd(), 'dist', 'index.html')), true);
    fs.removeSync(path.resolve(process.cwd(), 'dist'));
    t.end();
  }
);

test(
  test_title +
  'excludes .template files',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/copy/excludes-template-files');
    process.chdir(TEST_PATH);
    copy({ theme: 'oceandeep', output: 'dist' });

    t.equal(fs.existsSync(path.resolve(process.cwd(), 'dist')), true);
    t.equal(fs.existsSync(path.resolve(process.cwd(), 'dist', 'index.template')), false);
    fs.removeSync(path.resolve(process.cwd(), 'dist'));
    t.end();
  }
);
