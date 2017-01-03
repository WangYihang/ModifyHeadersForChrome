chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
  var headers = details.requestHeaders,
  blockingResponse = {};
  chrome.storage.local.get(null, function(results) {
    for(var result in results){
      headers.push({"name":result, "value":results[result]});
    }
  });
  blockingResponse.requestHeaders = headers;
  return blockingResponse;
},
{urls: [ "<all_urls>" ]},['requestHeaders','blocking']);