import { useState } from 'react'
import { CurrencyCircleDollar } from '@phosphor-icons/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { Currency } from '@/lib/types'
import { useKV } from '@github/spark/hooks'

const EXCHANGE_RATES: Record<Currency, number> = {
  'EUR': 1,
  'USD': 1.09,
  'GBP': 0.86,
  'RON': 4.97
}

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  'EUR': '€',
  'USD': '$',
  'GBP': '£',
  'RON': 'RON'
}

interface CurrencySelectorProps {
  onChange?: (currency: Currency) => void
}

export function CurrencySelector({ onChange }: CurrencySelectorProps) {
  const [currency, setCurrency] = useKV<Currency>('user-currency', 'EUR')

  const handleChange = (value: Currency) => {
    setCurrency(value)
    onChange?.(value)
  }

  return (
    <Select value={currency} onValueChange={handleChange}>
      <SelectTrigger className="w-[120px]">
        <div className="flex items-center gap-2">
          <CurrencyCircleDollar className="w-4 h-4" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="EUR">EUR (€)</SelectItem>
        <SelectItem value="USD">USD ($)</SelectItem>
        <SelectItem value="GBP">GBP (£)</SelectItem>
        <SelectItem value="RON">RON</SelectItem>
      </SelectContent>
    </Select>
  )
}

export function formatCurrency(amount: number, currency: Currency = 'EUR'): string {
  const symbol = CURRENCY_SYMBOLS[currency]
  const converted = amount * EXCHANGE_RATES[currency]
  
  return new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(converted).replace(currency, symbol)
}

interface PriceCalculatorProps {
  basePrice: number
  currency?: Currency
}

export function PriceCalculator({ basePrice, currency = 'EUR' }: PriceCalculatorProps) {
  const [selectedCurrency] = useKV<Currency>('user-currency', 'EUR')
  const activeCurrency = currency || selectedCurrency

  const convertedPrice = basePrice * EXCHANGE_RATES[activeCurrency]
  const vat = convertedPrice * 0.19
  const registrationTax = convertedPrice * 0.05
  const totalWithTaxes = convertedPrice + vat + registrationTax

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <CurrencyCircleDollar className="w-5 h-5 text-accent" />
        <h3 className="font-semibold">Calculator Costuri Totale</h3>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Preț brut:</span>
          <span className="font-medium text-lg">{formatCurrency(basePrice, activeCurrency)}</span>
        </div>
        
        <Separator />
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">TVA (19%):</span>
            <span className="font-medium">{formatCurrency(vat / EXCHANGE_RATES[activeCurrency], activeCurrency)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Taxe înmatriculare (5%):</span>
            <span className="font-medium">{formatCurrency(registrationTax / EXCHANGE_RATES[activeCurrency], activeCurrency)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <span className="font-semibold">Total estimat:</span>
          <span className="font-bold text-xl text-accent">{formatCurrency(totalWithTaxes / EXCHANGE_RATES[activeCurrency], activeCurrency)}</span>
        </div>

        <div className="p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground">
            * Taxele pot varia în funcție de locație și specificitățile vehiculului. 
            Acest calculator oferă o estimare aproximativă.
          </p>
        </div>
      </div>
    </Card>
  )
}

interface MultiCurrencyPriceProps {
  price: number
  showAllCurrencies?: boolean
}

export function MultiCurrencyPrice({ price, showAllCurrencies }: MultiCurrencyPriceProps) {
  const [selectedCurrency] = useKV<Currency>('user-currency', 'EUR')

  if (showAllCurrencies) {
    return (
      <div className="grid grid-cols-2 gap-2 text-sm">
        {Object.keys(EXCHANGE_RATES).map(curr => (
          <div key={curr} className={`p-2 rounded ${curr === selectedCurrency ? 'bg-accent/10 font-semibold' : 'text-muted-foreground'}`}>
            <span className="text-xs">{curr}:</span>{' '}
            {formatCurrency(price, curr as Currency)}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="text-2xl font-bold">
      {formatCurrency(price, selectedCurrency)}
    </div>
  )
}
