
const exportExecl = require('./exportExecl')
const utils = require('../shared/utils')
const toFormat = require('../shared/toFormat')
// console.log("%cexportFile", "color: yellow; font-style: italic; background-color: blue;padding: 20px; font-size: 30px;transition-property: 'all';transition-duration: 3000");
function exportFile(options = {}) {
    this.name = 'exportFile';
    this.log = options.log || true;
}
Object.assign(exportFile.prototype, utils);
Object.defineProperty(exportFile.prototype, Symbol.toStringTag, {
    value: 'exportFile',   
    enumerable: false,
    writable: true
})
Object.defineProperty(exportFile.prototype, 'exportExecl', {
    get: function () {
        if (this.log) {
            const str = require('../json/exportExecl.json').str
            this.logBox(str)
        }
        return exportExecl
    },
    enumerable: true,
    configurable: true
})
function proxy (target, sourceKey, key) {

}
module.exports = exportFile