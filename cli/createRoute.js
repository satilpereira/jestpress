/**
 * Registers the 'route' command for Jestpress CLI.
 * @param {import('commander').Command} program - Commander program instance.
 * @param {string} cliDir - Directory of the CLI runner.
 */
import chalk from 'chalk'
import { verifyRouteFormat } from '../helpers/verifyRouteFormat.js'

export default function registerCreateRouteCommand(program, cliDir) {
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

      if (selectedMethods.length > 1) {
        console.error(chalk.red('⚠️ Please select only one HTTP method.'))
        return
      }

      const method = (selectedMethods[0] || 'get').toUpperCase()
      const apiVersion = 'v' + (options.version || '1')

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
}
