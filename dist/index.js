var str = "简易使用\nlet exportExecl = new exportFile().exportExecl;\nisDOM: boolean;传入的数据是否为dom\ndata: {[key: string]: string}[];数据格式\nfilename: string;下载的文件名称\ntableHeader:{[key: string]: string}[]表头,长度为1\nlet options: {\n  data,\n  filename\n  tableHeader\n}\nexportExecl(isDOM, options).then(() => {\n成功回调\n}).catch((error) => {\n失败回调\n})\n更多options配置请看文档";
var optionsKeys = {
	data: "传入的数据",
	fileName: "下载的文件名称",
	tableHeader: "表头数据",
	style: "样式",
	mimeType: "下载的文件类型"
};
var styleKeys = {
	color: "文字颜色",
	background: "背景颜色",
	border: "边框"
};
var exportExecl$1 = {
	str: str,
	optionsKeys: optionsKeys,
	styleKeys: styleKeys
};

var exportExecl$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    str: str,
    optionsKeys: optionsKeys,
    styleKeys: styleKeys,
    'default': exportExecl$1
});

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var require$$0 = getCjsExportFromNamespace(exportExecl$2);

/**
  * @param { boolean }isDOMString 判断是否传入的数据是否为dom类型的字符串
  * @param { {[key: string]: string | number}[] }data 传入的数据
  * @param { string }fileName 下载的execl文件的文件名
  * @param { string[] }tableHeader execl的表头
  * @param {{ 
  *           data: {[key: string]: string | number}[];
  *           fileName: string;
  *           tableHeader: string[];
  *           style: { [key: string]: any }
  *         }}options
  * @returns { Promise<boolean> }
*/
function exportExecl(isDOMString, options) {
    const optionsKeys = require$$0.optionsKeys;
    Object.keys(options).forEach((key) => {
      if (!optionsKeys[key]) console.warn('options没有' + key + '这个property');
    });
    let data = options.data;
    let fileName = options.fileName;
    let tableHeader = options.tableHeader;
    let style = options.style || {};
    let mimeType = '.' + (options.mimeType || 'xlsx');
    return new Promise((reslove, reject) => {
      if (isDOMString) {
        console.time('export time');
        if (Object.keys(style).length) {
          throw new Error('原生dom不支持style属性')
        }
        try {
          const str = `<table  border="1"><tobody>${data}</tobody></table>`;
          const blob = new Blob([str], { type: 'application/vnd.ms-powerpoint;charset=utf-8' });
          const link = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.download = fileName + mimeType;
          a.href = link;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          reslove(console.timeEnd('export time'));
        } catch (error) {
          reject(error);
        }
      } else {
        console.time('export time');
        try {
          let tableTr = '';
          let headerStyle = '';
          let bodyStyle = '';
          if (Object.keys(style).length) {
            if (style.header) Object.keys(style.header).forEach(key => headerStyle += key + ':' + style.header[key] + ';');
            if (style.body) Object.keys(style.body).forEach(key => bodyStyle += key + ':' + style.body[key] + ';');
          }

          if (tableHeader.length) {
            if (Object.keys(data[0]).length !== tableHeader.length) reject('表头数组长度与表格数组长度不符合');
            tableHeader.forEach((item) => tableTr += (`<td style="${headerStyle}">` + item + '</td>'));
            tableTr = `<tr>` + tableTr + '</tr>';
          }

          data.forEach((item) => {
            let newStr = '';
            for (const key in item) {
              newStr += (`<td  style="mso-number-format:\\@;${bodyStyle}">` + (item[key] || '') + '</td>');
            }
            tableTr += '<tr>' + newStr + '</tr>';
          });

          const str = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
          xmlns:x="urn:schemas-microsoft-com:office:excel" 
          xmlns="http://www.w3.org/TR/REC-html40">
          <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
          <x:Name>${ fileName }</x:Name>
          <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
          </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
          </head><body><table style="border: 1"><tobody>${ tableTr }</tobody></table></body></html>`;

          let blob = null;
          if (mimeType === '.xlsx') {
            blob = new Blob([str], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
          } else if (mimeType === '.xls') {
            blob = new Blob([str], { type: 'application/vnd.ms-excel;charset=utf-8' });
          }
          const link = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.download = fileName + mimeType;
          a.href = link;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          reslove(console.timeEnd('export time'));
        } catch (error) {
          reject(error);
        }
      }
    })
}
Object.defineProperty(exportExecl.prototype, Symbol.toStringTag, {
    value: 'exportExecl',   
    enumerable: false,
    writable: true
});
var exportExecl_1 = exportExecl;

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

console.log("%cexportFile", "color: yellow; font-style: italic; background-color: blue;padding: 20px; font-size: 30px;transition-property: 'all';transition-duration: 3000");
function exportFile(options = {}) {
    this.name = 'exportFile';
    this.course = options.course;
    Object.defineProperty(exportFile.prototype, 'exportExecl', {
        get: function () {
            if (this.course) {
                const str = require$$0.str;
                this.logBox(str);
            }
            return exportExecl_1
        },
        enumerable: true,
        configurable: true
    });
}
Object.assign(exportFile.prototype, utils);
Object.defineProperty(exportFile.prototype, Symbol.toStringTag, {
    value: 'exportFile',   
    enumerable: false,
    writable: true
});
var core = exportFile;

export { core as default };
