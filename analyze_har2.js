const fs = require('fs');
const har = JSON.parse(fs.readFileSync('pianify.app.har', 'utf8'));
const entries = har.log.entries;

console.log('=== TOTAL REQUESTS:', entries.length);
if (har.log.pages && har.log.pages[0]) {
  console.log('=== PAGE TIMINGS:', JSON.stringify(har.log.pages[0].pageTimings, null, 2));
}

console.log('\n=== ALL REQUESTS (sorted slowest first) ===');
entries.sort(function(a,b){ return b.time - a.time; }).forEach(function(e) {
  var url = e.request.url.substring(0, 100);
  var t = e.timings;
  var contentType = '?';
  var cacheControl = '(none)';
  for (var i = 0; i < e.response.headers.length; i++) {
    var n = e.response.headers[i].name.toLowerCase();
    if (n === 'content-type') contentType = e.response.headers[i].value.split(';')[0];
    if (n === 'cache-control') cacheControl = e.response.headers[i].value;
  }
  console.log('[' + Math.round(e.time) + 'ms] ' + e.request.method + ' ' + url);
  console.log('  TTFB=' + Math.round(t.wait) + 'ms Blocked=' + Math.round(t.blocked) + 'ms DNS=' + Math.round(t.dns) + 'ms Connect=' + Math.round(t.connect) + 'ms SSL=' + Math.round(t.ssl) + 'ms');
  console.log('  Status: ' + e.response.status + ' | Size: ' + Math.round(Math.max(0, e.response.bodySize)/1024) + 'KB | Type: ' + contentType);
  console.log('  Cache-Control: ' + cacheControl);
  console.log('');
});
