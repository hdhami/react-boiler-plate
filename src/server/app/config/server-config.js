const PORT = 3001;
const ROOT_PATH = './';
const path = require('path');

const PAGE_SOURCE_PATH = path.join(ROOT_PATH, 'app/html/page-source');

module.exports = { PORT, ROOT_PATH, PAGE_SOURCE_PATH };
