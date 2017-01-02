chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
  //console.log(JSON.stringify(details));
  var headers = details.requestHeaders,
  blockingResponse = {};

  // Each header parameter is stored in an array. Since Chrome
  // makes no guarantee about the contents/order of this array,
  // you'll have to iterate through it to find for the
  // 'User-Agent' element
  for( var i = 0, l = headers.length; i < l; ++i ) {
 /*   switch headers[i].name:
      "User-Agent":
   */     alert(headers[i].value)

/*
    if( headers[i].name == 'User-Agent' ) {
      headers[i].value = '127.0.0.1';
      console.log(headers[i].value);
      break;
    }
*/
    // If you want to modify other headers, this is the place to
    // do it. Either remove the 'break;' statement and add in more
    // conditionals or use a 'switch' statement on 'headers[i].name'
  }

  blockingResponse.requestHeaders = headers;
  return blockingResponse;
},
{urls: [ "<all_urls>" ]},['requestHeaders','blocking']);
