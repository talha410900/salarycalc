import { formatCurrency } from "@/lib/format"
import { biweeklyToAnnual, biweeklyToMonthly } from "@/lib/salary"

export const BIWEEKLY_SEO_AMOUNTS = [
  1000, 1100, 1200, 1250, 1300, 1400, 1500, 1600, 1700, 1800, 1850, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600,
  2700, 2800, 3000, 3500, 4000, 4500, 5000,
] as const

export type BiweeklySeoAmount = (typeof BIWEEKLY_SEO_AMOUNTS)[number]

const BIWEEKLY_SEO_AMOUNT_SET = new Set<number>(BIWEEKLY_SEO_AMOUNTS)

export function isBiweeklySeoAmount(amount: number): amount is BiweeklySeoAmount {
  return BIWEEKLY_SEO_AMOUNT_SET.has(amount)
}

export function parseBiweeklyAmountParam(param: string): BiweeklySeoAmount | null {
  if (!/^\d+$/.test(param)) {
    return null
  }

  const amount = Number.parseInt(param, 10)
  if (!isBiweeklySeoAmount(amount)) {
    return null
  }

  return amount
}

export function formatUsdWhole(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export interface BiweeklyBreakdown {
  amount: number
  annual: number
  monthly: number
  weekly: number
  hourly: number
}

export function getBiweeklyBreakdown(amount: number): BiweeklyBreakdown {
  const annual = biweeklyToAnnual(amount)
  return {
    amount,
    annual,
    monthly: biweeklyToMonthly(amount),
    weekly: amount / 2,
    hourly: annual / 2080,
  }
}

export function getBiweeklyAmountPath(amount: number): string {
  return `/calculators/biweekly-to-annual-calculator/${amount}`
}

export function getBiweeklyAmountTitle(amount: number): string {
  const { annual } = getBiweeklyBreakdown(amount)
  return `${formatUsdWhole(amount)} Biweekly Is ${formatUsdWhole(annual)} a Year | TaxSal`
}

export function getBiweeklyAmountDescription(amount: number): string {
  const { annual, monthly } = getBiweeklyBreakdown(amount)
  return `${formatUsdWhole(amount)} biweekly equals ${formatUsdWhole(annual)} per year (${formatCurrency(monthly)}/month). 26 pay periods × ${formatUsdWhole(amount)}. Free calculator.`
}

export function getBiweeklyAmountFaqs(amount: number): Array<{ question: string; answer: string }> {
  const { annual, monthly, weekly } = getBiweeklyBreakdown(amount)
  const formatted = formatUsdWhole(amount)
  const annualFormatted = formatUsdWhole(annual)

  return [
    {
      question: `If I make ${formatted} biweekly, how much is that a year?`,
      answer: `${formatted} biweekly is ${annualFormatted} a year. There are 26 biweekly pay periods in a year, so ${formatted} × 26 = ${annualFormatted}.`,
    },
    {
      question: `${amount} biweekly is how much a year?`,
      answer: `${formatted} biweekly equals ${annualFormatted} annually, about ${formatCurrency(monthly)} per month and ${formatCurrency(weekly)} per week.`,
    },
    {
      question: "How do you convert biweekly pay to annual salary?",
      answer:
        "Multiply your biweekly paycheck by 26 (52 weeks ÷ 2). Semi-monthly pay (twice a month) uses 24 periods instead.",
    },
  ]
}

export function getRelatedBiweeklyAmounts(amount: number, count = 6): number[] {
  const index = BIWEEKLY_SEO_AMOUNTS.indexOf(amount as BiweeklySeoAmount)
  if (index === -1) {
    return [...BIWEEKLY_SEO_AMOUNTS.slice(0, count)]
  }

  const related: number[] = []
  let offset = 1

  while (related.length < count && (index - offset >= 0 || index + offset < BIWEEKLY_SEO_AMOUNTS.length)) {
    const next = BIWEEKLY_SEO_AMOUNTS[index + offset]
    if (next !== undefined && related.length < count) {
      related.push(next)
    }

    const previous = BIWEEKLY_SEO_AMOUNTS[index - offset]
    if (previous !== undefined && related.length < count) {
      related.push(previous)
    }

    offset += 1
  }

  return related
}

export const BIWEEKLY_HUB_FAQS = [
  {
    question: "2000 biweekly is how much a year?",
    answer:
      "$2,000 biweekly is $52,000 a year. Multiply any biweekly paycheck by 26 pay periods: $2,000 × 26 = $52,000.",
  },
  {
    question: "How do I convert biweekly pay to annual salary?",
    answer:
      "Multiply your biweekly paycheck by 26. There are 52 weeks in a year and biweekly pay is every two weeks, so 52 ÷ 2 = 26 paychecks.",
  },
  {
    question: "Why 26 pay periods and not 24?",
    answer:
      "Biweekly means every two weeks (26 pay periods). Semi-monthly means twice per month (24 pay periods). They are not the same.",
  },
  {
    question: "If I make 1700 biweekly how much is that a year?",
    answer: "$1,700 biweekly is $44,200 a year ($1,700 × 26).",
  },
]
