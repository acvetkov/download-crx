/**
 * @author https://github.com/acvetkov
 * @overview Download crx from Chrome WebStore
 */

import fs from 'fs';
import path from 'path';

import _ from 'lodash';
import got from 'got';
import URI from 'urijs';

const URL_PATTERN = 'https://clients2.google.com/service/update2/crx?response=redirect&prodversion=38.0&x=id%3D[EXTENSION_ID]%26installsource%3Dondemand%26uc';
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36';

const headers = {
    'User-Agent': USER_AGENT,
    'Referer': 'https://chrome.google.com'
};

/**
 * Download extension from Chrome WebStore
 * @param {String} extensionUrl
 * @param {String} savePath
 * @param {String} extensionName
 * @returns {Promise}
 */
export function download(extensionUrl, savePath = __dirname, extensionName = 'extension') {
    const extensionId = extractExtensionId(extensionUrl);
    return downloadById(extensionId, savePath, extensionName);
}

/**
 * Download extension by chrome webstore item id
 * @param {String} extensionId
 * @param {String} savePath
 * @param {String} extensionName
 * @returns {Promise}
 */
export function downloadById(extensionId, savePath = __dirname, extensionName = 'extension') {
    const options = {
        headers
    };
    const filePath = path.resolve(savePath, `${extensionName}.crx`);
    return new Promise((resolve, reject) => {
        got.stream(URL_PATTERN.replace('[EXTENSION_ID]', extensionId), options)
            .pipe(fs.createWriteStream(filePath))
            .on('finish', () => resolve(filePath))
            .on('error', reject)
    });
}

/**
 * @param {String} extensionUrl
 * @returns {String}
 */
export function extractExtensionId(extensionUrl) {
    const path = new URI(extensionUrl).pathname();
    if (path.indexOf('/webstore/detail') !== 0) {
        throw new Error('Invalid extensionUrl. Correct url format: https://chrome.google.com/webstore/detail/[name]/[id] or https://chrome.google.com/webstore/detail/[id]');
    }
    return _.last(path.split('/'));
}
