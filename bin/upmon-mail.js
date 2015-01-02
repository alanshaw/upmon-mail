#!/usr/bin/env node
var upmonMail = require('../')
process.stdin.pipe(upmonMail()).pipe(process.stdout)
