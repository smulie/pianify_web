const fs = require('fs');

try {
  const harRaw = fs.readFileSync('e:\\pianify\\pianify_web\\pianify.app.har', 'utf8');
  const har = JSON.parse(harRaw);
  const entries = har.log.entries;
  
  const sorted = entries.sort((a,b) => b.time - a.time);
  
  console.log('--- Top 20 slowest requests ---');
  sorted.slice(0, 20).forEach(e => {
    console.log(`- ${e.request.method} ${e.request.url.substring(0, 80)}`);
    console.log(`  -> Total time: ${Math.round(e.time)}ms`);
    console.log(`     (DNS: ${Math.round(e.timings.dns)}ms, Connect: ${Math.round(e.timings.connect)}ms, SSL: ${Math.round(e.timings.ssl)}ms, Wait/TTFB: ${Math.round(e.timings.wait)}ms, Receive: ${Math.round(e.timings.receive)}ms, Blocked: ${Math.round(e.timings.blocked)}ms)`);
  });

  if (har.log.pages && har.log.pages.length > 0) {
    console.log('\n--- Page timings ---');
    console.log(har.log.pages[0].pageTimings);
  }
  
  // Also sum up total sizes and count requests
  let totalSize = 0;
  entries.forEach(e => {
    totalSize += Math.max(0, e.response.bodySize) + Math.max(0, e.response.headersSize);
  });
  console.log(`\nTotal requests: ${entries.length}`);
  console.log(`Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  
} catch (err) {
  console.error("Error parsing HAR:", err);
}
