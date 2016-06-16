## download crx

tool for downloading crx files from Chrome Webstore

### how to

install

```bash
npm install download-crx
```

Usage as npm-module

```js
import * as downloadCRX from 'download-crx';

downloadCRX.download('https://chrome.google.com/webstore/detail/{item-id}')
    .then(filePath => log(`crx is located in ${filePath}`));
    
downloadCRX.download('https://chrome.google.com/webstore/detail/{item-id}', __dirname, 'extension-custom-name')
    .then(filePath => log(`crx is located in ${filePath}`));    
    
downloadCRX.downloadById('{item-id}')
    .then(filePath => log(`crx is located in ${filePath}`));    
```

Usage as cli tool

```bash
download-crx --url https://chrome.google.com/webstore/detail/{item-id} --name my-extension
```
