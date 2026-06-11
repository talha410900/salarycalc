// Per-state unique content derived from real 2025-2026 tax data.
// Everything here is computed from STATE_TAX_DATA so each state page gets
// genuinely different facts, numbers, and comparisons (not boilerplate).
import {
  STATE_TAX_DATA,
  ALL_STATES,
  calculateStateTax,
  getTopMarginalRate,
  type StateTaxData,
} from "@/lib/state-tax-data"
import {
  calculateFederalTax,
  calculateSocialSecurity,
  calculateMedicare,
} from "@/lib/tax"

// Date the tax data in lib/state-tax-data.ts was last reviewed.
export const TAX_DATA_LAST_REVIEWED = "June 2026"

// Official state tax agency for every state — used as the cited source.
export const STATE_TAX_AGENCIES: Record<string, { name: string; url: string }> = {
  alabama: { name: "Alabama Department of Revenue", url: "https://www.revenue.alabama.gov/" },
  alaska: { name: "Alaska Department of Revenue, Tax Division", url: "https://tax.alaska.gov/" },
  arizona: { name: "Arizona Department of Revenue", url: "https://azdor.gov/" },
  arkansas: { name: "Arkansas Department of Finance and Administration", url: "https://www.dfa.arkansas.gov/" },
  california: { name: "California Franchise Tax Board", url: "https://www.ftb.ca.gov/" },
  colorado: { name: "Colorado Department of Revenue", url: "https://tax.colorado.gov/" },
  connecticut: { name: "Connecticut Department of Revenue Services", url: "https://portal.ct.gov/drs" },
  delaware: { name: "Delaware Division of Revenue", url: "https://revenue.delaware.gov/" },
  "district-of-columbia": { name: "DC Office of Tax and Revenue", url: "https://otr.cfo.dc.gov/" },
  florida: { name: "Florida Department of Revenue", url: "https://floridarevenue.com/" },
  georgia: { name: "Georgia Department of Revenue", url: "https://dor.georgia.gov/" },
  hawaii: { name: "Hawaii Department of Taxation", url: "https://tax.hawaii.gov/" },
  idaho: { name: "Idaho State Tax Commission", url: "https://tax.idaho.gov/" },
  illinois: { name: "Illinois Department of Revenue", url: "https://tax.illinois.gov/" },
  indiana: { name: "Indiana Department of Revenue", url: "https://www.in.gov/dor/" },
  iowa: { name: "Iowa Department of Revenue", url: "https://revenue.iowa.gov/" },
  kansas: { name: "Kansas Department of Revenue", url: "https://www.ksrevenue.gov/" },
  kentucky: { name: "Kentucky Department of Revenue", url: "https://revenue.ky.gov/" },
  louisiana: { name: "Louisiana Department of Revenue", url: "https://revenue.louisiana.gov/" },
  maine: { name: "Maine Revenue Services", url: "https://www.maine.gov/revenue/" },
  maryland: { name: "Comptroller of Maryland", url: "https://www.marylandtaxes.gov/" },
  massachusetts: { name: "Massachusetts Department of Revenue", url: "https://www.mass.gov/orgs/massachusetts-department-of-revenue" },
  michigan: { name: "Michigan Department of Treasury", url: "https://www.michigan.gov/taxes" },
  minnesota: { name: "Minnesota Department of Revenue", url: "https://www.revenue.state.mn.us/" },
  mississippi: { name: "Mississippi Department of Revenue", url: "https://www.dor.ms.gov/" },
  missouri: { name: "Missouri Department of Revenue", url: "https://dor.mo.gov/" },
  montana: { name: "Montana Department of Revenue", url: "https://mtrevenue.gov/" },
  nebraska: { name: "Nebraska Department of Revenue", url: "https://revenue.nebraska.gov/" },
  nevada: { name: "Nevada Department of Taxation", url: "https://tax.nv.gov/" },
  "new-hampshire": { name: "New Hampshire Department of Revenue Administration", url: "https://www.revenue.nh.gov/" },
  "new-jersey": { name: "New Jersey Division of Taxation", url: "https://www.nj.gov/treasury/taxation/" },
  "new-mexico": { name: "New Mexico Taxation and Revenue Department", url: "https://www.tax.newmexico.gov/" },
  "new-york": { name: "New York State Department of Taxation and Finance", url: "https://www.tax.ny.gov/" },
  "north-carolina": { name: "North Carolina Department of Revenue", url: "https://www.ncdor.gov/" },
  "north-dakota": { name: "North Dakota Office of State Tax Commissioner", url: "https://www.tax.nd.gov/" },
  ohio: { name: "Ohio Department of Taxation", url: "https://tax.ohio.gov/" },
  oklahoma: { name: "Oklahoma Tax Commission", url: "https://oklahoma.gov/tax.html" },
  oregon: { name: "Oregon Department of Revenue", url: "https://www.oregon.gov/dor/" },
  pennsylvania: { name: "Pennsylvania Department of Revenue", url: "https://www.pa.gov/agencies/revenue" },
  "rhode-island": { name: "Rhode Island Division of Taxation", url: "https://tax.ri.gov/" },
  "south-carolina": { name: "South Carolina Department of Revenue", url: "https://dor.sc.gov/" },
  "south-dakota": { name: "South Dakota Department of Revenue", url: "https://dor.sd.gov/" },
  tennessee: { name: "Tennessee Department of Revenue", url: "https://www.tn.gov/revenue" },
  texas: { name: "Texas Comptroller of Public Accounts", url: "https://comptroller.texas.gov/" },
  utah: { name: "Utah State Tax Commission", url: "https://tax.utah.gov/" },
  vermont: { name: "Vermont Department of Taxes", url: "https://tax.vermont.gov/" },
  virginia: { name: "Virginia Department of Taxation", url: "https://www.tax.virginia.gov/" },
  washington: { name: "Washington Department of Revenue", url: "https://dor.wa.gov/" },
  "west-virginia": { name: "West Virginia Tax Division", url: "https://tax.wv.gov/" },
  wisconsin: { name: "Wisconsin Department of Revenue", url: "https://www.revenue.wi.gov/" },
  wyoming: { name: "Wyoming Department of Revenue", url: "https://revenue.wyo.gov/" },
}

