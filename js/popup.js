function saveUserConfig(key, value) {
  // 判断空
  if(key == ""){
    alert("键不能为空");
    return;
  }
  if(value == ""){
    alert("值不能为空");
    return;
  }
  // 使用 Chrome 扩展程序的存储 API 保存它。
  chrome.storage.local.set({[key]: value}, function() {
    // 通知保存完成。
    console.log("已经保存 : ", key, value);
  });
  addHeadersToHTML(key, value);
  clearInput();
}

function initView() {
  clearTable();
  chrome.storage.local.get(null, function(results) {
    for(var result in results){
      // console.log("获取 : ", result, " -> ", results[result]); 
      addHeadersToHTML(result, results[result]);
    }
    var deleteHeaders = document.getElementsByClassName("deleteHeader");
    row_number = deleteHeaders.length
    for(var i = 0; i < row_number; i++){
      deleteHeaders[i].onclick = function(){
        id_number = parseInt(this.getAttribute("id"));
        deleteTableRow(id_number);
      };
    }
  });
}

function clearTable() {
  var table = document.getElementById("table_result"); //获得表格
  var trs = table.getElementsByTagName("tr");
  for(var i = trs.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }
}

function deleteTableRow(id_number) {
  var row = document.getElementById(id_number);
  //删除逻辑 : 
  key = row.parentNode.parentElement.childNodes[0].innerHTML;
  removeHeader(key);
  //删除View : 
  var table = document.getElementById("table_result"); //获得表格
  var tbody = table.getElementsByTagName("tbody")[0]
  var tr = row.parentNode.parentNode;
  tbody.removeChild(tr);
}

function addHeadersToHTML(key, value) {
  var table = document.getElementById("table_result"); //获得表格
  var row_number = table.rows.length;//表格当前的行数
  table.insertRow(row_number);
  //插入键
  table.rows[row_number].insertCell(0);
  table.rows[row_number].cells[0].innerHTML = key;
  //插入值
  table.rows[row_number].insertCell(1);
  table.rows[row_number].cells[1].innerHTML = value;
  //插入操作
  table.rows[row_number].insertCell(2);
  table.rows[row_number].cells[2].innerHTML = "<button class=\"deleteHeader\" id=\"" + row_number + "\">删除</button>";
}

function clearInput() {
  button_key = document.getElementById("button_key");
  button_value = document.getElementById("button_value");
  button_key.value = "";
  button_value.value = "";
}

function clearAllHeaders() {
  chrome.storage.local.clear(function(){
    console.log("所有键值对都被清除!");
  });
  initView(); // 刷新视图
}

function removeHeader(key) {
  chrome.storage.local.remove(key, function(){
    console.log("键值对", key, "被清除!");
  });
}

initView();
var submit = document.getElementById("button_submit");
submit.addEventListener("click", function(){
  button_key = document.getElementById("button_key");
  button_value = document.getElementById("button_value");
  button_submit.onclick = saveUserConfig(button_key.value, button_value.value);
});

var submit = document.getElementById("button_clear");
submit.addEventListener("click", function(){
  clearAllHeaders();
});


// var aaa = "hahahahah";
// console.log("aaa");
// //添加修改逻辑
// chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
//   //console.log(JSON.stringify(details));
//   var headers = details.requestHeaders,
//   blockingResponse = {};

//   // Each header parameter is stored in an array. Since Chrome
//   // makes no guarantee about the contents/order of this array,
//   // you'll have to iterate through it to find for the
//   // 'User-Agent' element


//   chrome.storage.local.get(null, function(results) {
//     for(var result in results){
//       headers[result] = results[result];
//       // console.log("获取 : ", result, " -> ", results[result]); 
//       // addHeadersToHTML(result, results[result]);
//     }
//     // var deleteHeaders = document.getElementsByClassName("deleteHeader");
//     // row_number = deleteHeaders.length
//     // for(var i = 0; i < row_number; i++){
//     //   deleteHeaders[i].onclick = function(){
//     //     id_number = parseInt(this.getAttribute("id"));
//     //     deleteTableRow(id_number);
//     //   };
//     // }
//   });

//   // for( var i = 0, l = headers.length; i < l; ++i ) {
//   //   if( headers[i].name == 'User-Agent' ) {
//   //     headers[i].value = '>>> Your new user agent string here <<<';
//   //     console.log(headers[i].value);
//   //     break;
//   //   }
//   //   // If you want to modify other headers, this is the place to
//   //   // do it. Either remove the 'break;' statement and add in more
//   //   // conditionals or use a 'switch' statement on 'headers[i].name'
//   // }

//   blockingResponse.requestHeaders = headers;
//   return blockingResponse;
// },
// {urls: [ "<all_urls>" ]},['requestHeaders','blocking']);
// console.log("aaa");