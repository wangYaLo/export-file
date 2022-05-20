/**
  * @param { boolean }isDOMString 判断是否传入的数据是否为dom类型的字符串
  * @param { {[key: string]: string | number}[] }data 传入的数据
  * @param { string }fileName 下载的execl文件的文件名
  * @param { string[] }tableHeader execl的表头
  * @param { {
  * data: {[key: string]: string | number}[];
  * fileName: string;
  * tableHeader: {[key: string]: string | number}[];
  * } }options
  * @returns { Promise<string> }
*/
function exportExecl$2(isDOMString, options) {
    let data = options.data;
    let fileName = options.fileName;
    let tableHeader = options.tableHeader;
    return new Promise((reslove, reject) => {
      if (isDOMString) {
        try {
          const str = `<table  border="1"><tobody>${data}</tobody></table>`;
          const blob = new Blob([str], { type: 'application/vnd.ms-powerpoint;charset=utf-8' });
          const link = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.download = fileName + '.xlsx';
          a.href = link;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          reslove('success');
        } catch (error) {
          reject('export execl error', error);
        }
      } else {
        console.time('time to export execl');
        try {
          let tableTr = '';
          if (tableHeader.length) {
            if (Object.keys(data[0]).length !== tableHeader.length) reject('表头数组长度与表格数组长度不符合');
            tableHeader.forEach((item) => {
              tableTr += ('<td>' + item + '</td>');
            });
            tableTr = '<tr>' + tableTr + '</tr>';
          }
          data.forEach((item) => {
            let newStr = '';
            for (const key in item) {
              if (item[key] === null) {
                newStr += ('<td  style="mso-number-format:\\@;">' + '' + '</td>');
              } else {
                newStr += ('<td  style="mso-number-format:\\@;">' + item[key] + '</td>');
              }
            }
            tableTr += '<tr>' + newStr + '</tr>';
          });
          const str = `<table  border="1"><tobody>${tableTr}</tobody></table>`;
          const blob = new Blob([str], { type: 'application/vnd.ms-excel;charset=utf-8' });
          const link = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.download = fileName + '.xls';
          a.href = link;
          document.body.appendChild(a);
          a.click();
          console.timeEnd('time to export execl');
          document.body.removeChild(a);
          reslove('success');
        } catch (error) {
          reject('export execl error', error);
        }
      }
    })
}
Object.defineProperty(exportExecl$2.prototype, Symbol.toStringTag, {
    value: 'exportExecl',   
    enumerable: false,
    writable: true
});
var exportExecl_1 = exportExecl$2;

var getType = function (input) {
    if (typeof input === 'string') return 'string';
    if (Object.prototype.toString.call(input) === "[object Array]") return 'array';
};
var logBox = function (value) {
    console.log("%c" + value, "color: blue; font-style: italic;padding: 2px;");
};

var utils = {
	getType: getType,
	logBox: logBox
};

var str = "简易使用\nlet exportExecl = new exportFile().exportExecl;\nisDOM: boolean;传入的数据是否为dom\ndata: {[key: string]: string}[];数据格式\nfilename: string;下载的文件名称\ntableHeader:{[key: string]: string}[]表头,长度为1\nlet options: {\n  data,\n  filename\n  tableHeader\n}\nexportExecl(isDOM, options).then(() => {\n成功回调\n}).catch((error) => {\n失败回调\n})\n更多options配置请看文档";
var exportExecl = {
	str: str
};

var exportExecl$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  str: str,
  'default': exportExecl
});

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var require$$0 = getCjsExportFromNamespace(exportExecl$1);

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
});
Object.defineProperty(exportFile.prototype, 'exportExecl', {
    get: function () {
        if (this.log) {
            const str = require$$0.str;
            this.logBox(str);
        }
        return exportExecl_1
    },
    enumerable: true,
    configurable: true
});
var core = exportFile;

export { core as default };
