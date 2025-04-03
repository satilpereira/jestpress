#!/usr/bin/env node

import { program } from 'commander'
import { promisify } from 'util'
import path from 'path'
import { fileURLToPath } from 'url'
import ncp from 'ncp'
import { exec } from 'child_process'
import fs from 'fs'
import { Spinner } from 'cli-spinner'
import chalk from 'chalk'
import { verifyRouteFormat } from './helpers/verifyRouteFormat.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ncpAsync = promisify(ncp)
const execAsync = promisify(exec)

program.version('0.0.1-pre_alpha')

// Handle application creation
program
  .command('create [projectName]')
  .alias('c')
  .description(
    'Create a new application in the specified directory or the current directory if not provided',
  )
  .action(async (projectName = '.') => {
    const sourcePath = path.join(__dirname, 'app')
    const destinationPath = path.join(process.cwd(), projectName)

    console.log(
      chalk.blue(
        `🛈 Creating ${
          projectName === '.' ? 'the current directory' : projectName
        }...`,
      ),
    )

    // Use ncp to copy the content of the app directory
    try {
      await ncpAsync(sourcePath, destinationPath, {
        clobber: false, // Do not overwrite existing files
        stopOnErr: true, // Stop on the first error encountered
      })

      console.log(chalk.green('✓ Application files copied successfully!'))

      // Rename .npmignore to .gitignore
      const npmignorePath = path.join(destinationPath, '.npmignore')
      const gitignorePath = path.join(destinationPath, '.gitignore')
      await fs.promises.rename(npmignorePath, gitignorePath)

      // Change the working directory to the destination path
      process.chdir(destinationPath)

      const spinner = new Spinner({
        text: '\x1b[34m' + 'Installing dependencies, please wait...',
        onTick: function (msg) {
          this.clearLine(this.stream)
          this.stream.write(msg)
        },
      })
      spinner.setSpinnerString(18)

      // Logs("Installing dependencies, please wait...");
      spinner.start()

      // Run npm install
      await execAsync('npm install')

      // Stop the spinner
      spinner.stop(true)

      console.log(chalk.green('✓ Application created successfully!'))
      console.group()
      console.log(chalk.blue.bold('To get started, try running:'))

      // If different folder, add folder name to command
      if (projectName !== '.') {
        console.log(chalk.blue.bold(`cd ${projectName}`))
      }
      console.log(chalk.blue.bold('npm run dev'))
      console.groupEnd()
    } catch (error) {
      console.error(chalk.red('⚠️ Error creating application:', error.message))
    }
  })

// Handle route creation
program
  .command('route')
  .argument('<apiRoute>', 'The route to create')
  .description('Create a new route')
  .option('-d, --delete', 'Create a DELETE route')
  .option('-doc, --documentation', 'Create a documentation file')
  .option('-g, --get', 'Create a GET route')
  .option('-pa, --patch', 'Create a PATCH route')
  .option('-p, --post', 'Create a POST route')
  .option('-u, --put', 'Create a PUT route')
  .option('-t, --test', 'Create a test file')
  .option('-v, --version <char>', 'API version')
  .action(async (apiRoute, options) => {
    const methods = ['get', 'post', 'patch', 'delete', 'put']
    const selectedMethods = methods.filter(method => options[method])

    // Check if more than one method is selected
    if (selectedMethods.length > 1) {
      console.error(chalk.red('⚠️ Please select only one HTTP method.'))
      return
    }

    // Default to GET if no method is selected
    const method = (selectedMethods[0] || 'get').toUpperCase()

    // Default to v1 if no version is specified
    const apiVersion = 'v' + (options.version || '1')

    // Verify if route is in the correct format
    const routeFormat = verifyRouteFormat(apiRoute)
    if (routeFormat === 0) {
      console.error(chalk.red('⚠️ Invalid route format.'))
      return
    }

    console.log(
      `${method} /api/${apiVersion}/${
        apiRoute.startsWith('/') ? apiRoute.slice(1) : apiRoute
      } ${routeFormat === 1 ? '(OpenAPI)' : ''}`,
    )
  })
  .on('--help', () => {
    console.log(`
Examples:
  jestpress route users --post                         # Creates a POST route for /api/v1/users
  jestpress route posts/{postId}/comments --get        # Creates a GET route for /api/v1/posts/{postId}/comments
  jestpress route comments/{commentId} --delete        # Creates a DELETE route for /api/v1/comments/{commentId}

Default Behavior:
  If no options are specified, the route will default to a GET route. Only one method option can be used at a time.
  If no version is specified, the route will default to v1.
  `)
  })

program.parse(process.argv)
