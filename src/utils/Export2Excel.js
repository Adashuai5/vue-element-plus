/* eslint-disable */
import FileSaver from 'file-saver'
import XLSX from 'xlsx'


/**
* 导出表格为 excel 格式
* param { Dom } id            // document.getElementById('table')
* param { string } fileName    // test.xlsx
  * param { Boolean } rawBool 纯文本解析将不会解析值
*/

export function exportExcelByDom(id, fileName, rawBool = true) {
  /**
  * element-ui fixed 是生成两个 table，一个固定
  * 判断要导出的节点中是否有 fixed 的表格
  * 如果有，转换 excel 时先将该 dom 移除，然后 append 回去
  */
  const fix = document.querySelector('.el-table__fixed') || document.querySelector('.el-table__fixed-right');
  let wb;
  /**
  * 从表生成工作簿对象
  */
  if (fix) {
    wb = XLSX.utils.table_to_book(document.getElementById(id).removeChild(fix), { raw: rawBool });
    document.getElementById(id).appendChild(fix);
  } else {
    wb = XLSX.utils.table_to_book(document.getElementById(id), { raw: rawBool });
  }

  /* 获取二进制字符串作为输出 */
  const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
  try {
    /**
    * Blob 对象表示一个不可变、原始数据的类文件对象。
    * Blob 表示的不一定是JavaScript原生格式的数据。
    * File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
    * 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
    * 设置导出文件名称
    */
    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName)

  } catch (e) {

    if (typeof console !== 'undefined') console.log(e, wbout)

  }
  return wbout
}

/**
* Export2Excel.js
* param { Array } th            // ['姓名']
* param { Array } keyArray      // ['name']
  * param { Array } jsonData    // 处理好的所有数据
*/

export function export_json_to_excel(th, keyArray, jsonData, defaultTitle) {

  /* original data */
  let data = jsonData.map(v => keyArray.map(j => v[j]));
  data.unshift(th);
  let ws_name = "SheetJS";

  let wb = new Workbook(), ws = sheet_from_array_of_arrays(data);


  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' });
  let title = defaultTitle || '导出数据'
  FileSaver(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), title + ".xlsx")
};


function generateArray(table) {
  let out = [];
  let rows = table.querySelectorAll('tr');
  let ranges = [];
  for (let R = 0; R < rows.length; ++R) {
    let outRow = [];
    let row = rows[R];
    let columns = row.querySelectorAll('td');
    for (let C = 0; C < columns.length; ++C) {
      let cell = columns[C];
      let colspan = cell.getAttribute('colspan');
      let rowspan = cell.getAttribute('rowspan');
      let cellValue = cell.innerText;
      if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

      //Skip ranges
      ranges.forEach(function (range) {
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
          for (let i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
        }
      });

      //Handle Row Span
      if (rowspan || colspan) {
        rowspan = rowspan || 1;
        colspan = colspan || 1;
        ranges.push({ s: { r: R, c: outRow.length }, e: { r: R + rowspan - 1, c: outRow.length + colspan - 1 } });
      }
      ;

      //Handle Value
      outRow.push(cellValue !== "" ? cellValue : null);

      //Handle Colspan
      if (colspan) for (let k = 0; k < colspan - 1; ++k) outRow.push(null);
    }
    out.push(outRow);
  }
  return [out, ranges];
};

function datenum(v, date1904) {
  if (date1904) v += 1462;
  let epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts) {
  let ws = {};
  let range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
  for (let R = 0; R != data.length; ++R) {
    for (let C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      let cell = { v: data[R][C] };
      if (cell.v == null) continue;
      let cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      }
      else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s) {
  let buf = new ArrayBuffer(s.length);
  let view = new Uint8Array(buf);
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

export function export_table_to_excel(id, name) {
  let theTable = document.getElementById(id);
  console.log('a')
  let oo = generateArray(theTable);
  let ranges = oo[1];

  /* original data */
  let data = oo[0];
  let ws_name = "SheetJS";
  console.log(data);

  let wb = new Workbook(), ws = sheet_from_array_of_arrays(data);

  /* add ranges to worksheet */
  // ws['!cols'] = ['apple', 'banan'];
  ws['!merges'] = ranges;

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' });

  FileSaver(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), name)
}