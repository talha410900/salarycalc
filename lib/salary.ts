// Hourly to salary conversions
export function hourlyToAnnual(hourlyRate: number, hoursPerWeek: number, weeksPerYear: number): number {
  return hourlyRate * hoursPerWeek * weeksPerYear
}

export function hourlyToMonthly(hourlyRate: number, hoursPerWeek: number, weeksPerYear: number): number {
  return hourlyToAnnual(hourlyRate, hoursPerWeek, weeksPerYear) / 12
}

export function hourlyToWeekly(hourlyRate: number, hoursPerWeek: number): number {
  return hourlyRate * hoursPerWeek
}

export function hourlyToDaily(hourlyRate: number, hoursPerWeek: number): number {
  return hourlyToWeekly(hourlyRate, hoursPerWeek) / 5
}

// Salary to hourly conversion
export function salaryToHourly(annualSalary: number, hoursPerWeek: number, weeksPerYear: number): number {
  return annualSalary / (hoursPerWeek * weeksPerYear)
}

// Monthly to yearly conversions
export function monthlyToYearly(monthlySalary: number): number {
  return monthlySalary * 12
}

export function monthlyToWeekly(monthlySalary: number): number {
  return monthlyToYearly(monthlySalary) / 52
}

export function monthlyToHourly(monthlySalary: number, hoursPerWeek = 40): number {
  return monthlyToWeekly(monthlySalary) / hoursPerWeek
}

// Biweekly conversions
export function biweeklyToAnnual(biweeklyPay: number): number {
  return biweeklyPay * 26
}

export function biweeklyToMonthly(biweeklyPay: number): number {
  return biweeklyToAnnual(biweeklyPay) / 12
}

// Overtime calculations
export function calculateOvertimePay(hourlyRate: number, overtimeHours: number, multiplier = 1.5): number {
  return hourlyRate * multiplier * overtimeHours
}

export function calculateTotalWeeklyWithOvertime(
  hourlyRate: number,
  regularHours: number,
  overtimeHours: number,
  multiplier = 1.5,
): number {
  const regularPay = hourlyRate * regularHours
  const overtimePay = calculateOvertimePay(hourlyRate, overtimeHours, multiplier)
  return regularPay + overtimePay
}
