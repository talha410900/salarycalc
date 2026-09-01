import Link from "next/link"
import { formatCurrency } from "@/lib/format"
import {
  BIWEEKLY_SEO_AMOUNTS,
  formatUsdWhole,
  getBiweeklyAmountPath,
  getBiweeklyBreakdown,
} from "@/lib/seo-amount-pages"

export function BiweeklyConversionTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full caption-bottom text-sm">
        <caption className="text-muted-foreground mt-4 text-sm text-left">
          Common biweekly paychecks converted to annual salary (× 26). Click any amount for the full breakdown.
        </caption>
        <thead>
          <tr className="border-b">
            <th className="text-foreground h-10 px-2 text-left font-medium">Biweekly pay</th>
            <th className="text-foreground h-10 px-2 text-left font-medium">Annual salary</th>
            <th className="text-foreground h-10 px-2 text-left font-medium">Monthly</th>
          </tr>
        </thead>
        <tbody>
          {BIWEEKLY_SEO_AMOUNTS.map((amount) => {
            const breakdown = getBiweeklyBreakdown(amount)
            return (
              <tr key={amount} className="border-b hover:bg-muted/50">
                <td className="p-2">
                  <Link href={getBiweeklyAmountPath(amount)} className="text-primary hover:underline font-medium">
                    {formatUsdWhole(amount)}
                  </Link>
                </td>
                <td className="p-2 font-semibold">{formatUsdWhole(breakdown.annual)}</td>
                <td className="p-2 text-muted-foreground">{formatCurrency(breakdown.monthly)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
