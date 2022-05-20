


/**
  * @param { boolean }isDOMString 判断是否传入的数据是否为dom类型的字符串
  * @param { {[key: string]: string | number}[] }data 传入的数据
  * @param { string }fileName 下载的execl文件的文件名
  * @param { string[] }tableHeader execl的表头
  * @returns { Promise<string> }
*/

function exportExecl(isDOMString, data, fileName = '配件查询', tableHeader = []) {
  return new Promise((reslove, reject) => {
    if (isDOMString) {
      try {
        const str = `<table  border="1"><tobody>${data}</tobody></table>`
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
        reject('export execl error', error)
      }
    } else {
      console.time('time to export execl')
      try {
        let tableTr = '';
        if (tableHeader.length) {
          if (Object.keys(data[0]).length !== tableHeader.length) reject('表头数组长度与表格数组长度不符合');
          tableHeader.forEach((item) => {
            tableTr += ('<td>' + item + '</td>')
          })
          tableTr = '<tr>' + tableTr + '</tr>';
        }
        data.forEach((item) => {
          let newStr = ''
          for (const key in item) {
            if (item[key] === null) {
              newStr += ('<td  style="mso-number-format:\\@;">' + '' + '</td>')
            } else {
              newStr += ('<td  style="mso-number-format:\\@;">' + item[key] + '</td>')
            }
          }
          tableTr += '<tr>' + newStr + '</tr>';
        })
        const str = `<table  border="1"><tobody>${tableTr}</tobody></table>`
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
Object.defineProperty(exportExecl.prototype, Symbol.toStringTag, {
    value: 'exportExecl',   
    enumerable: false,
    writable: true
})
module.exports = exportExecl;