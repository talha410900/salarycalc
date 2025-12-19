const fs = require('fs');
const path = require('path');

// Mapping of old paths to new optimized paths
const pageMappings = [
  { old: 'app/calculators/take-home-pay/page.tsx', new: 'app/calculators/take-home-pay-calculator/page.tsx' },
  { old: 'app/calculators/self-employed-tax/page.tsx', new: 'app/calculators/self-employed-tax-calculator/page.tsx' },
  { old: 'app/calculators/amt/page.tsx', new: 'app/calculators/amt-calculator/page.tsx' },
  { old: 'app/calculators/tax-return/page.tsx', new: 'app/calculators/tax-return-calculator/page.tsx' },
  { old: 'app/calculators/hourly-to-salary/page.tsx', new: 'app/calculators/hourly-to-salary-calculator/page.tsx' },
  { old: 'app/calculators/salary-to-hourly/page.tsx', new: 'app/calculators/salary-to-hourly-calculator/page.tsx' },
  { old: 'app/calculators/monthly-to-yearly/page.tsx', new: 'app/calculators/monthly-to-yearly-calculator/page.tsx' },
  { old: 'app/calculators/biweekly-to-annual/page.tsx', new: 'app/calculators/biweekly-to-annual-calculator/page.tsx' },
  { old: 'app/calculators/overtime-pay/page.tsx', new: 'app/calculators/overtime-pay-calculator/page.tsx' },
  { old: 'app/calculators/nc-capital-gains/page.tsx', new: 'app/calculators/nc-capital-gains-calculator/page.tsx' },
  { old: 'app/calculators/rental-property-capital-gains/page.tsx', new: 'app/calculators/rental-property-capital-gains-calculator/page.tsx' },
  { old: 'app/calculators/real-estate-capital-gains/page.tsx', new: 'app/calculators/real-estate-capital-gains-calculator/page.tsx' },
  { old: 'app/calculators/mortgage-tax/page.tsx', new: 'app/calculators/mortgage-tax-calculator/page.tsx' },
  { old: 'app/calculators/ny-mortgage-tax/page.tsx', new: 'app/calculators/ny-mortgage-tax-calculator/page.tsx' },
  { old: 'app/calculators/va-property-tax-car/page.tsx', new: 'app/calculators/va-property-tax-car-calculator/page.tsx' },
  { old: 'app/calculators/illinois-property-tax/page.tsx', new: 'app/calculators/illinois-property-tax-calculator/page.tsx' },
  { old: 'app/calculators/la-sales-tax/page.tsx', new: 'app/calculators/la-sales-tax-calculator/page.tsx' },
  { old: 'app/calculators/mn-sales-tax/page.tsx', new: 'app/calculators/mn-sales-tax-calculator/page.tsx' },
  { old: 'app/calculators/customs-import-duty/page.tsx', new: 'app/calculators/customs-import-duty-calculator/page.tsx' },
  { old: 'app/calculators/us-import-tax/page.tsx', new: 'app/calculators/us-import-tax-calculator/page.tsx' },
];

// URL replacements for internal links
const urlReplacements = [
  { old: '/calculators/federal-tax', new: '/calculators/federal-tax-calculator' },
  { old: '/calculators/take-home-pay', new: '/calculators/take-home-pay-calculator' },
  { old: '/calculators/payroll-tax', new: '/calculators/payroll-tax-calculator' },
  { old: '/calculators/tax-return', new: '/calculators/tax-return-calculator' },
  { old: '/calculators/self-employed-tax', new: '/calculators/self-employed-tax-calculator' },
  { old: '/calculators/hourly-to-salary', new: '/calculators/hourly-to-salary-calculator' },
  { old: '/calculators/salary-to-hourly', new: '/calculators/salary-to-hourly-calculator' },
  { old: '/calculators/monthly-to-yearly', new: '/calculators/monthly-to-yearly-calculator' },
  { old: '/calculators/biweekly-to-annual', new: '/calculators/biweekly-to-annual-calculator' },
  { old: '/calculators/overtime-pay', new: '/calculators/overtime-pay-calculator' },
  { old: '/calculators/nc-capital-gains', new: '/calculators/nc-capital-gains-calculator' },
  { old: '/calculators/rental-property-capital-gains', new: '/calculators/rental-property-capital-gains-calculator' },
  { old: '/calculators/real-estate-capital-gains', new: '/calculators/real-estate-capital-gains-calculator' },
  { old: '/calculators/mortgage-tax', new: '/calculators/mortgage-tax-calculator' },
  { old: '/calculators/ny-mortgage-tax', new: '/calculators/ny-mortgage-tax-calculator' },
  { old: '/calculators/va-property-tax-car', new: '/calculators/va-property-tax-car-calculator' },
  { old: '/calculators/illinois-property-tax', new: '/calculators/illinois-property-tax-calculator' },
  { old: '/calculators/la-sales-tax', new: '/calculators/la-sales-tax-calculator' },
  { old: '/calculators/mn-sales-tax', new: '/calculators/mn-sales-tax-calculator' },
  { old: '/calculators/customs-import-duty', new: '/calculators/customs-import-duty-calculator' },
  { old: '/calculators/us-import-tax', new: '/calculators/us-import-tax-calculator' },
];

function replaceCardTitleWithH2(content) {
  // Replace CardTitle with H2 headings
  content = content.replace(/<CardTitle>([^<]+)<\/CardTitle>/g, (match, title) => {
    // Check if it's a "How It Works" or similar section
    if (title.includes('How') || title.includes('Formulas') || title.includes('Related') || title.includes('FAQ') || title.includes('Additional')) {
      return `<h2 className="text-2xl font-bold text-foreground">${title}</h2>`;
    }
    return match;
  });
  
  // Remove CardTitle import if not used
  if (!content.includes('<CardTitle')) {
    content = content.replace(/CardTitle,?\s*/g, '');
    content = content.replace(/,\s*}/g, '}');
  }
  
  return content;
}

function updateInternalLinks(content) {
  urlReplacements.forEach(({ old, new: newUrl }) => {
    const regex = new RegExp(old.replace(/\//g, '\\/'), 'g');
    content = content.replace(regex, newUrl);
  });
  return content;
}

pageMappings.forEach(({ old, new: newPath }) => {
  const oldFullPath = path.join(process.cwd(), old);
  const newFullPath = path.join(process.cwd(), newPath);
  
  if (fs.existsSync(oldFullPath)) {
    let content = fs.readFileSync(oldFullPath, 'utf8');
    
    // Update internal links
    content = updateInternalLinks(content);
    
    // Replace CardTitle with H2
    content = replaceCardTitleWithH2(content);
    
    // Create directory if it doesn't exist
    const newDir = path.dirname(newFullPath);
    if (!fs.existsSync(newDir)) {
      fs.mkdirSync(newDir, { recursive: true });
    }
    
    // Write new file
    fs.writeFileSync(newFullPath, content, 'utf8');
    console.log(`Created: ${newPath}`);
  } else {
    console.log(`Skipped (not found): ${old}`);
  }
});

console.log('Done!');
