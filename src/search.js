let fs = require('fs')
import chalk from 'chalk'
import Table from 'cli-table3'
import { quitMessage } from './quit'
const path = require('path')
const readline = require('readline')
const userData = path.join(__dirname, '../data/users.json')
const ticketData = path.join(__dirname, '../data/tickets.json')
const organizationData = path.join(__dirname, '../data/organizations.json')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let fileName
let fieldName
let searchQuery


// ------------------- Main search function ------------------- //
export async function search() {
  console.log(chalk`{blue.bold -----------------------------------------}`)
  rl.question(chalk`\n{blue.bold Select: \n\t(u) to search Users\n\t(t) to search Tickets or\n\t(o) to search Oganizations\n}\n`, (input) => {
    storeSelectedFile(input)
    rl.question(chalk`\n{blue.bold Enter field you want to search by:}\n`, (field) => {
      storeSelectedField(field)
      rl.question(chalk`\n{blue.bold Enter search string:}\n`, (query) => {
        storeSearchQuery(query)
        searchData()
      })
    })
  })
}

// Store user inputs and validate entry before pushing to arrray
const storeSelectedFile = (input) => {
  let str = input.toLowerCase()
  if (str == 'u' || str == 't' || str == 'o') {
    fileName = str.trim()
  } else {
    console.log(chalk`\n{red.bold Plese enter the correct selection..}\n`);
    search()
  }
}

const storeSelectedField = (field) => {
  // let str = field.toLowerCase()
  // Load fields from chosen file to validate? 'This field does not exist in the the file you've selected. You may want to run zendesk fields to confirm and try again'
  if (field == '') {
    console.log(chalk`{red.bold Please enter a field name}`);
    search() // TODO or add question again here.
  } else {
    fieldName = field.trim()
  }
}

const storeSearchQuery = (string) => {
  // let str = string.toLowerCase()
  if (string == '') {
    console.log(chalk`{red.bold Please enter a search query}`)
    search()
  } else {
    searchQuery = string.trim()
  }
}

const searchData = () => {
  console.log(chalk`{blue.bold -----------------------------------------}`)
  console.log(chalk`{blue.bold Search results for ${fieldName} in ${fileName} file:\n}`)
  if (fileName == 'u') { // Only read file selected
    fileName = 'Users'
    fs.readFile(userData, (err, data) => {
      if (err) throw err
      const objArr = JSON.parse(data)
      const result = objArr.filter(obj => {
        for (const [key, value] of Object.entries(obj)) {
          if (key == fieldName && value == searchQuery) {
            return obj
          }
        }
      })
      console.log(result)
      quitMessage()
    })
  } else if (fileName == 't') {
    fileName = 'Tickets'
    fs.readFile(ticketData, (err, data) => {
      if (err) throw err
      const objArr = JSON.parse(data)
      const result = objArr.filter(obj => {
        for (const [key, value] of Object.entries(obj)) {
          if (key == fieldName && value == searchQuery) {
            return obj
          }
        }
      })
      console.log(result)
      quitMessage()
    })
  } else if (fileName == 'o') {
    fileName = 'Organizations'
    fs.readFile(organizationData, (err, data) => {
      if (err) throw err
      const objArr = JSON.parse(data)
      const result = objArr.filter(obj => {
        for (const [key, value] of Object.entries(obj)) {
          if (key == fieldName && value == searchQuery) {
            return obj
          }
        }
      })
      console.log(result)
      quitMessage()
    })
  }
}



// TODO cli-table3 function here

// TODO would try/catch work ok for any of these?
