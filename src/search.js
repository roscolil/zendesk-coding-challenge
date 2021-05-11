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
let noOfResults = 0

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
  const str = input
  if (str == 'u' || str == 't' || str == 'o') {
    fileName = str.trim().toString().toLowerCase()
  } else {
    console.log(chalk`\n{red.bold Plese enter the correct selection..}\n`);
    search()
  }
}

const storeSelectedField = (field) => {
  const str = field
  if (str == '') {
    console.log(chalk`{red.bold Please enter a field name}`);
    search()
  } else {
    fieldName = str.trim().toString().toLowerCase()
  }
}

const storeSearchQuery = (string) => {
  const str = string
  if (str == '') {
    console.log(chalk`{red.bold Please enter a search query}`)
    search()
  } else {
    searchQuery = str.trim().toString().toLowerCase()
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
        if (key.toString().toLowerCase() == fieldName && value.toString().toLowerCase() == searchQuery) {
          for (const [key, value] of Object.entries(obj)) {
            if (Array.isArray(value)) {     // If any of object keys is an array, loop through and display in table
              value.forEach((e) => {
                obj[key] += e
              })
            }
          }
          tableData = obj
          displayData(tableData)
          noOfResults++
        }
      }
    })
    console.log(chalk`{blue.bold There are ${noOfResults} search results}\n`);
    quitMessage()
    noOfResults = 0
  })
}

const resultsHeader = (field, query, file) => {
  console.log(chalk`{blue.bold -----------------------------------------}`)
  console.log(chalk`{blue.bold Search results for '${field}: ${query}' in the ${file} file:\n}`)
}

const displayData = (result) => {
  const table = new Table({
    head: ['Field', 'Value'],
    colWidths: [25, 55],
    style: { 'padding': 0 },
    wordWrap: true
  })

  for (const properties of Object.entries(result)) {
    table.push(
      properties
    )
  }
  console.log(table.toString());
}