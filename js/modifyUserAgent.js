chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
  //console.log(JSON.stringify(details));
  var headers = details.requestHeaders,
  blockingResponse = {};

  // Each header parameter is stored in an array. Since Chrome
  // makes no guarantee about the contents/order of this array,
  // you'll have to iterate through it to find for the
  // 'User-Agent' element
  console.log("aaa1")

  chrome.storage.local.get(null, function(results) {
    for(var result in results){
      console.log("获取 : ", result, " -> ", results[result]); 
      headers.push({"name":result, "value":results[result]});
    }
  });

  console.log("aaa2")


  for( var i = 0, l = headers.length; i < l; ++i ) {
    console.log(headers[i].name, headers[i].value);
  }

  blockingResponse.requestHeaders = headers;
  return blockingResponse;
},
{urls: [ "<all_urls>" ]},['requestHeaders','blocking']);
