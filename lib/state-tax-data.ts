// 2025 State Tax Data for all US States
export type TaxType = "None" | "Flat" | "Graduated"

export interface TaxBracket {
  rate: number // as decimal (e.g., 0.05 for 5%)
  threshold: number
}

export interface StateTaxData {
  name: string
  code: string
  type: TaxType
  rate?: number // For flat tax states (as decimal)
  notes: string
  brackets?: {
    single: TaxBracket[]
    married_joint: TaxBracket[]
  }
}

export const STATE_TAX_DATA: Record<string, StateTaxData> = {
  alabama: {
    name: "Alabama",
    code: "AL",
    type: "Graduated",
    notes: "Brackets are static and do not adjust for inflation.",
    brackets: {
      single: [
        { rate: 0.02, threshold: 0 },
        { rate: 0.04, threshold: 500 },
        { rate: 0.05, threshold: 3000 },
      ],
      married_joint: [
        { rate: 0.02, threshold: 0 },
        { rate: 0.04, threshold: 1000 },
        { rate: 0.05, threshold: 6000 },
      ],
    },
  },
  alaska: {
    name: "Alaska",
    code: "AK",
    type: "None",
    rate: 0,
    notes: "No state individual income tax.",
  },
  arizona: {
    name: "Arizona",
    code: "AZ",
    type: "Flat",
    rate: 0.025,
    notes: "Flat tax rate for all income levels.",
  },
  arkansas: {
    name: "Arkansas",
    code: "AR",
    type: "Graduated",
    notes: "Rates reduced for 2025.",
    brackets: {
      single: [
        { rate: 0.0, threshold: 0 },
        { rate: 0.02, threshold: 5500 },
        { rate: 0.03, threshold: 10900 },
        { rate: 0.034, threshold: 15600 },
        { rate: 0.039, threshold: 25700 },
      ],
      married_joint: [
        { rate: 0.0, threshold: 0 },
        { rate: 0.02, threshold: 5500 },
        { rate: 0.03, threshold: 10900 },
        { rate: 0.034, threshold: 15600 },
        { rate: 0.039, threshold: 25700 },
      ],
    },
  },
  california: {
    name: "California",
    code: "CA",
    type: "Graduated",
    notes: "Includes 1% surcharge on income over $1M (Mental Health Services Act).",
    brackets: {
      single: [
        { rate: 0.01, threshold: 0 },
        { rate: 0.02, threshold: 10757 },
        { rate: 0.04, threshold: 25500 },
        { rate: 0.06, threshold: 40246 },
        { rate: 0.08, threshold: 55867 },
        { rate: 0.093, threshold: 70607 },
        { rate: 0.103, threshold: 360660 },
        { rate: 0.113, threshold: 432788 },
        { rate: 0.123, threshold: 721315 },
        { rate: 0.133, threshold: 1000000 },
      ],
      married_joint: [
        { rate: 0.01, threshold: 0 },
        { rate: 0.02, threshold: 21513 },
        { rate: 0.04, threshold: 50999 },
        { rate: 0.06, threshold: 80491 },
        { rate: 0.08, threshold: 111733 },
        { rate: 0.093, threshold: 141213 },
        { rate: 0.103, threshold: 721319 },
        { rate: 0.113, threshold: 865575 },
        { rate: 0.123, threshold: 1442629 },
        { rate: 0.133, threshold: 2000000 },
      ],
    },
  },
  colorado: {
    name: "Colorado",
    code: "CO",
    type: "Flat",
    rate: 0.044,
    notes: "Flat tax rate mandated by TABOR triggers.",
  },
  connecticut: {
    name: "Connecticut",
    code: "CT",
    type: "Graduated",
    notes: "Includes 'recapture' provision for high earners.",
    brackets: {
      single: [
        { rate: 0.02, threshold: 0 },
        { rate: 0.045, threshold: 10000 },
        { rate: 0.055, threshold: 50000 },
        { rate: 0.06, threshold: 100000 },
        { rate: 0.065, threshold: 200000 },
        { rate: 0.069, threshold: 250000 },
        { rate: 0.0699, threshold: 500000 },
      ],
      married_joint: [
        { rate: 0.02, threshold: 0 },
        { rate: 0.045, threshold: 20000 },
        { rate: 0.055, threshold: 100000 },
        { rate: 0.06, threshold: 200000 },
        { rate: 0.065, threshold: 400000 },
        { rate: 0.069, threshold: 500000 },
        { rate: 0.0699, threshold: 1000000 },
      ],
    },
  },
  delaware: {
    name: "Delaware",
    code: "DE",
    type: "Graduated",
    notes: "Rates apply to income over $2,000.",
    brackets: {
      single: [
        { rate: 0.0, threshold: 0 },
        { rate: 0.022, threshold: 2000 },
        { rate: 0.039, threshold: 5000 },
        { rate: 0.048, threshold: 10000 },
        { rate: 0.052, threshold: 20000 },
        { rate: 0.0555, threshold: 25000 },
        { rate: 0.066, threshold: 60000 },
      ],
      married_joint: [
        { rate: 0.0, threshold: 0 },
        { rate: 0.022, threshold: 2000 },
        { rate: 0.039, threshold: 5000 },
        { rate: 0.048, threshold: 10000 },
        { rate: 0.052, threshold: 20000 },
        { rate: 0.0555, threshold: 25000 },
        { rate: 0.066, threshold: 60000 },
      ],
    },
  },
  "district-of-columbia": {
    name: "District of Columbia",
    code: "DC",
    type: "Graduated",
    notes: "Includes new high-income brackets.",
    brackets: {
      single: [
        { rate: 0.04, threshold: 0 },
        { rate: 0.06, threshold: 10000 },
        { rate: 0.065, threshold: 40000 },
        { rate: 0.085, threshold: 60000 },
        { rate: 0.0925, threshold: 250000 },
        { rate: 0.0975, threshold: 500000 },
        { rate: 0.1075, threshold: 1000000 },
      ],
      married_joint: [
        { rate: 0.04, threshold: 0 },
        { rate: 0.06, threshold: 10000 },
        { rate: 0.065, threshold: 40000 },
        { rate: 0.085, threshold: 60000 },
        { rate: 0.0925, threshold: 250000 },
        { rate: 0.0975, threshold: 500000 },
        { rate: 0.1075, threshold: 1000000 },
      ],
    },
  },
  florida: {
    name: "Florida",
    code: "FL",
    type: "None",
    rate: 0,
    notes: "No state individual income tax.",
  },
  georgia: {
    name: "Georgia",
    code: "GA",
    type: "Flat",
    rate: 0.0519,
    notes: "Reduced from 5.39% effective Jan 1, 2025.",
  },
  hawaii: {
    name: "Hawaii",
    code: "HI",
    type: "Graduated",
    notes: "Highest top marginal rate among states (11% + potential surcharges).",
    brackets: {
      single: [
        { rate: 0.014, threshold: 0 },
        { rate: 0.032, threshold: 2400 },
        { rate: 0.055, threshold: 4800 },
        { rate: 0.064, threshold: 9600 },
        { rate: 0.068, threshold: 14400 },
        { rate: 0.072, threshold: 19200 },
        { rate: 0.076, threshold: 24000 },
        { rate: 0.079, threshold: 36000 },
        { rate: 0.0825, threshold: 48000 },
        { rate: 0.09, threshold: 150000 },
        { rate: 0.1, threshold: 175000 },
        { rate: 0.11, threshold: 200000 },
      ],
      married_joint: [
        { rate: 0.014, threshold: 0 },
        { rate: 0.032, threshold: 4800 },
        { rate: 0.055, threshold: 9600 },
        { rate: 0.064, threshold: 19200 },
        { rate: 0.068, threshold: 28800 },
        { rate: 0.072, threshold: 38400 },
        { rate: 0.076, threshold: 48000 },
        { rate: 0.079, threshold: 72000 },
        { rate: 0.0825, threshold: 96000 },
        { rate: 0.09, threshold: 300000 },
        { rate: 0.1, threshold: 350000 },
        { rate: 0.11, threshold: 400000 },
      ],
    },
  },
  idaho: {
    name: "Idaho",
    code: "ID",
    type: "Flat",
    rate: 0.053,
    notes: "Retroactively reduced to 5.3% for 2025.",
  },
  illinois: {
    name: "Illinois",
    code: "IL",
    type: "Flat",
    rate: 0.0495,
    notes: "Constitutionally mandated flat tax.",
  },
  indiana: {
    name: "Indiana",
    code: "IN",
    type: "Flat",
    rate: 0.03,
    notes: "Reduced to 3.0% effective Jan 1, 2025.",
  },
  iowa: {
    name: "Iowa",
    code: "IA",
    type: "Flat",
    rate: 0.038,
    notes: "Transitioned to a flat tax of 3.8% effective Jan 1, 2025.",
  },
  kansas: {
    name: "Kansas",
    code: "KS",
    type: "Graduated",
    notes: "Two-bracket system.",
    brackets: {
      single: [
        { rate: 0.052, threshold: 0 },
        { rate: 0.0558, threshold: 23000 },
      ],
      married_joint: [
        { rate: 0.052, threshold: 0 },
        { rate: 0.0558, threshold: 46000 },
      ],
    },
  },
  kentucky: {
    name: "Kentucky",
    code: "KY",
    type: "Flat",
    rate: 0.04,
    notes: "Flat tax rate.",
  },
  louisiana: {
    name: "Louisiana",
    code: "LA",
    type: "Flat",
    rate: 0.03,
    notes: "New flat tax structure effective 2025.",
  },
  maine: {
    name: "Maine",
    code: "ME",
    type: "Graduated",
    notes: "Inflation-adjusted for 2025.",
    brackets: {
      single: [
        { rate: 0.058, threshold: 0 },
        { rate: 0.0675, threshold: 26050 },
        { rate: 0.0715, threshold: 61600 },
      ],
      married_joint: [
        { rate: 0.058, threshold: 0 },
        { rate: 0.0675, threshold: 52100 },
        { rate: 0.0715, threshold: 123250 },
      ],
    },
  },
  maryland: {
    name: "Maryland",
    code: "MD",
    type: "Graduated",
    notes: "Plus local county taxes (2.25% - 3.20%).",
    brackets: {
      single: [
        { rate: 0.02, threshold: 0 },
        { rate: 0.03, threshold: 1000 },
        { rate: 0.04, threshold: 2000 },
        { rate: 0.0475, threshold: 3000 },
        { rate: 0.05, threshold: 100000 },
        { rate: 0.0525, threshold: 125000 },
        { rate: 0.055, threshold: 150000 },
        { rate: 0.0575, threshold: 250000 },
      ],
      married_joint: [
        { rate: 0.02, threshold: 0 },
        { rate: 0.03, threshold: 1000 },
        { rate: 0.04, threshold: 2000 },
        { rate: 0.0475, threshold: 3000 },
        { rate: 0.05, threshold: 150000 },
        { rate: 0.0525, threshold: 175000 },
        { rate: 0.055, threshold: 225000 },
        { rate: 0.0575, threshold: 300000 },
      ],
    },
  },
  massachusetts: {
    name: "Massachusetts",
    code: "MA",
    type: "Graduated",
    notes: "Mostly flat 5%, but 4% surcharge applies to income over $1,083,150 (Millionaire's Tax).",
    brackets: {
      single: [
        { rate: 0.05, threshold: 0 },
        { rate: 0.09, threshold: 1083150 },
      ],
      married_joint: [
        { rate: 0.05, threshold: 0 },
        { rate: 0.09, threshold: 1083150 },
      ],
    },
  },
  michigan: {
    name: "Michigan",
    code: "MI",
    type: "Flat",
    rate: 0.0425,
    notes: "Rate restored to 4.25% (was temporarily 4.05% in 2024).",
  },
  minnesota: {
    name: "Minnesota",
    code: "MN",
    type: "Graduated",
    notes: "2025 inflation-adjusted brackets.",
    brackets: {
      single: [
        { rate: 0.0535, threshold: 0 },
        { rate: 0.068, threshold: 32570 },
        { rate: 0.0785, threshold: 106990 },
        { rate: 0.0985, threshold: 198630 },
      ],
      married_joint: [
        { rate: 0.0535, threshold: 0 },
        { rate: 0.068, threshold: 47620 },
        { rate: 0.0785, threshold: 189180 },
        { rate: 0.0985, threshold: 330410 },
      ],
    },
  },
  mississippi: {
    name: "Mississippi",
    code: "MS",
    type: "Flat",
    rate: 0.044,
    notes: "Scheduled reduction to 4.4% for 2025.",
  },
  missouri: {
    name: "Missouri",
    code: "MO",
    type: "Graduated",
    notes: "Top rate is 4.7%.",
    brackets: {
      single: [
        { rate: 0.0, threshold: 0 },
        { rate: 0.02, threshold: 1313 },
        { rate: 0.025, threshold: 2626 },
        { rate: 0.03, threshold: 3939 },
        { rate: 0.035, threshold: 5252 },
        { rate: 0.04, threshold: 6565 },
        { rate: 0.045, threshold: 7878 },
        { rate: 0.047, threshold: 9191 },
      ],
      married_joint: [
        { rate: 0.0, threshold: 0 },
        { rate: 0.02, threshold: 1313 },
        { rate: 0.025, threshold: 2626 },
        { rate: 0.03, threshold: 3939 },
        { rate: 0.035, threshold: 5252 },
        { rate: 0.04, threshold: 6565 },
        { rate: 0.045, threshold: 7878 },
        { rate: 0.047, threshold: 9191 },
      ],
    },
  },
  montana: {
    name: "Montana",
    code: "MT",
    type: "Graduated",
    notes: "Two brackets for 2025.",
    brackets: {
      single: [
        { rate: 0.047, threshold: 0 },
        { rate: 0.059, threshold: 21100 },
      ],
      married_joint: [
        { rate: 0.047, threshold: 0 },
        { rate: 0.059, threshold: 42200 },
      ],
    },
  },
  nebraska: {
    name: "Nebraska",
    code: "NE",
    type: "Graduated",
    notes: "Top rate 5.84%.",
    brackets: {
      single: [
        { rate: 0.0246, threshold: 0 },
        { rate: 0.0351, threshold: 3000 },
        { rate: 0.0501, threshold: 18000 },
        { rate: 0.0584, threshold: 29000 },
      ],
      married_joint: [
        { rate: 0.0246, threshold: 0 },
        { rate: 0.0351, threshold: 6000 },
        { rate: 0.0501, threshold: 36000 },
        { rate: 0.0584, threshold: 58000 },
      ],
    },
  },
  nevada: {
    name: "Nevada",
    code: "NV",
    type: "None",
    rate: 0,
    notes: "No state individual income tax.",
  },
  "new-hampshire": {
    name: "New Hampshire",
    code: "NH",
    type: "None",
    rate: 0,
    notes: "No tax on earned income. 3% tax on interest and dividends (phasing out fully by 2027).",
  },
  "new-jersey": {
    name: "New Jersey",
    code: "NJ",
    type: "Graduated",
    notes: "Includes top bracket of 10.75%.",
    brackets: {
      single: [
        { rate: 0.014, threshold: 0 },
        { rate: 0.0175, threshold: 20000 },
        { rate: 0.035, threshold: 35000 },
        { rate: 0.05525, threshold: 40000 },
        { rate: 0.0637, threshold: 75000 },
        { rate: 0.0897, threshold: 500000 },
        { rate: 0.1075, threshold: 1000000 },
      ],
      married_joint: [
        { rate: 0.014, threshold: 0 },
        { rate: 0.0175, threshold: 20000 },
        { rate: 0.0245, threshold: 50000 },
        { rate: 0.035, threshold: 70000 },
        { rate: 0.05525, threshold: 80000 },
        { rate: 0.0637, threshold: 150000 },
        { rate: 0.0897, threshold: 500000 },
        { rate: 0.1075, threshold: 1000000 },
      ],
    },
  },
  "new-mexico": {
    name: "New Mexico",
    code: "NM",
    type: "Graduated",
    notes: "Rates range from 1.7% to 5.9%.",
    brackets: {
      single: [
        { rate: 0.017, threshold: 0 },
        { rate: 0.032, threshold: 5500 },
        { rate: 0.047, threshold: 11000 },
        { rate: 0.049, threshold: 16000 },
        { rate: 0.059, threshold: 210000 },
      ],
      married_joint: [
        { rate: 0.017, threshold: 0 },
        { rate: 0.032, threshold: 8000 },
        { rate: 0.047, threshold: 16000 },
        { rate: 0.049, threshold: 24000 },
        { rate: 0.059, threshold: 315000 },
      ],
    },
  },
  "new-york": {
    name: "New York",
    code: "NY",
    type: "Graduated",
    notes: "Does not include NYC local tax (additional ~3.0-3.8%).",
    brackets: {
      single: [
        { rate: 0.04, threshold: 0 },
        { rate: 0.045, threshold: 8500 },
        { rate: 0.0525, threshold: 11700 },
        { rate: 0.055, threshold: 13900 },
        { rate: 0.06, threshold: 80650 },
        { rate: 0.0685, threshold: 215400 },
        { rate: 0.0965, threshold: 1077550 },
        { rate: 0.103, threshold: 5000000 },
        { rate: 0.109, threshold: 25000000 },
      ],
      married_joint: [
        { rate: 0.04, threshold: 0 },
        { rate: 0.045, threshold: 17150 },
        { rate: 0.0525, threshold: 23600 },
        { rate: 0.055, threshold: 27900 },
        { rate: 0.06, threshold: 161550 },
        { rate: 0.0685, threshold: 323200 },
        { rate: 0.0965, threshold: 2155350 },
        { rate: 0.103, threshold: 5000000 },
        { rate: 0.109, threshold: 25000000 },
      ],
    },
  },
  "north-carolina": {
    name: "North Carolina",
    code: "NC",
    type: "Flat",
    rate: 0.0425,
    notes: "Decreased to 4.25% for 2025.",
  },
  "north-dakota": {
    name: "North Dakota",
    code: "ND",
    type: "Graduated",
    notes: "Very low rates (0% to 2.50%).",
    brackets: {
      single: [
        { rate: 0.0, threshold: 0 },
        { rate: 0.0195, threshold: 48475 },
        { rate: 0.025, threshold: 244825 },
      ],
      married_joint: [
        { rate: 0.0, threshold: 0 },
        { rate: 0.0195, threshold: 80975 },
        { rate: 0.025, threshold: 298075 },
      ],
    },
  },
  ohio: {
    name: "Ohio",
    code: "OH",
    type: "Graduated",
    notes: "Moving toward flat tax (flat in 2026). Currently 3 brackets.",
    brackets: {
      single: [
        { rate: 0.0, threshold: 0 },
        { rate: 0.0275, threshold: 26050 },
        { rate: 0.03125, threshold: 100000 },
      ],
      married_joint: [
        { rate: 0.0, threshold: 0 },
        { rate: 0.0275, threshold: 26050 },
        { rate: 0.03125, threshold: 100000 },
      ],
    },
  },
  oklahoma: {
    name: "Oklahoma",
    code: "OK",
    type: "Graduated",
    notes: "Brackets are static. Top rate 4.75%.",
    brackets: {
      single: [
        { rate: 0.0025, threshold: 0 },
        { rate: 0.0075, threshold: 1000 },
        { rate: 0.0175, threshold: 2500 },
        { rate: 0.0275, threshold: 3750 },
        { rate: 0.0375, threshold: 4900 },
        { rate: 0.0475, threshold: 7200 },
      ],
      married_joint: [
        { rate: 0.0025, threshold: 0 },
        { rate: 0.0075, threshold: 2000 },
        { rate: 0.0175, threshold: 5000 },
        { rate: 0.0275, threshold: 7500 },
        { rate: 0.0375, threshold: 9800 },
        { rate: 0.0475, threshold: 12200 },
      ],
    },
  },
  oregon: {
    name: "Oregon",
    code: "OR",
    type: "Graduated",
    notes: "Includes 'kicker' rebate potential in some years.",
    brackets: {
      single: [
        { rate: 0.0475, threshold: 0 },
        { rate: 0.0675, threshold: 4400 },
        { rate: 0.0875, threshold: 11050 },
        { rate: 0.099, threshold: 125000 },
      ],
      married_joint: [
        { rate: 0.0475, threshold: 0 },
        { rate: 0.0675, threshold: 8800 },
        { rate: 0.0875, threshold: 22100 },
        { rate: 0.099, threshold: 250000 },
      ],
    },
  },
  pennsylvania: {
    name: "Pennsylvania",
    code: "PA",
    type: "Flat",
    rate: 0.0307,
    notes: "Flat rate. Local municipalities often levy additional wage taxes (e.g., Philadelphia, Pittsburgh).",
  },
  "rhode-island": {
    name: "Rhode Island",
    code: "RI",
    type: "Graduated",
    notes: "Three brackets.",
    brackets: {
      single: [
        { rate: 0.0375, threshold: 0 },
        { rate: 0.0475, threshold: 79900 },
        { rate: 0.0599, threshold: 181650 },
      ],
      married_joint: [
        { rate: 0.0375, threshold: 0 },
        { rate: 0.0475, threshold: 79900 },
        { rate: 0.0599, threshold: 181650 },
      ],
    },
  },
  "south-carolina": {
    name: "South Carolina",
    code: "SC",
    type: "Graduated",
    notes: "Rates 0%, 3%, 6.2%.",
    brackets: {
      single: [
        { rate: 0.0, threshold: 0 },
        { rate: 0.03, threshold: 3460 },
        { rate: 0.062, threshold: 17330 },
      ],
      married_joint: [
        { rate: 0.0, threshold: 0 },
        { rate: 0.03, threshold: 3460 },
        { rate: 0.062, threshold: 17330 },
      ],
    },
  },
  "south-dakota": {
    name: "South Dakota",
    code: "SD",
    type: "None",
    rate: 0,
    notes: "No state individual income tax.",
  },
  tennessee: {
    name: "Tennessee",
    code: "TN",
    type: "None",
    rate: 0,
    notes: "No state individual income tax (Hall Income Tax on interest/dividends fully repealed).",
  },
  texas: {
    name: "Texas",
    code: "TX",
    type: "None",
    rate: 0,
    notes: "No state individual income tax.",
  },
  utah: {
    name: "Utah",
    code: "UT",
    type: "Flat",
    rate: 0.0455,
    notes: "Flat tax rate.",
  },
  vermont: {
    name: "Vermont",
    code: "VT",
    type: "Graduated",
    notes: "2025 inflation-adjusted brackets.",
    brackets: {
      single: [
        { rate: 0.0335, threshold: 0 },
        { rate: 0.066, threshold: 47900 },
        { rate: 0.076, threshold: 116000 },
        { rate: 0.0875, threshold: 242000 },
      ],
      married_joint: [
        { rate: 0.0335, threshold: 0 },
        { rate: 0.066, threshold: 79950 },
        { rate: 0.076, threshold: 193300 },
        { rate: 0.0875, threshold: 294600 },
      ],
    },
  },
  virginia: {
    name: "Virginia",
    code: "VA",
    type: "Graduated",
    notes: "Brackets are static and do not adjust for inflation.",
    brackets: {
      single: [
        { rate: 0.02, threshold: 0 },
        { rate: 0.03, threshold: 3000 },
        { rate: 0.05, threshold: 5000 },
        { rate: 0.0575, threshold: 17000 },
      ],
      married_joint: [
        { rate: 0.02, threshold: 0 },
        { rate: 0.03, threshold: 3000 },
        { rate: 0.05, threshold: 5000 },
        { rate: 0.0575, threshold: 17000 },
      ],
    },
  },
  washington: {
    name: "Washington",
    code: "WA",
    type: "None",
    rate: 0,
    notes: "No tax on wages. 7% tax applies to capital gains exceeding $262,000 (inflation-adjusted).",
  },
  "west-virginia": {
    name: "West Virginia",
    code: "WV",
    type: "Graduated",
    notes: "Rates reduced in recent years.",
    brackets: {
      single: [
        { rate: 0.0222, threshold: 0 },
        { rate: 0.0296, threshold: 10000 },
        { rate: 0.0333, threshold: 25000 },
        { rate: 0.0444, threshold: 40000 },
        { rate: 0.0482, threshold: 60000 },
      ],
      married_joint: [
        { rate: 0.0222, threshold: 0 },
        { rate: 0.0296, threshold: 20000 },
        { rate: 0.0333, threshold: 50000 },
        { rate: 0.0444, threshold: 80000 },
        { rate: 0.0482, threshold: 120000 },
      ],
    },
  },
  wisconsin: {
    name: "Wisconsin",
    code: "WI",
    type: "Graduated",
    notes: "Second bracket expanded for 2025.",
    brackets: {
      single: [
        { rate: 0.035, threshold: 0 },
        { rate: 0.044, threshold: 14320 },
        { rate: 0.053, threshold: 50480 },
        { rate: 0.0765, threshold: 315310 },
      ],
      married_joint: [
        { rate: 0.035, threshold: 0 },
        { rate: 0.044, threshold: 19090 },
        { rate: 0.053, threshold: 67300 },
        { rate: 0.0765, threshold: 420420 },
      ],
    },
  },
  wyoming: {
    name: "Wyoming",
    code: "WY",
    type: "None",
    rate: 0,
    notes: "No state individual income tax.",
  },
}

