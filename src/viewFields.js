let fs = require('fs')
const path = require('path')
const dataFolder = path.join(__dirname, '../data/')

export async function viewFields() {
  try {
    readDataDirectory()
  } catch (error) {
    console.log(error);
  }
}

const readDataDirectory = () => {
  fs.readdir(dataFolder, (err, files) => {
    if (err) throw err
    files.forEach(file => {
      fs.readFile(dataFolder + file, (err, data) => {
        console.log('-------------------------------');
        console.log('Search ' + capitalize(file.split('.').slice(0, -1).join('.')) + ' with:\n'); // TODO capitalize file names
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