// Land-border neighbors (plus DC/Maryland/Virginia). Used for the
// "compare with nearby states" table and internal links.
export const STATE_NEIGHBORS: Record<string, string[]> = {
  alabama: ["georgia", "florida", "mississippi", "tennessee"],
  alaska: [],
  arizona: ["california", "nevada", "utah", "new-mexico", "colorado"],
  arkansas: ["missouri", "tennessee", "mississippi", "louisiana", "texas", "oklahoma"],
  california: ["oregon", "nevada", "arizona"],
  colorado: ["wyoming", "nebraska", "kansas", "oklahoma", "new-mexico", "utah", "arizona"],
  connecticut: ["new-york", "massachusetts", "rhode-island"],
  delaware: ["maryland", "pennsylvania", "new-jersey"],
  "district-of-columbia": ["maryland", "virginia"],
  florida: ["georgia", "alabama"],
  georgia: ["florida", "alabama", "tennessee", "north-carolina", "south-carolina"],
  hawaii: [],
  idaho: ["washington", "oregon", "nevada", "utah", "wyoming", "montana"],
  illinois: ["wisconsin", "iowa", "missouri", "kentucky", "indiana"],
  indiana: ["michigan", "ohio", "kentucky", "illinois"],
  iowa: ["minnesota", "wisconsin", "illinois", "missouri", "nebraska", "south-dakota"],
  kansas: ["nebraska", "missouri", "oklahoma", "colorado"],
  kentucky: ["indiana", "ohio", "west-virginia", "virginia", "tennessee", "missouri", "illinois"],
  louisiana: ["texas", "arkansas", "mississippi"],
  maine: ["new-hampshire"],
  maryland: ["virginia", "west-virginia", "pennsylvania", "delaware", "district-of-columbia"],
  massachusetts: ["rhode-island", "connecticut", "new-york", "new-hampshire", "vermont"],
  michigan: ["ohio", "indiana", "wisconsin"],
  minnesota: ["wisconsin", "iowa", "south-dakota", "north-dakota"],
  mississippi: ["louisiana", "arkansas", "tennessee", "alabama"],
  missouri: ["iowa", "illinois", "kentucky", "tennessee", "arkansas", "oklahoma", "kansas", "nebraska"],
  montana: ["north-dakota", "south-dakota", "wyoming", "idaho"],
  nebraska: ["south-dakota", "iowa", "missouri", "kansas", "colorado", "wyoming"],
  nevada: ["oregon", "idaho", "utah", "arizona", "california"],
  "new-hampshire": ["maine", "massachusetts", "vermont"],
  "new-jersey": ["new-york", "pennsylvania", "delaware"],
  "new-mexico": ["arizona", "utah", "colorado", "oklahoma", "texas"],
  "new-york": ["new-jersey", "pennsylvania", "connecticut", "massachusetts", "vermont"],
  "north-carolina": ["virginia", "tennessee", "georgia", "south-carolina"],
  "north-dakota": ["minnesota", "south-dakota", "montana"],
  ohio: ["pennsylvania", "west-virginia", "kentucky", "indiana", "michigan"],
  oklahoma: ["kansas", "missouri", "arkansas", "texas", "new-mexico", "colorado"],
  oregon: ["washington", "idaho", "nevada", "california"],
  pennsylvania: ["new-york", "new-jersey", "delaware", "maryland", "west-virginia", "ohio"],
  "rhode-island": ["connecticut", "massachusetts"],
  "south-carolina": ["north-carolina", "georgia"],
  "south-dakota": ["north-dakota", "minnesota", "iowa", "nebraska", "wyoming", "montana"],
  tennessee: ["kentucky", "virginia", "north-carolina", "georgia", "alabama", "mississippi", "arkansas", "missouri"],
  texas: ["new-mexico", "oklahoma", "arkansas", "louisiana"],
  utah: ["idaho", "wyoming", "colorado", "new-mexico", "arizona", "nevada"],
  vermont: ["new-york", "new-hampshire", "massachusetts"],
  virginia: ["maryland", "district-of-columbia", "west-virginia", "kentucky", "tennessee", "north-carolina"],
  washington: ["idaho", "oregon"],
  "west-virginia": ["ohio", "pennsylvania", "maryland", "virginia", "kentucky"],
  wisconsin: ["michigan", "minnesota", "iowa", "illinois"],
  wyoming: ["montana", "south-dakota", "nebraska", "colorado", "utah", "idaho"],
}