// Get all states as an array for searching
export const ALL_STATES = Object.entries(STATE_TAX_DATA).map(([slug, data]) => ({
  slug,
  ...data,
}))

// Calculate state tax based on state data
export function calculateStateTax(stateSlug: string, income: number, filingStatus: "single" | "married_joint"): number {
  const state = STATE_TAX_DATA[stateSlug]
  if (!state) return 0

  if (state.type === "None") return 0

  if (state.type === "Flat" && state.rate !== undefined) {
    return income * state.rate
  }

  if (state.type === "Graduated" && state.brackets) {
    const brackets = state.brackets[filingStatus]
    let tax = 0
    let previousThreshold = 0

    for (let i = 0; i < brackets.length; i++) {
      const bracket = brackets[i]
      const nextThreshold = brackets[i + 1]?.threshold ?? Number.POSITIVE_INFINITY

      if (income <= bracket.threshold) break

      const taxableInBracket = Math.min(income, nextThreshold) - Math.max(previousThreshold, bracket.threshold)
      if (taxableInBracket > 0) {
        tax += taxableInBracket * bracket.rate
      }
      previousThreshold = nextThreshold
    }

    return tax
  }

  return 0
}

// Get effective tax rate
export function getEffectiveTaxRate(
  stateSlug: string,
  income: number,
  filingStatus: "single" | "married_joint",
): number {
  if (income <= 0) return 0
  const tax = calculateStateTax(stateSlug, income, filingStatus)
  return (tax / income) * 100
}

// Get top marginal rate for a state
export function getTopMarginalRate(stateSlug: string): string {
  const state = STATE_TAX_DATA[stateSlug]
  if (!state) return "N/A"

  if (state.type === "None") return "0%"
  if (state.type === "Flat" && state.rate !== undefined) {
    return `${(state.rate * 100).toFixed(2)}%`
  }
  if (state.type === "Graduated" && state.brackets) {
    const topRate = state.brackets.single[state.brackets.single.length - 1].rate
    return `${(topRate * 100).toFixed(2)}%`
  }
  return "N/A"
}
