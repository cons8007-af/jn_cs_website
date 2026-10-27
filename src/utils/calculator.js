/**
 * EMI Calculator and Currency Formatting Utilities
 * Standard Reducing-Balance EMI formula:
 * EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
 *
 * P = Principal loan amount
 * r = Monthly interest rate (annualRate / (12 * 100))
 * n = Total number of monthly instalments (years * 12 or months)
 */

export function calculateEMI({ loanAmount, interestRate, term, termUnit = 'years' }) {
  const P = parseFloat(loanAmount);
  const annualRate = parseFloat(interestRate);
  const rawTerm = parseFloat(term);

  // If missing or non-positive values, return clean zero state
  if (!P || P <= 0 || !rawTerm || rawTerm <= 0 || isNaN(annualRate) || annualRate < 0) {
    return {
      monthlyEmi: 0,
      principal: P > 0 ? Math.round(P) : 0,
      totalInterest: 0,
      totalPayment: P > 0 ? Math.round(P) : 0,
    };
  }

  // Convert tenure to total months (n)
  const n = termUnit === 'years' ? Math.round(rawTerm * 12) : Math.round(rawTerm);
  if (n <= 0) {
    return {
      monthlyEmi: 0,
      principal: Math.round(P),
      totalInterest: 0,
      totalPayment: Math.round(P),
    };
  }

  // Handle 0% interest edge case cleanly without NaN or Infinity
  if (annualRate === 0) {
    const emi = Math.round(P / n);
    return {
      monthlyEmi: emi,
      principal: Math.round(P),
      totalInterest: 0,
      totalPayment: Math.round(P),
    };
  }

  // Monthly interest rate
  const r = annualRate / (12 * 100);

  // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const factor = Math.pow(1 + r, n);
  const emiExact = (P * r * factor) / (factor - 1);

  if (!isFinite(emiExact) || isNaN(emiExact)) {
    return {
      monthlyEmi: 0,
      principal: Math.round(P),
      totalInterest: 0,
      totalPayment: Math.round(P),
    };
  }

  const monthlyEmi = Math.round(emiExact);
  const totalPayment = Math.round(emiExact * n);
  const totalInterest = Math.max(0, totalPayment - Math.round(P));

  return {
    monthlyEmi,
    principal: Math.round(P),
    totalInterest,
    totalPayment,
  };
}

/**
 * Format numbers according to Indian Currency (Lakhs / Crores) numbering system.
 * Example: 500000 -> "₹ 5,00,000"
 */
export function formatIndianCurrency(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '₹ 0';
  }
  const val = Math.round(Number(amount));
  return '₹ ' + val.toLocaleString('en-IN');
}

/**
 * Strip non-numeric characters for clean parsing while allowing decimals.
 */
export function parseCleanNumber(val) {
  if (!val) return '';
  const cleaned = String(val).replace(/[^0-9.]/g, '');
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('');
  }
  return cleaned;
}
