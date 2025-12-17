# State Calculator Organization Structure

## URL Structure

### Current (Income Tax Only)
```
/calculators/state/{state-slug} → State Income Tax Calculator
```

### Proposed (Multiple Calculators Per State)
```
/calculators/state/{state-slug} → State Income Tax Calculator (default/landing)
/calculators/state/{state-slug}/withholding → Withholding/Payroll Tax Calculator
/calculators/state/{state-slug}/sales-tax → Sales Tax Calculator
/calculators/state/{state-slug}/vehicle-tax → Vehicle/Auto Sales Tax Calculator
/calculators/state/{state-slug}/property-tax → Property Tax Calculator
```

## File Structure

```
app/calculators/state/
├── [state]/
│   ├── page.tsx                    # Income Tax (default)
│   ├── withholding/
│   │   └── page.tsx                # Withholding/Payroll Tax
│   ├── sales-tax/
│   │   └── page.tsx                # Sales Tax
│   ├── vehicle-tax/
│   │   └── page.tsx                # Vehicle Tax
│   └── property-tax/
│       └── page.tsx                # Property Tax
```

## Calculator Types by Priority

### Priority 1: Payroll/Withholding
- Maryland withholding tax calculator
- MN paycheck tax calculator
- Virginia payroll tax calculator
- Louisiana payroll tax calculator
- Oregon payroll tax calculator
- South Carolina payroll tax calculator
- PA paycheck tax calculator
- Michigan paycheck tax calculator
- Paycheck tax calculator Nevada

### Priority 2: Sales/Vehicle/Excise (High RPM)
- TN car sales tax calculator
- MD sales tax calculator
- Nebraska car sales tax calculator
- TX auto sales tax calculator
- TN sales tax calculator auto
- Virginia vehicle tax calculator
- WV vehicle tax calculator
- State of Maine excise tax calculator

### Priority 3: Property/Mortgage
- Tax mortgage calculator
- NY mortgage tax calculator
- VA property tax car calculator
- Property tax in Illinois calculator

## Implementation Notes

1. **State Landing Page**: `/calculators/state/{state-slug}` should show links to all available calculators for that state
2. **Dynamic Routing**: Use Next.js dynamic routes `[state]` and `[calculator-type]`
3. **Metadata**: Each calculator type should have state-specific SEO metadata
4. **Navigation**: Add state calculator type selector in header or state page
5. **Sitemap**: Automatically include all state calculator types in sitemap

