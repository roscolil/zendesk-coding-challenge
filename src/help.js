import chalk from 'chalk'

const menus = {
  main: `
  ${chalk.blueBright('Zendesk CLI search application')}
  ${chalk.blueBright('Search by following the below command line format')}
  ${chalk.blueBright('----------------------------------------------------\n')}
  ${chalk.greenBright('search [search string]')}
  `
}

export async function help(args) {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]
  console.log(menus[subCmd] || menus.main)
}