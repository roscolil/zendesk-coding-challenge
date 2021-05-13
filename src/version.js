export async function version() {
  const packageJSON = require('../package.json')
  console.log(packageJSON.version);
  console.log(packageJSON.description);
  console.log(packageJSON.author);
}

export default version