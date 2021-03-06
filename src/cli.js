import minimist from 'minimist'
import { help } from './help'
import { quitMessage } from './quit'
import { version } from './version'
import { search } from './search'
import { viewFields } from './viewFields'

export async function cli(argsArray) {
  const args = minimist(argsArray.slice(2));
  let cmd = args._[0] || 'help';

  if (args.version || args.v) {
    cmd = 'version';
  }

  if (args.help || args.h) {
    cmd = 'help';
  }

  switch (cmd) {
    case 'version':
      version(args);
      quitMessage()
      break;

    case 'help':
      help(args);
      break;

    case 'search':
      search(args);
      break;

    case 'fields':
      viewFields(args);
      quitMessage()  // TODO showing before fields
      break;

    default:
      console.error(`"${cmd}" is not a valid command!`);
      break;
  }
}

export default cli