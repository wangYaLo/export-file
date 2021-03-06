


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
    const optionsKeys = require('../../json/exportExecl.json').optionsKeys;
    Object.keys(options).forEach((key) => {
      if (!optionsKeys[key]) console.warn('options没有' + key + '这个property');
    })
    let data = options.data;
    let fileName = options.fileName;
    let tableHeader = options.tableHeader;
    let style = options.style || {};
    let mimeType = '.' + (options.mimeType || 'xlsx');
    return new Promise((reslove, reject) => {
      if (isDOMString) {
        console.time('export time')
        if (Object.keys(style).length) {
          throw new Error('原生dom不支持style属性')
        }
        try {
          const str = `<table  border="1"><tobody>${data}</tobody></table>`
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
          reject(error)
        }
      } else {
        console.time('export time')
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
            let newStr = ''
            for (const key in item) {
              newStr += (`<td  style="mso-number-format:\\@;${bodyStyle}">` + (item[key] || '') + '</td>')
            }
            tableTr += '<tr>' + newStr + '</tr>';
          })

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
})
module.exports = exportExecl;