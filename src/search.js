const fs = require('fs')
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
let tableData

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
  const str = input.toLowerCase()
  if (str == 'u' || str == 't' || str == 'o') {
    fileName = str.trim()
  } else {
    console.log(chalk`\n{red.bold Plese enter the correct selection..}\n`);
    search()
  }
}

const storeSelectedField = (field) => {
  const str = field.toLowerCase()
  // Load fields from chosen file to validate? 'This field does not exist in the the file you've selected. You may want to run zendesk fields to confirm and try again' Or, show fields when file selected
  if (str == '') {
    console.log(chalk`{red.bold Please enter a field name}`);
    search()
  } else {
    fieldName = str.trim()
  }
}

const storeSearchQuery = (string) => {
  const str = string.toLowerCase()
  if (str == '') {
    console.log(chalk`{red.bold Please enter a search query}`)
    search()
  } else {
    searchQuery = str.trim()
  }
}

const searchData = () => {
  if (fileName == 'u') { // Only read file selected
    fileName = 'Users'
    resultsHeader(fieldName, searchQuery, fileName)
    readFileExtractData(userData)
  }
  else if (fileName == 't') {
    fileName = 'Tickets'
    resultsHeader(fieldName, searchQuery, fileName)
    readFileExtractData(ticketData)
  } else if (fileName == 'o') {
    fileName = 'Organizations'
    resultsHeader(fieldName, searchQuery, fileName)
    readFileExtractData(organizationData)
  }
}

const readFileExtractData = (file) => {
  fs.readFile(file, (err, data) => {
    if (err) throw err
    const objArr = JSON.parse(data)
    objArr.filter(obj => {
      for (const [key, value] of Object.entries(obj)) {
        if (key == fieldName && value == searchQuery) {
          for (const [key, value] of Object.entries(obj)) {
            if (Array.isArray(value)) {     // If any of object keys is an array, loop through and display in table
              value.forEach((e) => {
                obj[key] += e
              })
            }
          }
          tableData = obj
          if (Object.entries(tableData).length >= 1) {
            displayData(tableData)
          } else {
            console.log('There are no results for this search...');
            quitMessage()
          }
        }
      }
    })
    quitMessage()
  })
}

const resultsHeader = (field, query, file) => {
  console.log(chalk`{blue.bold -----------------------------------------}`)
  console.log(chalk`{blue.bold Search results for ${field}: '${query}' in the ${file} file:\n}`)
}

const displayData = (result) => {
  const table = new Table({
    head: ['Field', 'Value'],
    colWidths: [25, 55],
    style: { 'padding': 0 },
    wordWrap: true
  })
  // If multiple results, press key to continue
  for (const properties of Object.entries(result)) {
    table.push(
      properties
    )
  }
  console.log(table.toString());
}