function topMarginalRateValue(data: StateTaxData): number {
  if (data.type === "None") return 0
  if (data.type === "Flat") return data.rate ?? 0
  if (data.type === "Graduated" && data.brackets) {
    return data.brackets.single[data.brackets.single.length - 1].rate
  }
  return 0
}

// Rank of a state's top marginal rate, 1 = highest in the country.
// States with no income tax share the lowest rank.
export function getStateRanking(stateSlug: string): {
  rank: number
  totalStates: number
  noTaxStateCount: number
  topRate: number
} {
  const rates = ALL_STATES.map((s) => ({ slug: s.slug, rate: topMarginalRateValue(s) }))
  const sorted = [...rates].sort((a, b) => b.rate - a.rate)
  const target = rates.find((r) => r.slug === stateSlug)
  const rank = sorted.findIndex((r) => r.rate === (target?.rate ?? 0)) + 1
  return {
    rank,
    totalStates: rates.length,
    noTaxStateCount: rates.filter((r) => r.rate === 0).length,
    topRate: target?.rate ?? 0,
  }
}

export interface ExampleRow {
  salary: number
  stateTax: number
  effectiveStateRate: number
  federalTax: number
  fica: number
  takeHome: number
}

// Worked examples at common salary levels for a single filer.
export function getExampleRows(stateSlug: string): ExampleRow[] {
  return [40000, 60000, 85000, 120000, 200000].map((salary) => {
    const stateTax = calculateStateTax(stateSlug, salary, "single")
    const federalTax = calculateFederalTax(salary, "single")
    const fica = calculateSocialSecurity(salary) + calculateMedicare(salary)
    return {
      salary,
      stateTax,
      effectiveStateRate: salary > 0 ? (stateTax / salary) * 100 : 0,
      federalTax,
      fica,
      takeHome: salary - stateTax - federalTax - fica,
    }
  })
}

