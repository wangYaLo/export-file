
// const exportExecl = require('./exportExecl/version1.0.0')
// const utils = require('../shared/utils')
// const toFormat = require('../shared/toFormat')
// console.log("%cexportFile", "color: yellow; font-style: italic; background-color: blue;padding: 20px; font-size: 30px;transition-property: 'all';transition-duration: 3000");
// function exportFile(options = {}) {
//     this.name = 'exportFile';
//     this.course = options.course;
//     Object.defineProperty(exportFile.prototype, 'exportExecl', {
//         get: function () {
//             if (this.course) {
//                 const str = require('../json/exportExecl.json').str
//                 this.logBox(str)
//             }
//             return exportExecl
//         },
//         enumerable: true,
//         configurable: true
//     })
// }
// Object.assign(exportFile.prototype, utils);
// Object.defineProperty(exportFile.prototype, Symbol.toStringTag, {
//     value: 'exportFile',   
//     enumerable: false,
//     writable: true
// })
// function proxy (target, sourceKey, key) {

// }
// module.exports = exportFile

const exportExecl = require('./exportExecl/index');
const table_to_sheet = require('./table_to_sheet');
const XLSX = require('./xlsx-style')
const exportFile = {
    exportExecl,
    table_to_sheet,
    XLSX
}

module.exports = exportFile;