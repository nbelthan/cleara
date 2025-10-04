const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('Loading whitepaper page...');
  await page.goto('http://localhost:3001/whitepaper', { waitUntil: 'networkidle' });

  // Take screenshot
  await page.screenshot({ path: 'whitepaper-screenshot.png', fullPage: true });
  console.log('Screenshot saved to whitepaper-screenshot.png');

  // Get all section headings
  const sections = await page.$$eval('h2', elements =>
    elements.map(el => el.textContent)
  );

  console.log('\n=== Sections Found ===');
  sections.forEach((section, i) => {
    console.log(`${i + 1}. ${section}`);
  });

  // Get page content length
  const content = await page.textContent('article');
  console.log(`\nTotal content length: ${content.length} characters`);

  // Check for missing sections
  const expectedSections = [
    'Abstract',
    'Table of Contents',
    '1. Motivation & Goals',
    '2. Ledger Data Model',
    '3. Transaction Families',
    '4. Consensus, Ordering & Finality',
    '5. Deterministic Multilateral Netting',
    '6. Stablecoins & Asset Model',
    '7. Fees & Multi-Asset Gas',
    '8. Finality Tiers',
    '9. Cross-Border FX',
    '10. Mempool, Ordering & MEV',
    '11. Data Availability',
    '12. Evidence, Slashing',
    '13. Parameters',
    '14. Performance',
    '15. Security & Privacy',
    '16. Interop',
    '17. Reference Edge API',
    '18. Conformance Test Vectors',
    '19. Conclusion',
  ];

  console.log('\n=== Missing Sections ===');
  expectedSections.forEach(expected => {
    const found = sections.some(section => section.includes(expected));
    if (!found) {
      console.log(`❌ ${expected}`);
    }
  });

  await browser.close();
})();
