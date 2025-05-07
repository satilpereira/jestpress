#!/usr/bin/env node

/**
 * Jestpress CLI entry point.
 * Registers commands and handles CLI arguments.
 * @module runner
 */

import { program } from 'commander'
import path from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
import registerCreateAppCommand from './cli/createApp.js'
import registerCreateRouteCommand from './cli/createRoute.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const packageJsonPath = path.join(__dirname, 'package.json')
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))

const version = packageJson.version

program.version(
  version,
  '-v, --version',
  'Output the current version of jestpress',
)

// Register CLI commands
registerCreateAppCommand(program, __dirname)
registerCreateRouteCommand(program, __dirname)

// Parse CLI arguments
program.parse(process.argv)
