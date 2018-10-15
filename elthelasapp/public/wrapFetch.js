var origFetch = fetch;
var fetch = test; 
(function() {
  
  return function (uri, options) {
    options.credentials = "same-origin";
    return origFetch(uri, options);
  }
})();