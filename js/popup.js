// function refreshUserConfigToView() {
//   var keys = {};
//   var results = {}
//   chrome.storage.local.get(keys, function(result){results = result;console.log(result);});
// }

// // function saveUserConfig(key, value) {
// //   var item = {[key]:value};
// //   alert(item['dsa']);
// //   chrome.storage.local.set(item);
// //   // refreshUserConfigToView();
// // }

// function saveUserConfig(key, value) {
//   // 使用 Chrome 扩展程序的存储 API 保存它。
//   chrome.storage.local.set({[key]: value}, function() {
//     // 通知保存完成。
//     console.log({[key]: value});
//   });
//   chrome.storage.local.get(null, function(results) {
//     for(var result in results){
//       console.log("获取 : ", result, " -> ", results[result]);
//     } 
//   });
// }

// var submit = document.getElementById("button_submit");
// submit.addEventListener("click", function(){
//   button_key = document.getElementById("button_key");
//   button_value = document.getElementById("button_value")
//   button_submit.onclick = saveUserConfig(button_key.value, button_value.value);
// });


function initView() {
  chrome.storage.local.get(null, function(results) {
    for(var result in results){
      console.log("获取 : ", result, " -> ", results[result]);
      addHeadersToHTML(result, results[result]);
    } 
  });
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
}

initView();