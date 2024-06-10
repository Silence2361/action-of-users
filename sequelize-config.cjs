require('dotenv').config();
const { createRequire } = require('module');
const require = createRequire(import.meta.url);
const { resolve } = require('path');
const { readFileSync } = require('fs');

const configPath = resolve(__dirname, './config/config.js');
const configContent = readFileSync(configPath, 'utf-8');

const config = new Function('exports', 'require', 'module', '__filename', '__dirname', configContent + '\nreturn module.exports;');
module.exports = config(exports, require, { exports: {} }, configPath, __dirname);
