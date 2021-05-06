#!/usr/bin/env node

// Application entry point, pointing to cli function to accept input string
require = require('esm')(module)
require('./src/cli').cli(process.argv)