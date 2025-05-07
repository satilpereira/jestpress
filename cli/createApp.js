/**
 * Registers the 'create' command for Jestpress CLI.
 * @param {import('commander').Command} program - Commander program instance.
 * @param {string} cliDir - Directory of the CLI runner.
 */
import path from 'path'
import ncp from 'ncp'
import { promisify } from 'util'
import fs from 'fs'
import { Spinner } from 'cli-spinner'
import chalk from 'chalk'

const ncpAsync = promisify(ncp)

/**
 * Register the create command.
 */
export default function registerCreateAppCommand(program, cliDir) {
  program
    .command('create [projectName]')
    .alias('c')
    .description(
      'Create a new application in the specified directory or the current directory if not provided',
    )
    .action(async (projectName = '.') => {
      const sourcePath = path.join(cliDir, 'app')
      const destinationPath = path.join(process.cwd(), projectName)

      console.log(
        chalk.blue(
          `🛈 Creating ${
            projectName === '.' ? 'the current directory' : projectName
          }...`,
        ),
      )

      try {
        await ncpAsync(sourcePath, destinationPath, {
          clobber: false,
          stopOnErr: true,
        })

        console.log(chalk.green('✓ Application files copied successfully!'))

        // Rename .npmignore to .gitignore
        const npmignorePath = path.join(destinationPath, '.npmignore')
        const gitignorePath = path.join(destinationPath, '.gitignore')
        await fs.promises.rename(npmignorePath, gitignorePath)

        process.chdir(destinationPath)

        const spinner = new Spinner({
          text: '\x1b[34m' + 'Installing dependencies, please wait...',
          onTick: function (msg) {
            this.clearLine(this.stream)
            this.stream.write(msg)
          },
        })
        spinner.setSpinnerString(18)
        spinner.start()

        // Run npm install
        const { exec } = await import('child_process')
        const { promisify } = await import('util')
        const execAsync = promisify(exec)
        await execAsync('npm install')

        spinner.stop(true)

        console.log(chalk.green('✓ Application created successfully!'))
        console.group()
        console.log(chalk.blue.bold('To get started, try running:'))
        if (projectName !== '.') {
          console.log(chalk.blue.bold(`cd ${projectName}`))
        }
        console.log(chalk.blue.bold('npm run dev'))
        console.groupEnd()
      } catch (error) {
        console.error(
          chalk.red('⚠️ Error creating application:', error.message),
        )
      }
    })
}
