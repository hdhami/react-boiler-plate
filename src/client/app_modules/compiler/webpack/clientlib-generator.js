const glob = require('glob');
const path = require('path');
const fs = require('fs');

const config = require('./build-config');

const ROOT_PATH = `${config.paths.rootPathRelativeToCompiler}`;
const CLIENTLIB_PATH = `${config.paths.outputBasePath}`;
const CLIENTLIB_CATEGORY_NS = 'clientlib.adminui.';

const GLOB_PATTERN = '**/*.clientlibrc';

const SOURCE_DIR = path.join(__dirname, ROOT_PATH, '/app/');

const findFiles = (globPattern, sourceDir) =>
    glob.sync(globPattern, {
        cwd: sourceDir,
        relative: false
    });

const files = findFiles(GLOB_PATTERN, SOURCE_DIR);

files.forEach(file => {
    const clientlibSupportNameSpace = file.split(path.sep).reverse()[0];
    const clientlibSupportFileName = clientlibSupportNameSpace
        ? clientlibSupportNameSpace.replace('.clientlibrc', '')
        : '';

    if (clientlibSupportFileName && clientlibSupportFileName.indexOf('.js') > -1) {
        const folderName = clientlibSupportFileName.replace('.js', '');
        const categories = `[${CLIENTLIB_CATEGORY_NS}${folderName}]`;
        const fileContent = clientlibSupportFileName.replace('.js', '.min.js');
        const xmlFileContent = `<?xml version="1.0" encoding="UTF-8"?>\n<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" jcr:primaryType="cq:ClientLibraryFolder" allowProxy="{Boolean}true" categories="${categories}" />`;
        fs.writeFileSync(`${path.join(__dirname, CLIENTLIB_PATH, folderName)}/js.txt`, fileContent);
        fs.writeFileSync(`${path.join(__dirname, CLIENTLIB_PATH, folderName)}/.content.xml`, xmlFileContent);
    } else {
        const folderName = clientlibSupportFileName;
        const categories = `[${CLIENTLIB_CATEGORY_NS}${folderName}]`;
        const xmlFileContent = `<?xml version="1.0" encoding="UTF-8"?>\n<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" jcr:primaryType="cq:ClientLibraryFolder" allowProxy="{Boolean}true" categories="${categories}" />`;
        fs.writeFileSync(`${path.join(__dirname, CLIENTLIB_PATH, folderName)}/.content.xml`, xmlFileContent);
    }
});