export interface NeighborComparison {
  slug: string
  name: string
  type: StateTaxData["type"]
  topRate: string
  taxOn75k: number
}

export function getNeighborComparisons(stateSlug: string): NeighborComparison[] {
  const neighbors = STATE_NEIGHBORS[stateSlug] ?? []
  return neighbors
    .filter((slug) => STATE_TAX_DATA[slug])
    .map((slug) => ({
      slug,
      name: STATE_TAX_DATA[slug].name,
      type: STATE_TAX_DATA[slug].type,
      topRate: getTopMarginalRate(slug),
      taxOn75k: calculateStateTax(slug, 75000, "single"),
    }))
}

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

const pct = (n: number) => `${n.toFixed(2).replace(/\.?0+$/, "")}%`

// Narrative paragraphs assembled from the state's actual numbers.
export function getStateNarrative(stateSlug: string): string[] {
  const data = STATE_TAX_DATA[stateSlug]
  if (!data) return []
  const ranking = getStateRanking(stateSlug)
  const taxOn75k = calculateStateTax(stateSlug, 75000, "single")
  const paragraphs: string[] = []

  if (data.type === "None") {
    paragraphs.push(
      `${data.name} is one of ${ranking.noTaxStateCount} states that levy no state income tax on wages, so your paycheck in ${data.name} is reduced only by federal income tax, Social Security, and Medicare. ${data.notes}`,
    )
    paragraphs.push(
      `On a $75,000 salary, a single filer in ${data.name} keeps the full amount free of state income tax. The same salary would owe state income tax in most other states, which makes ${data.name} one of the most paycheck-friendly states in the country for wage earners.`,
    )
  } else if (data.type === "Flat") {
    const rate = pct((data.rate ?? 0) * 100)
    paragraphs.push(
      `${data.name} uses a flat income tax: every dollar of taxable income is taxed at ${rate}, regardless of how much you earn. ${data.notes}`,
    )
    paragraphs.push(
      `For a single filer earning $75,000, that works out to roughly ${usd(taxOn75k)} in ${data.name} state income tax for the 2025-2026 tax year, an effective state rate of ${pct((taxOn75k / 75000) * 100)}. Among the ${ranking.totalStates} states and DC, ${data.name}'s top rate ranks #${ranking.rank} from the highest.`,
    )
  } else if (data.type === "Graduated" && data.brackets) {
    const single = data.brackets.single
    const lowest = pct(single[0].rate * 100)
    const highest = pct(single[single.length - 1].rate * 100)
    const topThreshold = single[single.length - 1].threshold
    paragraphs.push(
      `${data.name} has a graduated (progressive) income tax with ${single.length} brackets for single filers, starting at ${lowest} and rising to a top marginal rate of ${highest} on income above ${usd(topThreshold)}. Only the income that falls inside each bracket is taxed at that bracket's rate. ${data.notes}`,
    )
    paragraphs.push(
      `For a single filer earning $75,000, ${data.name} state income tax comes to roughly ${usd(taxOn75k)} for 2025-2026, an effective state rate of ${pct((taxOn75k / 75000) * 100)} — noticeably lower than the top marginal rate, because the first dollars you earn are taxed in the lower brackets. ${data.name}'s top rate ranks #${ranking.rank} of ${ranking.totalStates} nationally.`,
    )
  }

  return paragraphs
}

export interface StateFAQ {
  question: string
  answer: string
}

