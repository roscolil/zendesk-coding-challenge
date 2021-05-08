import chalk from 'chalk'
import { search } from './search'
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

export async function quitMessage() {   // TODO put this in correct place
  rl.question(chalk`\n{blue.bold Type 'quit' to exit or 'more' to do another search}\n`, (input) => {
    if (input == 'quit') {
      closeApp()    // TODO check this
    } else if (input == 'more') {
      console.clear()
      search()
    }
  })
}

const closeApp = () => {
  rl.on('close', () => {
    console.log(chalk`\n{blue.bold Bye Bye..}`)
    process.exit(0)
  })
  rl.close()
  setInterval(() => {
    console.clear()
  }, 3000);
}