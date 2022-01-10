const fs = require('fs');
const path = require('path');
const glob = require('glob');

const SRC_ICONS_DIR = path.resolve(__dirname, '../../node_modules/tdesign-icons-vue/lib/components');

const files = glob.sync(`${SRC_ICONS_DIR}/**/*.js`);

const icons = files.map(file => path.basename(file).replace('.js', ''));

// console.log(icons);

fs.writeFile(path.resolve(__dirname, '../../examples/icon_td.json'), JSON.stringify(icons), () => {});
