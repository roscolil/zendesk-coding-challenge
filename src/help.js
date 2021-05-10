import chalk from 'chalk'
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

const menus = {
  main: `
  ${chalk.blueBright('--------------------------------------------------------------------\n')}
  ${chalk.blueBright('Zendesk CLI search application')}
  ${chalk.blueBright('Query the JSON data by using the following command line format below')}
  ${chalk.blueBright('--------------------------------------------------------------------\n')}
  ${chalk.greenBright('zendesk [command]\n')} 
  ${chalk.greenBright('e.g. $ zendesk fields\n')} 
  ${chalk.redBright('Commands:')}
  ${chalk.redBright('fields')} ...................... to view a list of searchable fields
  ${chalk.redBright('search')} ...................... to search JSON data
  ${chalk.redBright('version')} ..................... to show app version
  `,
  search: `search()`,
  viewfields: `viewFields()`
}

export async function help(args) {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]
  console.log(menus[subCmd] || menus.main)
  rl.close()
}