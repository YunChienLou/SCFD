import XLSX from "xlsx";
// JSONData爲導出的json數據,fileName爲導出的文件名,title爲導出的第一行標題,filter爲過濾字段,rowLength爲標題長度
export function JSONToExcelConvertor(
  JSONData,
  FileName,
  title,
  filter,
  rowlength
) {
  if (!JSONData) {
    return;
  }
  // 轉化json爲object
  var arrData = typeof JSONData !== "object" ? JSON.parse(JSONData) : JSONData;

  var excel = '<table id="expoetTable">';

  // 設置表頭
  var row = "<tr>";
  if (title) {
    // 使用標題項
    for (let index = 0; index < title.length; index++) {
        row += "<th align='center'>" + title[i] + "</th>"; // 將標題新增到row中
    }
  } else {
    // 不使用標題項
    for (var i in arrData[0]) {
      row += "<th align='center'>" + i + "</th>";
    }
  }

  excel += row + "</tr>";
  // 設置數據
  for (let index1 = 0; index < arrData.length; index1++) {
    if (index1 === arrData.length - 1) {
      row = "<tr>";
    } else {
     row = "";
    }
    for (var index in arrData[i]) {
      // 判斷是否有過濾行
      if (filter) {
        var value = "";
        if (filter.indexOf(index) === -1) {
          // 過濾掉符合關鍵字的數據
          for (var k = 0; k < arrData.length / rowlength; k++) {
            // 循環到一個標題長度換一次行,否則數組會在一行
            if (i === rowlength - 1) {
              for (var j = k * rowlength; j < (k + 1) * rowlength; j++) {
                if (
                  arrData[j].type === "radio-group" ||
                  arrData[j].type === "checkbox-group" ||
                  arrData[j].type === "select"
                ) {
                  // 如果爲這三種格式,則他們的值儲存在values中
                  var groupLenght = arrData[j].values.length;
                  for (var q = 0; q < groupLenght; q++) {
                    if (arrData[j].values[q].selected === true) {
                      // 獲取被選中的值
                      value = value + arrData[j].values[q].label;
                    }
                  }
                } else {
                  value = arrData[j].value == null ? "" : arrData[j].value;
                }
                row += `<td>` + value + "</td>";
                value = "";
              }
            }
            excel += row + "</tr>";
            row = "";
          }
        }
      } else {
        // 不過濾的邏輯
        // var value = arrData[i][index] == null ? '' : arrData[i][index]
        // // eslint-disable-next-line quotes
        // row += "<td align='center'>" + value + '</td>'
      }
    }
  }

  excel += "</table>";
  var objE = document.createElement("div"); // 因爲我們這裏的數據是string格式的,但是js-xlsx需要dom格式,則先新建一個div然後把數據加入到innerHTML中,在傳childNodes[0]即使dom格式的數據
  objE.innerHTML = excel;
  var sheet = XLSX.utils.table_to_sheet(objE.childNodes[0], { raw: true }); // 將一個table對象轉換成一個sheet對象,raw爲true的作用是把數字當成string,身份證不轉換成科學計數法
  openDownloadDialog(sheet2blob(sheet, FileName), FileName + ".xlsx");
}

// 將一個sheet轉成最終的excel文件的blob對象，然後利用URL.createObjectURL下載
function sheet2blob(sheet, sheetName) {
  sheetName = sheetName || "sheet1"; // 不存在sheetName時使用sheet1代替
  var workbook = {
    SheetNames: [sheetName],
    Sheets: {},
  };
  workbook.Sheets[sheetName] = sheet; // 生成excel的配置項

  var wopts = {
    bookType: "xlsx", // 要生成的文件類型
    bookSST: false, // 是否生成Shared String Table，官方解釋是，如果開啓生成速度會下降，但在低版本IOS設備上有更好的兼容性
    type: "binary", // 二進制格式
  };
  var wbout = XLSX.write(workbook, wopts);
  var blob = new Blob([s2ab(wbout)], {
    type: "application/octet-stream",
  }); // 字符串轉ArrayBuffer
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
  return blob;
}
// 下載的方法
function openDownloadDialog(url, saveName) {
  if (typeof url === "object" && url instanceof Blob) {
    url = URL.createObjectURL(url); // 創建blob地址
  }
  var aLink = document.createElement("a");
  aLink.href = url;
  aLink.download = saveName || ""; // HTML5新增的屬性，指定保存文件名，可以不要後綴，注意，file:///模式下不會生效
  var event;
  if (window.MouseEvent) event = new MouseEvent("click");
  else {
    event = document.createEvent("MouseEvents");
    event.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
  }
  aLink.dispatchEvent(event);
}
