function saveUserConfig(key, value) {
  // 使用 Chrome 扩展程序的存储 API 保存它。
  chrome.storage.local.set({[key]: value}, function() {
    // 通知保存完成。
    console.log("已经保存 : ", key, value);
  });
  addHeadersToHTML(key, value);
  clearInput();
}

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
  //插入操作
  table.rows[row_number].insertCell(2);
  table.rows[row_number].cells[2].innerHTML = "<input type=\"submit\" value=\"删除\"/>";
}

function clearInput() {
  button_key = document.getElementById("button_key");
  button_value = document.getElementById("button_value");
  button_key.value = "";
  button_value.value = "";
}

function clearAllHeaders() {
  chrome.storage.StorageArea.clear(function(){
    console.log("所有键值对都被清除!");
  });
}

function removeHeader(key) {
  chrome.storage.StorageArea.remove(key, function(){
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
