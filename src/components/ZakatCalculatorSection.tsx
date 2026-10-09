import React, { useState } from 'react';
import { 
  Calculator, 
  Coins, 
  HelpCircle, 
  Info, 
  DollarSign, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { LanguageCode } from '../utils/i18n';

interface ZakatCalculatorSectionProps {
  lang: LanguageCode;
}

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar', goldPerGram: 85.50, silverPerGram: 1.05 },
  { code: 'GBP', symbol: '£', name: 'British Pound', goldPerGram: 67.20, silverPerGram: 0.82 },
  { code: 'EUR', symbol: '€', name: 'Euro', goldPerGram: 78.40, silverPerGram: 0.96 },
  { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal', goldPerGram: 320.50, silverPerGram: 3.95 },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham', goldPerGram: 314.00, silverPerGram: 3.85 },
  { code: 'PKR', symbol: 'Rs', name: 'Pakistani Rupee', goldPerGram: 23800, silverPerGram: 295 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', goldPerGram: 7150, silverPerGram: 88 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', goldPerGram: 116.00, silverPerGram: 1.42 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', goldPerGram: 130.00, silverPerGram: 1.60 }
];

export const ZakatCalculatorSection: React.FC<ZakatCalculatorSectionProps> = ({ lang }) => {
  const [currencyCode, setCurrencyCode] = useState<string>('USD');
  const [nisabStandard, setNisabStandard] = useState<'silver' | 'gold'>('silver'); // Silver standard is the safer majority consensus benefiting the poor

  // Asset inputs
  const [cash, setCash] = useState<number>(0);
  const [goldGrams, setGoldGrams] = useState<number>(0);
  const [silverGrams, setSilverGrams] = useState<number>(0);
  const [investments, setInvestments] = useState<number>(0);
  const [businessStock, setBusinessStock] = useState<number>(0);
  const [moneyOwedToYou, setMoneyOwedToYou] = useState<number>(0);

  // Liabilities
  const [debts, setDebts] = useState<number>(0);
  const [immediateExpenses, setImmediateExpenses] = useState<number>(0);

  const curr = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];

  // Nisab calculations (Gold: 87.48g, Silver: 612.36g)
  const goldNisabValue = Math.round(87.48 * curr.goldPerGram);
  const silverNisabValue = Math.round(612.36 * curr.silverPerGram);
  const activeNisabThreshold = nisabStandard === 'silver' ? silverNisabValue : goldNisabValue;

  // Total gross assets
  const goldAssetValue = goldGrams * curr.goldPerGram;
  const silverAssetValue = silverGrams * curr.silverPerGram;
  const totalGrossAssets = cash + goldAssetValue + silverAssetValue + investments + businessStock + moneyOwedToYou;

  // Deductions
  const totalDeductions = debts + immediateExpenses;

  // Net zakatable wealth
  const netZakatableWealth = Math.max(0, totalGrossAssets - totalDeductions);

  // Eligible for Zakat?
  const isEligible = netZakatableWealth >= activeNisabThreshold;
  const zakatPayable = isEligible ? Math.round(netZakatableWealth * 0.025 * 100) / 100 : 0;

  const handleReset = () => {
    setCash(0);
    setGoldGrams(0);
    setSilverGrams(0);
    setInvestments(0);
    setBusinessStock(0);
    setMoneyOwedToYou(0);
    setDebts(0);
    setImmediateExpenses(0);
  };

  return (
    <section id="zakat-calculator-module-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              <Calculator className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-sans">
              Zakat Calculator (حاسبة الزكاة)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Accurate Shariah-compliant 2.5% Zakat calculation based on modern Nisab thresholds and real-time inputs.
          </p>
        </div>

        {/* Currency & Nisab Standard Selector */}
        <div className="flex items-center gap-2">
          <select
            value={currencyCode}
            onChange={(e) => setCurrencyCode(e.target.value)}
            className="px-4 py-2 rounded-2xl ios-glass text-xs font-semibold text-stone-900 dark:text-stone-100"
          >
            {CURRENCIES.map(c => (
              <option key={c.code} value={c.code} className="bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100">
                {c.code} ({c.symbol})
              </option>
            ))}
          </select>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-2xl ios-glass text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            title="Reset All Fields"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Asset & Liability Inputs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Eligible Assets */}
          <div className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-lg space-y-4">
            <h2 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Coins className="w-4 h-4 text-emerald-700" />
              <span>1. Zakatable Assets & Wealth</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Cash */}
              <div>
                <label className="block font-medium mb-1.5 text-stone-600 dark:text-stone-400">
                  Cash in Hand & Bank Accounts ({curr.symbol}):
                </label>
                <input
                  type="number"
                  min="0"
                  value={cash || ''}
                  onChange={(e) => setCash(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="w-full p-2.5 rounded-2xl ios-glass text-stone-900 dark:text-stone-100 font-mono"
                />
              </div>

              {/* Gold grams */}
              <div>
                <label className="block font-medium mb-1.5 text-stone-600 dark:text-stone-400">
                  Gold Owned (grams):
                </label>
                <input
                  type="number"
                  min="0"
                  value={goldGrams || ''}
                  onChange={(e) => setGoldGrams(parseFloat(e.target.value) || 0)}
                  placeholder="0g"
                  className="w-full p-2.5 rounded-2xl ios-glass text-stone-900 dark:text-stone-100 font-mono"
                />
                <span className="text-[10px] text-stone-500 mt-1 block">
                  Est: {curr.symbol}{Math.round(goldAssetValue).toLocaleString()} ({curr.symbol}{curr.goldPerGram}/g)
                </span>
              </div>

              {/* Silver grams */}
              <div>
                <label className="block font-medium mb-1.5 text-stone-600 dark:text-stone-400">
                  Silver Owned (grams):
                </label>
                <input
                  type="number"
                  min="0"
                  value={silverGrams || ''}
                  onChange={(e) => setSilverGrams(parseFloat(e.target.value) || 0)}
                  placeholder="0g"
                  className="w-full p-2.5 rounded-2xl ios-glass text-stone-900 dark:text-stone-100 font-mono"
                />
                <span className="text-[10px] text-stone-500 mt-1 block">
                  Est: {curr.symbol}{Math.round(silverAssetValue).toLocaleString()} ({curr.symbol}{curr.silverPerGram}/g)
                </span>
              </div>

              {/* Stocks / Investments */}
              <div>
                <label className="block font-medium mb-1.5 text-stone-600 dark:text-stone-400">
                  Stocks & Mutual Funds ({curr.symbol}):
                </label>
                <input
                  type="number"
                  min="0"
                  value={investments || ''}
                  onChange={(e) => setInvestments(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="w-full p-2.5 rounded-2xl ios-glass text-stone-900 dark:text-stone-100 font-mono"
                />
              </div>

              {/* Business Merchandise */}
              <div>
                <label className="block font-medium mb-1.5 text-stone-600 dark:text-stone-400">
                  Business Merchandise / Inventory ({curr.symbol}):
                </label>
                <input
                  type="number"
                  min="0"
                  value={businessStock || ''}
                  onChange={(e) => setBusinessStock(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="w-full p-2.5 rounded-2xl ios-glass text-stone-900 dark:text-stone-100 font-mono"
                />
              </div>

              {/* Monies owed to you */}
              <div>
                <label className="block font-medium mb-1.5 text-stone-600 dark:text-stone-400">
                  Expected Receivables / Loans Given ({curr.symbol}):
                </label>
                <input
                  type="number"
                  min="0"
                  value={moneyOwedToYou || ''}
                  onChange={(e) => setMoneyOwedToYou(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="w-full p-2.5 rounded-2xl ios-glass text-stone-900 dark:text-stone-100 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Deductible Liabilities */}
          <div className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-lg space-y-4">
            <h2 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-rose-600" />
              <span>2. Immediate Liabilities & Deductible Debts</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium mb-1.5 text-stone-600 dark:text-stone-400">
                  Immediate Debts Due Now ({curr.symbol}):
                </label>
                <input
                  type="number"
                  min="0"
                  value={debts || ''}
                  onChange={(e) => setDebts(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="w-full p-2.5 rounded-2xl ios-glass text-stone-900 dark:text-stone-100 font-mono"
                />
              </div>

              <div>
                <label className="block font-medium mb-1.5 text-stone-600 dark:text-stone-400">
                  Due Bills / Living Expenses ({curr.symbol}):
                </label>
                <input
                  type="number"
                  min="0"
                  value={immediateExpenses || ''}
                  onChange={(e) => setImmediateExpenses(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="w-full p-2.5 rounded-2xl ios-glass text-stone-900 dark:text-stone-100 font-mono"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Results Summary & Nisab Benchmark */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Result Card */}
          <div className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200/50 dark:border-stone-800/50">
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 dark:text-emerald-400">
                Calculation Summary
              </span>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ios-glass text-emerald-800 dark:text-emerald-300">
                2.5% Standard
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-600 dark:text-stone-400">Total Gross Assets:</span>
                <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">{curr.symbol}{Math.round(totalGrossAssets).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600 dark:text-stone-400">Total Deductions:</span>
                <span className="font-mono font-semibold text-rose-500">-{curr.symbol}{Math.round(totalDeductions).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-2 border-t border-stone-200/50 dark:border-stone-800/50 text-stone-900 dark:text-stone-100">
                <span>Net Zakatable Wealth:</span>
                <span className="font-mono text-emerald-800 dark:text-emerald-400">{curr.symbol}{Math.round(netZakatableWealth).toLocaleString()}</span>
              </div>
            </div>

            {/* Nisab comparison status */}
            <div className="p-3.5 rounded-2xl ios-glass text-xs">
              <div className="flex justify-between mb-1">
                <span className="text-stone-600 dark:text-stone-400">Active Nisab ({nisabStandard}):</span>
                <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{curr.symbol}{activeNisabThreshold.toLocaleString()}</span>
              </div>
              <p className={`font-semibold ${isEligible ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {isEligible 
                  ? '✓ Wealth exceeds Nisab — Zakat is obligatory.' 
                  : '○ Wealth is below Nisab — Zakat is not due.'}
              </p>
            </div>

            {/* Final Zakat Due */}
            <div className="pt-2 text-center">
              <p className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wider font-semibold">Total Zakat Payable (2.5%)</p>
              <p className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-800 dark:text-emerald-400 mt-1">
                {curr.symbol}{zakatPayable.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Nisab Choice & Rules Explainer */}
          <div className="p-6 sm:p-7 rounded-3xl ios-glass-card shadow-lg text-xs space-y-3">
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
              <span>Nisab Standard Selection</span>
            </h3>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setNisabStandard('silver')}
                className={`flex-1 py-2.5 rounded-full font-semibold transition-all ${
                  nisabStandard === 'silver'
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'ios-glass text-stone-700 dark:text-stone-300 hover:bg-white/40'
                }`}
              >
                Silver (612.36g) — Recommended
              </button>
              <button
                onClick={() => setNisabStandard('gold')}
                className={`flex-1 py-2.5 rounded-full font-semibold transition-all ${
                  nisabStandard === 'gold'
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'ios-glass text-stone-700 dark:text-stone-300 hover:bg-white/40'
                }`}
              >
                Gold (87.48g)
              </button>
            </div>

            <p className="text-stone-600 dark:text-stone-400 leading-relaxed pt-1">
              Scholars recommend using the <strong>Silver Nisab</strong> for cash and commercial goods because it sets a lower threshold, ensuring greater support and relief for the needy (Fuqara & Masakin).
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
