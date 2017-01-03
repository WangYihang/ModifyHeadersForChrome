chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
  //console.log(JSON.stringify(details));
  var headers = details.requestHeaders,
  blockingResponse = {};

  // Each header parameter is stored in an array. Since Chrome
  // makes no guarantee about the contents/order of this array,
  // you'll have to iterate through it to find for the
  // 'User-Agent' element

  var userHeaders = chrome.storage.local.get(null, function(results) {
    for(var result in results){
      headers.push({"name":result, "value":results[result]});
    }
  });
  for(var userHeader in userHeaders){
    console.log(userHeader);
    // headers.push({"name":"test", "value":"testValue"});
  }

  blockingResponse.requestHeaders = headers;
  // console.log(blockingResponse)
  return blockingResponse;

},
{urls: [ "<all_urls>" ]},['requestHeaders','blocking']);