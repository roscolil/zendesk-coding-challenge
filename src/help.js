import chalk from 'chalk'

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
  // TODO may need a quit option in menu otherwise delete
  search: `search()`,
  viewfields: `viewFields()`
  // TODO add search help function here??
}

export async function help(args) {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]
  console.log(menus[subCmd] || menus.main)
}