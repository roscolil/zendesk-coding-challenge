let fs = require('fs')
import chalk from 'chalk'
const path = require('path')
const dataFolder = path.join(__dirname, '../data/')

export async function viewFields() {
  try {
    readDataDirectory()
  } catch (error) {
    console.log(error);
  }
}
// TODO selection to display fields at any time
const readDataDirectory = () => {
  fs.readdir(dataFolder, (err, files) => {
    if (err) throw err
    files.forEach(file => {
      fs.readFile(dataFolder + file, (err, data) => {
        if (err) throw err
        console.log(chalk`{blue.bold -------------------------------}`)
        console.log(chalk`{yellow.bold Search ${capitalize(file.split('.').slice(0, -1).join('.'))} with:}\n`)
        const obj = JSON.parse(data)
        for (const key in obj[0]) {
          console.log(key)
        }
      })
    })
  })
}

const capitalize = (string) => {
  return string[0].toUpperCase() + string.substr(1).toLowerCase()
}