// State-specific FAQs with computed numbers (also used for FAQPage schema).
export function getStateFAQs(stateSlug: string): StateFAQ[] {
  const data = STATE_TAX_DATA[stateSlug]
  if (!data) return []
  const ranking = getStateRanking(stateSlug)
  const taxOn50k = calculateStateTax(stateSlug, 50000, "single")
  const taxOn75k = calculateStateTax(stateSlug, 75000, "single")
  const taxOn100k = calculateStateTax(stateSlug, 100000, "single")
  const neighbors = getNeighborComparisons(stateSlug)
  const faqs: StateFAQ[] = []

  if (data.type === "None") {
    faqs.push({
      question: `Does ${data.name} have a state income tax in 2025-2026?`,
      answer: `No. ${data.name} does not tax wage income, so there is no state income tax withheld from your paycheck. ${data.notes}`,
    })
    faqs.push({
      question: `Do I still pay taxes on my salary in ${data.name}?`,
      answer: `Yes — federal taxes still apply. On a $75,000 salary a single filer pays about ${usd(calculateFederalTax(75000, "single"))} in federal income tax plus ${usd(calculateSocialSecurity(75000) + calculateMedicare(75000))} in Social Security and Medicare (FICA). ${data.name} simply adds no state income tax on top.`,
    })
    faqs.push({
      question: `How does ${data.name} fund its government without an income tax?`,
      answer: `${data.name} relies on other revenue sources such as sales, property, severance, or business taxes instead of taxing wages. ${ranking.noTaxStateCount - 1} other states take the same approach to wage income.`,
    })
  } else {
    faqs.push({
      question: `What is the ${data.name} state income tax rate for 2025-2026?`,
      answer:
        data.type === "Flat"
          ? `${data.name} has a flat state income tax of ${pct((data.rate ?? 0) * 100)} that applies to all taxable income levels.`
          : `${data.name} has a graduated income tax with rates from ${pct((data.brackets!.single[0].rate) * 100)} to ${pct(topMarginalRateValue(data) * 100)} for the 2025-2026 tax year, depending on income and filing status.`,
    })
    faqs.push({
      question: `How much state income tax will I pay on a $50,000, $75,000, or $100,000 salary in ${data.name}?`,
      answer: `For a single filer in ${data.name}, state income tax is approximately ${usd(taxOn50k)} on $50,000, ${usd(taxOn75k)} on $75,000, and ${usd(taxOn100k)} on $100,000, before state-specific deductions, exemptions, or credits that may lower your bill.`,
    })
    faqs.push({
      question: `Is ${data.name}'s income tax flat or progressive?`,
      answer:
        data.type === "Flat"
          ? `Flat — everyone pays ${pct((data.rate ?? 0) * 100)} on taxable income no matter how much they earn. ${data.notes}`
          : `Progressive — income is split across ${data.brackets!.single.length} brackets and only the portion inside each bracket is taxed at that bracket's rate. ${data.notes}`,
    })
    faqs.push({
      question: `How high is ${data.name}'s income tax compared with other states?`,
      answer: `${data.name}'s top marginal rate of ${getTopMarginalRate(stateSlug)} ranks #${ranking.rank} out of ${ranking.totalStates} states and DC (where #1 is the highest top rate in the country). ${ranking.noTaxStateCount} states levy no wage income tax at all.`,
    })
  }

  if (neighbors.length > 0) {
    const parts = neighbors
      .slice(0, 4)
      .map((n) => `${n.name} (${n.type === "None" ? "no income tax" : `top rate ${n.topRate}`})`)
      .join(", ")
    faqs.push({
      question: `How does ${data.name} compare with neighboring states on income tax?`,
      answer: `Nearby states: ${parts}. On a $75,000 single-filer salary, ${data.name} collects about ${usd(taxOn75k)} in state income tax.`,
    })
  }

  faqs.push({
    question: `Does this ${data.name} calculator include federal taxes?`,
    answer: `Yes. The calculator combines 2025-2026 federal income tax brackets, the $15,750 single / $31,500 married standard deduction, Social Security (6.2% up to $176,100), Medicare (1.45%, plus 0.9% above $200,000 single), and ${data.name} state tax to estimate your real take-home pay.`,
  })

  return faqs
}
