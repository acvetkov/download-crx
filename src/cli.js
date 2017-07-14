/**
 * @author acvetkov@yandex-team.ru
 * @overview cli interface
 */

import {ArgumentParser} from 'argparse';
import info from '../package.json';
import * as downloadUtils from './index';

const parser = new ArgumentParser({
    prog: info.name,
    description: info.description,
    version: info.version,
    addHelp: true,
    epilog: 'Chrome extensions autodeploy'
});

parser.addArgument(['-u', '--url'], {
    action: 'store',
    dest: 'url',
    required: true
});

parser.addArgument(['-n', '--name'], {
    action: 'store', 
    dest: 'name'
});

export default {
    download () {
        const args = parser.parseArgs();
        const savePath = process.cwd();

        return downloadUtils
          .download(args.url, savePath, args.name || 'extension')
          .then(filePath => console.log(`Saved in ${filePath}`))
          .catch(err => conole.log(err))
    }
};
