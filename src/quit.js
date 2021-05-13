import chalk from 'chalk'
import { search } from './search'
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

export async function quitMessage() {
  rl.question(chalk`\n{blue.bold Type 'quit' to exit or 'more' to do another search}\n`, (input) => {
    if (input == 'quit') {
      closeApp()
    } else if (input == 'more') {
      console.clear()
      search()
    } else {
      quitMessage()
    }
  })
}

const closeApp = () => {
  rl.on('close', () => {
    console.log(chalk`\n{blue.bold Bye Bye..}`)
    process.exit(0)
  })
  console.clear()
  rl.close()
}

export default quitMessage
